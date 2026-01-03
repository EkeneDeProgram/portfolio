import { normalizeNews } from "./normalize";
import { NewsItem, NewsCategory, RawNewsArticle } from "./types";
import { Redis } from "@upstash/redis";

const API_KEY = process.env.NEWS_API_KEY!;
const BASE_URL = process.env.NEWS_API_URL!;
const CRYPTO_URL = process.env.CRYPTO_URL!;


// UPSTASH REST REDIS CLIENT (serverless-safe, disabled in dev)
let redis: Redis | null = null;
if (
  process.env.NODE_ENV !== "development" &&
  process.env.UPSTASH_REDIS_REST_URL &&
  process.env.UPSTASH_REDIS_REST_TOKEN
) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

// CATEGORY CONFIG
const SOURCE_CATEGORIES: Partial<Record<NewsCategory, string>> = {
  tech: "techcrunch,the-verge,wired,ars-technica",
  finance: "bloomberg,reuters,financial-times,wall-street-journal",
};

const QUERY_CATEGORIES: Record<NewsCategory, string> = {
  tech: "technology",
  finance: "finance",
  crypto: "bitcoin OR crypto OR blockchain OR ethereum",
};

// CRYPTO FILTERING
const CRYPTO_SOURCE_BLACKLIST = [
  "pypi.org",
  "github.com",
  "npmjs.com",
  "medium.com",
  "dev.to",
  "substack.com",
];

const TRUSTED_CRYPTO_SOURCES = [
  "reuters",
  "bloomberg",
  "coindesk",
  "cointelegraph",
  "financial times",
  "wall street journal",
];

// SOURCE TRUST SCORING
function sourceScore(source: string, category: NewsCategory): number {
  const s = source.toLowerCase();
  if (category === "crypto") {
    if (TRUSTED_CRYPTO_SOURCES.some((p) => s.includes(p))) return 120;
    return 20;
  }
  if (["reuters", "bloomberg", "financial times", "wall street journal"].some((p) =>
      s.includes(p)
    ))
    return 100;
  if (["the verge", "wired", "techcrunch"].some((p) => s.includes(p)))
    return 80;
  return 50;
}

// NORMALIZATION + DEDUPLICATION
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/\b(v?\d+(\.\d+)*)\b/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function fingerprint(item: NewsItem): string {
  return normalizeText(`${item.title} ${item.description ?? ""}`);
}

// Deduplicate within a category
function dedupeCanonical(items: NewsItem[]): NewsItem[] {
  const map = new Map<string, NewsItem>();
  for (const item of items) {
    const key = fingerprint(item);
    const existing = map.get(key);
    if (!existing) {
      map.set(key, item);
      continue;
    }
    const scoreA = sourceScore(item.source, item.category);
    const scoreB = sourceScore(existing.source, existing.category);
    if (scoreA > scoreB || (scoreA === scoreB && new Date(item.publishedAt) < new Date(existing.publishedAt))) {
      map.set(key, item);
    }
  }
  return Array.from(map.values());
}

// Deduplicate across categories
function dedupeAcrossCategories(items: NewsItem[]): NewsItem[] {
  const seen = new Map<string, Set<string>>(); // fingerprint -> set of categories
  return items.filter((item) => {
    const key = fingerprint(item);
    const cats = seen.get(key) || new Set();
    if (cats.has(item.category)) return false; // already in this category
    cats.add(item.category);
    seen.set(key, cats);
    return true;
  });
}

// SERVER-SIDE REJECTION LOGGING
function logRejection(reason: string, article: RawNewsArticle) {
  if (process.env.NODE_ENV !== "production") {
    console.warn(`[NEWS REJECTED] ${reason}`, {
      title: article.title,
      source: article.source?.name,
      url: article.url,
    });
  }
}

// FETCH CATEGORY
async function fetchCategory(category: NewsCategory): Promise<NewsItem[]> {
  const sources = SOURCE_CATEGORIES[category];
  const query = QUERY_CATEGORIES[category];

  // Use query for crypto, sources for others
  const url =
    category === "crypto"
      ? `${CRYPTO_URL}?q=${encodeURIComponent(query)}&pageSize=20&language=en&sortBy=publishedAt&apiKey=${API_KEY}`
      : `${BASE_URL}?sources=${sources}&pageSize=20&language=en&sortBy=publishedAt&apiKey=${API_KEY}`;

  const res = await fetch(url, {
    cache: "force-cache",
    next: { revalidate: 60 * 60 * 8, tags: [`news-${category}`] },
  });

  if (!res.ok) {
    console.error(`[NewsAPI] ${category} failed: ${res.status}`);
    return [];
  }

  let articles: RawNewsArticle[] = (await res.json()).articles || [];

  if (category === "crypto") {
    articles = articles.filter((a) => {
      if (CRYPTO_SOURCE_BLACKLIST.some((d) => a.url?.toLowerCase().includes(d))) {
        logRejection("blacklisted source", a);
        return false;
      }
      if (!TRUSTED_CRYPTO_SOURCES.some((s) => a.source?.name?.toLowerCase().includes(s))) {
        logRejection("untrusted crypto publisher", a);
        return false;
      }
      return true;
    });
  }

  return normalizeNews(articles, category);
}

// TRENDING SCORE
function trendingScore(item: NewsItem): number {
  const hoursAgo = (Date.now() - new Date(item.publishedAt).getTime()) / 36e5;
  return Math.max(0, 48 - hoursAgo) * 2 + sourceScore(item.source, item.category);
}

// AI SUMMARIZATION
async function summarizeStory(story: NewsItem): Promise<string> {
  return `Summary: ${story.title} - ${story.description?.slice(0, 120)}...`;
}

// GET TOP NEWS
export async function getTopNews(): Promise<{
  tech: NewsItem[];
  finance: NewsItem[];
  crypto: NewsItem[];
  topStories: NewsItem[];
}> {
  const [tech, finance, crypto] = await Promise.all([
    fetchCategory("tech"),
    fetchCategory("finance"),
    fetchCategory("crypto"),
  ]);

  let globalPool = [...tech, ...finance, ...crypto];

  // Filter duplicates across categories
  globalPool = dedupeAcrossCategories(globalPool);

  const canonical: NewsItem[] = [];

  for (const item of globalPool) {
    const key = `canonical:${item.category}:${fingerprint(item)}`;
    try {
      if (redis) {
        const cached = await redis.get(key);
        if (cached) {
          logRejection("duplicate in Redis cache", { ...item, source: { name: item.source } });
          continue;
        }
        await redis.set(key, JSON.stringify(item), { ex: 60 * 60 * 72 }); // 72h TTL
      }
    } catch (err) {
      console.error("[Redis Warning] Could not access Redis:", err);
    }
    canonical.push(item);
  }

  const uniqueStories = dedupeCanonical(canonical);
  uniqueStories.sort((a, b) => trendingScore(b) - trendingScore(a));

  for (const story of uniqueStories) {
    if (!story.summary) story.summary = await summarizeStory(story);
  }

  const topStories = uniqueStories.slice(0, 5);

  return {
    tech: uniqueStories.filter((n) => n.category === "tech").slice(0, 10),
    finance: uniqueStories.filter((n) => n.category === "finance").slice(0, 10),
    crypto: uniqueStories.filter((n) => n.category === "crypto").slice(0, 10),
    topStories,
  };
}

