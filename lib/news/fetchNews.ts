import { normalizeNews } from "./normalize";
import { NewsItem, NewsCategory } from "./types";

const API_KEY = process.env.NEWS_API_KEY!;
const BASE_URL = process.env.NEWS_API_URL!;
const CRYPTO_URL = process.env.CRYPTO_URL!;

// Source-based categories (NewsAPI sources)
const SOURCE_CATEGORIES: Partial<Record<NewsCategory, string>> = {
  tech: "techcrunch,the-verge,wired,ars-technica",
  finance: "bloomberg,reuters,financial-times,wall-street-journal",
};

// Query-based categories
const QUERY_CATEGORIES: Record<NewsCategory, string> = {
  tech: "technology",
  finance: "finance",
  crypto: "bitcoin OR crypto OR blockchain OR ethereum",
};

// Fetch news for a single category
async function fetchCategory(category: NewsCategory): Promise<NewsItem[]> {
  const sources = SOURCE_CATEGORIES[category];
  const query = QUERY_CATEGORIES[category];

  // Use /everything for crypto, sources for others
  const url =
    category === "crypto"
      ? `${CRYPTO_URL}?q=${encodeURIComponent(
          query
        )}&pageSize=10&language=en&sortBy=publishedAt&apiKey=${API_KEY}`
      : sources
      ? `${BASE_URL}?sources=${sources}&pageSize=10&language=en&sortBy=publishedAt&apiKey=${API_KEY}`
      : `${BASE_URL}?q=${encodeURIComponent(
          query
        )}&pageSize=10&language=en&sortBy=publishedAt&apiKey=${API_KEY}`;

  if (category === "crypto") {
    console.log("[Crypto News] Fetching from /everything endpoint");
  } else {
    console.log(`[NewsAPI] Fetching ${category} news from ${url}`);
  }

  const res = await fetch(url, {
    cache: "force-cache", // cache all categories
    next: {
      revalidate: 60 * 60 * 8, // 8 hours
      tags: [`news-${category}`],
    },
  });

  if (!res.ok) {
    console.error(`[NewsAPI] Failed for ${category}: ${res.status}`);
    return [];
  }

  const data = await res.json();

  if (category === "crypto") {
    console.log(
      `[Crypto News] Articles received: ${data.articles?.length ?? 0}`
    );
  }

  return normalizeNews(data.articles || [], category);
}

// Remove duplicate articles based on URL
function dedupeByUrl(items: NewsItem[]): NewsItem[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.url)) return false;
    seen.add(item.url);
    return true;
  });
}

// Get top news grouped by category
export async function getTopNews(): Promise<Record<NewsCategory, NewsItem[]>> {
  const [tech, finance, crypto] = await Promise.all([
    fetchCategory("tech"),
    fetchCategory("finance"),
    fetchCategory("crypto"),
  ]);

  return {
    tech: dedupeByUrl(tech).slice(0, 10),
    finance: dedupeByUrl(finance).slice(0, 10),
    crypto: dedupeByUrl(crypto).slice(0, 10),
  };
}

