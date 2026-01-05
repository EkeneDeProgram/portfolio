// import { normalizeNews } from "./normalize";
// import { NewsItem, NewsCategory, RawNewsArticle } from "./types";
// import { Redis } from "@upstash/redis";

// const API_KEY = process.env.NEWS_API_KEY!;
// const BASE_URL = process.env.NEWS_API_URL!;
// const CRYPTO_URL = process.env.CRYPTO_URL!;

// // TYPES
// type EnrichedNewsItem = NewsItem & {
//   isFresh: boolean;
//   feedType: "breaking" | "trending";
// };

// // DEBUG LOGGER (dev only)
// function log(stage: string, data: unknown) {
//   if (process.env.NODE_ENV !== "production") {
//     console.log(`[news:${stage}]`, data);
//   }
// }

// //  UPSTASH REDIS (disabled in dev)
// let redis: Redis | null = null;
// if (
//   process.env.NODE_ENV !== "development" &&
//   process.env.UPSTASH_REDIS_REST_URL &&
//   process.env.UPSTASH_REDIS_REST_TOKEN
// ) {
//   redis = new Redis({
//     url: process.env.UPSTASH_REDIS_REST_URL,
//     token: process.env.UPSTASH_REDIS_REST_TOKEN,
//   });
// }

// // CATEGORY CONFIG
// const SOURCE_CATEGORIES: Partial<Record<NewsCategory, string>> = {
//   tech: "techcrunch,the-verge,wired,ars-technica",
//   finance: "bloomberg,reuters,financial-times,wall-street-journal",
// };

// const QUERY_CATEGORIES: Record<NewsCategory, string> = {
//   tech: "technology",
//   finance: "finance",
//   crypto: "bitcoin OR crypto OR blockchain OR ethereum",
// };

// // CRYPTO FILTERING
// const CRYPTO_SOURCE_BLACKLIST = [
//   "pypi.org",
//   "github.com",
//   "npmjs.com",
//   "medium.com",
//   "dev.to",
//   "substack.com",
// ];

// const TRUSTED_CRYPTO_SOURCES = [
//   "reuters",
//   "bloomberg",
//   "coindesk",
//   "cointelegraph",
//   "financial times",
//   "wall street journal",
// ];

// // SOURCE TRUST SCORING
// function sourceScore(source: string, category: NewsCategory): number {
//   const s = source.toLowerCase();
//   if (category === "crypto") {
//     if (TRUSTED_CRYPTO_SOURCES.some((p) => s.includes(p))) return 120;
//     return 20;
//   }
//   if (
//     ["reuters", "bloomberg", "financial times", "wall street journal"].some((p) =>
//       s.includes(p)
//     )
//   )
//     return 100;
//   if (["the verge", "wired", "techcrunch"].some((p) => s.includes(p)))
//     return 80;
//   return 50;
// }

// // NORMALIZATION + DEDUPE
// function normalizeText(text: string): string {
//   return text
//     .toLowerCase()
//     .replace(/\b(v?\d+(\.\d+)*)\b/g, "")
//     .replace(/[^a-z0-9]+/g, " ")
//     .replace(/\s+/g, " ")
//     .trim();
// }

// function fingerprint(item: NewsItem): string {
//   return normalizeText(`${item.title} ${item.description ?? ""}`);
// }

// function dedupeCanonical(items: NewsItem[]): NewsItem[] {
//   const map = new Map<string, NewsItem>();
//   for (const item of items) {
//     const key = fingerprint(item);
//     const existing = map.get(key);
//     if (!existing) {
//       map.set(key, item);
//       continue;
//     }
//     const scoreA = sourceScore(item.source, item.category);
//     const scoreB = sourceScore(existing.source, existing.category);
//     if (
//       scoreA > scoreB ||
//       (scoreA === scoreB &&
//         new Date(item.publishedAt) < new Date(existing.publishedAt))
//     ) {
//       map.set(key, item);
//     }
//   }
//   return Array.from(map.values());
// }

// function dedupeAcrossCategories(items: EnrichedNewsItem[]): EnrichedNewsItem[] {
//   const seen = new Map<string, Set<string>>();
//   return items.filter((item) => {
//     const key = fingerprint(item);
//     const cats = seen.get(key) || new Set();
//     if (cats.has(item.category)) return false;
//     cats.add(item.category);
//     seen.set(key, cats);
//     return true;
//   });
// }

// // FETCH CATEGORY
// async function fetchCategory(category: NewsCategory): Promise<NewsItem[]> {
//   const sources = SOURCE_CATEGORIES[category];
//   const query = QUERY_CATEGORIES[category];

//   const url =
//     category === "crypto"
//       ? `${CRYPTO_URL}?q=${encodeURIComponent(
//           query
//         )}&pageSize=20&language=en&sortBy=publishedAt&apiKey=${API_KEY}`
//       : `${BASE_URL}?sources=${sources}&pageSize=20&language=en&sortBy=publishedAt&apiKey=${API_KEY}`;

//   log(`${category}:fetch:url`, url);

//   const res = await fetch(url, {
//     cache: "force-cache",
//     next: { revalidate: 60 * 60 * 8, tags: [`news-${category}`] },
//   });

//   log(`${category}:fetch:status`, res.status);

//   if (!res.ok) {
//     const errorText = await res.text();
//     log(`${category}:fetch:error`, errorText);
//     return [];
//   }

//   const json = await res.json();
//   let articles: RawNewsArticle[] = json.articles || [];

//   log(`${category}:raw:count`, articles.length);

//   if (category === "crypto") {
//     articles = articles.filter(
//       (a) =>
//         !CRYPTO_SOURCE_BLACKLIST.some((d) =>
//           a.url?.toLowerCase().includes(d)
//         ) &&
//         TRUSTED_CRYPTO_SOURCES.some((s) =>
//           a.source?.name?.toLowerCase().includes(s)
//         )
//     );
//     log(`${category}:after:crypto-filter`, articles.length);
//   }

//   const normalized = normalizeNews(articles, category);
//   log(`${category}:after:normalize`, normalized.length);

//   return normalized;
// }

// // TRENDING + FRESH LOGIC
// const FRESH_WINDOW = 12 * 60 * 60 * 1000; // increased to 12h
// const TRENDING_WINDOW = 48 * 60 * 60 * 1000;

// function isFresh(item: NewsItem): boolean {
//   return Date.now() - new Date(item.publishedAt).getTime() <= FRESH_WINDOW;
// }

// function trendingScore(item: NewsItem): number {
//   const hoursAgo =
//     (Date.now() - new Date(item.publishedAt).getTime()) / 36e5;
//   return Math.max(0, 48 - hoursAgo) * 2 + sourceScore(item.source, item.category);
// }

// // AI SUMMARY
// async function summarizeStory(story: NewsItem): Promise<string> {
//   return `Summary: ${story.title} - ${story.description?.slice(0, 120)}...`;
// }

// // GET TOP NEWS
// export async function getTopNews() {
//   const [techRaw, financeRaw, cryptoRaw] = await Promise.all([
//     fetchCategory("tech"),
//     fetchCategory("finance"),
//     fetchCategory("crypto"),
//   ]);

//   log("raw:counts", {
//     tech: techRaw.length,
//     finance: financeRaw.length,
//     crypto: cryptoRaw.length,
//   });

//   function processCategory(
//     items: NewsItem[],
//     categoryName: string
//   ): EnrichedNewsItem[] {
//     const trendingPool = items.filter(
//       (i) => Date.now() - new Date(i.publishedAt).getTime() <= TRENDING_WINDOW
//     );
//     log(`${categoryName}:after:trending-window`, trendingPool.length);

//     const poolToUse = trendingPool.length > 0 ? trendingPool : items;

//     const deduped = dedupeCanonical(poolToUse).sort(
//       (a, b) => trendingScore(b) - trendingScore(a)
//     );
//     log(`${categoryName}:after:dedupe`, deduped.length);

//     const enriched: EnrichedNewsItem[] = deduped
//       .slice(0, 10)
//       .map((item) => ({
//         ...item,
//         isFresh: isFresh(item),
//         feedType: isFresh(item) ? "breaking" : "trending",
//       }));

//     const freshCount = enriched.filter((i) => i.isFresh).length;
//     log(`${categoryName}:fresh-count`, freshCount);

//     return enriched;
//   }

//   const tech = processCategory(techRaw, "tech");
//   const finance = processCategory(financeRaw, "finance");
//   const crypto = processCategory(cryptoRaw, "crypto");

//   const globalPool = dedupeAcrossCategories([...tech, ...finance, ...crypto]);
//   log("globalPool:count", globalPool.length);

//   const canonical: EnrichedNewsItem[] = [];
//   let redisSkipped = 0;

//   for (const item of globalPool) {
//     const key = `canonical:${item.category}:${fingerprint(item)}`;
//     if (redis) {
//       const cached = await redis.get(key);
//       if (cached) {
//         redisSkipped++;
//         continue;
//       }
//       await redis.set(key, JSON.stringify(item), { ex: 60 * 60 * 72 });
//     }
//     canonical.push(item);
//   }

//   log("redis:skipped", redisSkipped);
//   log("canonical:final-count", canonical.length);

//   canonical.sort((a, b) => trendingScore(b) - trendingScore(a));

//   for (const story of canonical) {
//     if (!story.summary) story.summary = await summarizeStory(story);
//   }

//   // BREAKING NEWS FIX
//   let breaking = canonical.filter((i) => i.isFresh);

//   if (breaking.length === 0) {
//     breaking = canonical.slice(0, 5).map((item) => ({
//       ...item,
//       isFresh: true,
//       feedType: "breaking",
//     }));
//   }

//   log("breaking:count", breaking.length);

//   return {
//     tech,
//     finance,
//     crypto,
//     breaking,
//     topStories: canonical.slice(0, 5),
//   };
// }





































































import { normalizeNews } from "./normalize";
import { NewsItem, NewsCategory, RawNewsArticle } from "./types";
import { Redis } from "@upstash/redis";

const API_KEY = process.env.NEWS_API_KEY!;
const BASE_URL = process.env.NEWS_API_URL!;
const CRYPTO_URL = process.env.CRYPTO_URL!;

// TYPES
type EnrichedNewsItem = NewsItem & {
  isFresh: boolean;
  feedType: "breaking" | "trending";
};

// DEBUG LOGGER (dev only)
function log(stage: string, data: unknown) {
  if (process.env.NODE_ENV !== "production") {
    console.log(`[news:${stage}]`, data);
  }
}

// UPSTASH REDIS
let redis: Redis | null = null;
if (
  process.env.ENABLE_REDIS === "true" &&
  process.env.UPSTASH_REDIS_REST_URL &&
  process.env.UPSTASH_REDIS_REST_TOKEN
) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  log("redis:init", "Redis enabled");
} else {
  log("redis:init", "Redis disabled");
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
  if (
    ["reuters", "bloomberg", "financial times", "wall street journal"].some((p) =>
      s.includes(p)
    )
  )
    return 100;
  if (["the verge", "wired", "techcrunch"].some((p) => s.includes(p)))
    return 80;
  return 50;
}

// --------------------------------------------------------------------
// ✅ STABLE FINGERPRINT (KEY FIX)
// --------------------------------------------------------------------
function fingerprint(item: NewsItem): string {
  return item.url;
}

// --------------------------------------------------------------------
// DEDUPE HELPERS
// --------------------------------------------------------------------
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

    if (
      scoreA > scoreB ||
      (scoreA === scoreB &&
        new Date(item.publishedAt) < new Date(existing.publishedAt))
    ) {
      map.set(key, item);
    }
  }

  return Array.from(map.values());
}

function dedupeAcrossCategories(items: EnrichedNewsItem[]): EnrichedNewsItem[] {
  const seen = new Set<string>();

  return items.filter((item) => {
    const key = fingerprint(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// --------------------------------------------------------------------
// FETCH CATEGORY
// --------------------------------------------------------------------
async function fetchCategory(category: NewsCategory): Promise<NewsItem[]> {
  const sources = SOURCE_CATEGORIES[category];
  const query = QUERY_CATEGORIES[category];

  const url =
    category === "crypto"
      ? `${CRYPTO_URL}?q=${encodeURIComponent(
          query
        )}&pageSize=20&language=en&sortBy=publishedAt&apiKey=${API_KEY}`
      : `${BASE_URL}?sources=${sources}&pageSize=20&language=en&sortBy=publishedAt&apiKey=${API_KEY}`;

  const res = await fetch(url, {
    cache: "force-cache",
    next: { revalidate: 60 * 60 * 8 },
  });

  if (!res.ok) return [];

  const json = await res.json();
  let articles: RawNewsArticle[] = json.articles || [];

  if (category === "crypto") {
    articles = articles.filter(
      (a) =>
        !CRYPTO_SOURCE_BLACKLIST.some((d) =>
          a.url?.toLowerCase().includes(d)
        ) &&
        TRUSTED_CRYPTO_SOURCES.some((s) =>
          a.source?.name?.toLowerCase().includes(s)
        )
    );
  }

  const normalized = normalizeNews(articles, category);
  log(`${category}:normalized`, normalized.length);

  return normalized;
}

// --------------------------------------------------------------------
// TRENDING + FRESH LOGIC
// --------------------------------------------------------------------
const FRESH_WINDOW = 12 * 60 * 60 * 1000;
const TRENDING_WINDOW = 48 * 60 * 60 * 1000;

function isFresh(item: NewsItem): boolean {
  return Date.now() - new Date(item.publishedAt).getTime() <= FRESH_WINDOW;
}

function trendingScore(item: NewsItem): number {
  const hoursAgo =
    (Date.now() - new Date(item.publishedAt).getTime()) / 36e5;
  return Math.max(0, 48 - hoursAgo) * 2 + sourceScore(item.source, item.category);
}

function makeFeedType(item: NewsItem): "breaking" | "trending" {
  return isFresh(item) ? "breaking" : "trending";
}

// --------------------------------------------------------------------
// MAIN
// --------------------------------------------------------------------
export async function getTopNews(
  sessionId?: string,
  options?: { dedupe?: boolean }
) {
  const dedupe = options?.dedupe !== false;

  log("session", sessionId ?? "no-session");

  const [techRaw, financeRaw, cryptoRaw] = await Promise.all([
    fetchCategory("tech"),
    fetchCategory("finance"),
    fetchCategory("crypto"),
  ]);

  async function processCategory(
    items: NewsItem[],
    categoryName: string
  ): Promise<EnrichedNewsItem[]> {
    const recentPool = items.filter(
      (i) => Date.now() - new Date(i.publishedAt).getTime() <= TRENDING_WINDOW
    );

    const pool = dedupeCanonical(recentPool).sort(
      (a, b) => trendingScore(b) - trendingScore(a)
    );

    if (!sessionId || !dedupe) {
      log(`${categoryName}:dedupe`, "skipped");
      return pool.slice(0, 10).map((item) => ({
        ...item,
        isFresh: isFresh(item),
        feedType: makeFeedType(item),
      }));
    }

    const enriched: EnrichedNewsItem[] = [];
    let skipped = 0;

    for (const item of pool.slice(0, 10)) {
      const key = `session:${sessionId}:${categoryName}:${fingerprint(item)}`;

      const seen = redis ? await redis.get(key) : null;

      if (seen) {
        skipped++;
        continue;
      }

      if (redis) {
        await redis.set(key, "1", { ex: 60 * 60 * 72 });
      }

      enriched.push({
        ...item,
        isFresh: isFresh(item),
        feedType: makeFeedType(item),
      });
    }

    log(`${categoryName}:session-skipped`, skipped);

    return enriched.length
      ? enriched
      : pool.slice(0, 5).map((item) => ({
          ...item,
          isFresh: isFresh(item),
          feedType: makeFeedType(item),
        }));
  }

  const tech = await processCategory(techRaw, "tech");
  const finance = await processCategory(financeRaw, "finance");
  const crypto = await processCategory(cryptoRaw, "crypto");

  const globalPool = dedupeAcrossCategories([
    ...tech,
    ...finance,
    ...crypto,
  ]).sort((a, b) => trendingScore(b) - trendingScore(a));

  const breaking =
    globalPool.filter((i) => i.isFresh).slice(0, 5) ||
    globalPool.slice(0, 5);

  return {
    tech,
    finance,
    crypto,
    breaking,
    topStories: globalPool.slice(0, 5),
  };
}
