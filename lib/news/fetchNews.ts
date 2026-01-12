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

// // UPSTASH REDIS
// let redis: Redis | null = null;
// if (
//   process.env.ENABLE_REDIS === "true" &&
//   process.env.UPSTASH_REDIS_REST_URL &&
//   process.env.UPSTASH_REDIS_REST_TOKEN
// ) {
//   redis = new Redis({
//     url: process.env.UPSTASH_REDIS_REST_URL,
//     token: process.env.UPSTASH_REDIS_REST_TOKEN,
//   });
//   log("redis:init", "Redis enabled");
// } else {
//   log("redis:init", "Redis disabled");
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

// // STABLE FINGERPRINT
// function fingerprint(item: NewsItem): string {
//   return item.url;
// }

// // DEDUPE HELPERS
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
//   const seen = new Set<string>();

//   return items.filter((item) => {
//     const key = fingerprint(item);
//     if (seen.has(key)) return false;
//     seen.add(key);
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

//   const res = await fetch(url, {
//     cache: "force-cache",
//     next: { revalidate: 60 * 60 * 8 },
//   });

//   if (!res.ok) return [];

//   const json = await res.json();
//   let articles: RawNewsArticle[] = json.articles || [];

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
//   }

//   const normalized = normalizeNews(articles, category);
//   log(`${category}:normalized`, normalized.length);

//   return normalized;
// }

// // TRENDING + FRESH
// const FRESH_WINDOW = 12 * 60 * 60 * 1000;
// const TRENDING_WINDOW = 48 * 60 * 60 * 1000;

// function isFresh(item: NewsItem): boolean {
//   return Date.now() - new Date(item.publishedAt).getTime() <= FRESH_WINDOW;
// }

// function trendingScore(item: NewsItem): number {
//   const hoursAgo =
//     (Date.now() - new Date(item.publishedAt).getTime()) / 36e5;
//   return Math.max(0, 48 - hoursAgo) * 2 + sourceScore(item.source, item.category);
// }

// function makeFeedType(item: NewsItem): "breaking" | "trending" {
//   return isFresh(item) ? "breaking" : "trending";
// }

// // ROTATING FALLBACK
// function rotateFallback(
//   items: NewsItem[],
//   sessionId: string | undefined,
//   count: number
// ): NewsItem[] {
//   if (!items.length) return [];
//   const seed =
//     (sessionId?.split("-").join("").length ?? 1) % items.length;

//   const rotated = [...items.slice(seed), ...items.slice(0, seed)];
//   return rotated.slice(0, count);
// }

// // MAIN
// export async function getTopNews(
//   sessionId?: string,
//   options?: { dedupe?: boolean }
// ) {
//   const dedupe = options?.dedupe !== false;
//   log("session", sessionId ?? "no-session");

//   const [techRaw, financeRaw, cryptoRaw] = await Promise.all([
//     fetchCategory("tech"),
//     fetchCategory("finance"),
//     fetchCategory("crypto"),
//   ]);

//   async function processCategory(
//     items: NewsItem[],
//     categoryName: string
//   ): Promise<EnrichedNewsItem[]> {
//     const recentPool = items.filter(
//       (i) => Date.now() - new Date(i.publishedAt).getTime() <= TRENDING_WINDOW
//     );

//     const pool = dedupeCanonical(recentPool).sort(
//       (a, b) => trendingScore(b) - trendingScore(a)
//     );

//     if (!sessionId || !dedupe) {
//       log(`${categoryName}:dedupe`, "skipped");
//       return pool.slice(0, 10).map((item) => ({
//         ...item,
//         isFresh: isFresh(item),
//         feedType: makeFeedType(item),
//       }));
//     }

//     const enriched: EnrichedNewsItem[] = [];
//     let skippedSession = 0;
//     let skippedDay = 0;
//     const today = new Date().toISOString().slice(0, 10);

//     for (const item of pool.slice(0, 10)) {
//       const fp = fingerprint(item);
//       const sessionKey = `session:${sessionId}:${categoryName}:${fp}`;
//       const dayKey = `day:${today}:${categoryName}:${fp}`;

//       if (redis) {
//         if (await redis.get(sessionKey)) {
//           skippedSession++;
//           continue;
//         }
//         if (await redis.get(dayKey)) {
//           skippedDay++;
//           continue;
//         }

//         await redis.set(sessionKey, "1", { ex: 60 * 60 * 72 });
//         await redis.set(dayKey, "1", { ex: 60 * 60 * 24 });
//       }

//       enriched.push({
//         ...item,
//         isFresh: isFresh(item),
//         feedType: makeFeedType(item),
//       });
//     }

//     log(`${categoryName}:session-skipped`, skippedSession);
//     log(`${categoryName}:day-skipped`, skippedDay);

//     if (enriched.length) return enriched;

//     log(`${categoryName}:fallback`, "rotated");
//     return rotateFallback(pool, sessionId, 5).map((item) => ({
//       ...item,
//       isFresh: isFresh(item),
//       feedType: "trending",
//     }));
//   }

//   const tech = await processCategory(techRaw, "tech");
//   const finance = await processCategory(financeRaw, "finance");
//   const crypto = await processCategory(cryptoRaw, "crypto");

//   const globalPool = dedupeAcrossCategories([
//     ...tech,
//     ...finance,
//     ...crypto,
//   ]).sort((a, b) => trendingScore(b) - trendingScore(a));

//   // SOFT BREAKING FALLBACK + LOGGING
//   const freshBreaking = globalPool.filter((i) => i.isFresh).slice(0, 5);

//   let breaking: EnrichedNewsItem[];

//   if (freshBreaking.length) {
//     breaking = freshBreaking;
//     log("breaking", "fresh");
//   } else {
//     breaking = globalPool.slice(0, 5).map((item) => ({
//       ...item,
//       isFresh: false,
//       feedType: "trending",
//     }));
//     log("breaking:fallback", "trending-used");
//   }

//   // SOFT TOP STORIES FALLBACK + LOGGING
//   let topStories: EnrichedNewsItem[];
//   const topPool = globalPool.slice(0, 5);

//   if (topPool.length < 5) {
//     topStories = rotateFallback(globalPool, sessionId, 5).map((item) => ({
//       ...item,
//       isFresh: isFresh(item),
//       feedType: "trending",
//     }));
//     log("topStories:fallback", "rotated-used");
//   } else {
//     topStories = topPool;
//     log("topStories", "normal");
//   }

//   return {
//     tech,
//     finance,
//     crypto,
//     breaking,
//     topStories,
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
  if (["the verge", "wired", "techcrunch"].some((p) => s.includes(p))) return 80;
  return 50;
}

// STABLE FINGERPRINT
function fingerprint(item: NewsItem): string {
  return item.url;
}

// DEDUPE HELPERS
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

// FETCH CATEGORY
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
        !CRYPTO_SOURCE_BLACKLIST.some((d) => a.url?.toLowerCase().includes(d)) &&
        TRUSTED_CRYPTO_SOURCES.some((s) =>
          a.source?.name?.toLowerCase().includes(s)
        )
    );
  }

  const normalized = normalizeNews(articles, category);
  log(`${category}:normalized`, normalized.length);

  return normalized;
}

// TRENDING + FRESH
const FRESH_WINDOW = 12 * 60 * 60 * 1000;
const TRENDING_WINDOW = 48 * 60 * 60 * 1000;

function isFresh(item: NewsItem): boolean {
  return Date.now() - new Date(item.publishedAt).getTime() <= FRESH_WINDOW;
}

function trendingScore(item: NewsItem): number {
  const hoursAgo = (Date.now() - new Date(item.publishedAt).getTime()) / 36e5;
  return Math.max(0, 48 - hoursAgo) * 2 + sourceScore(item.source, item.category);
}

function makeFeedType(item: NewsItem): "breaking" | "trending" {
  return isFresh(item) ? "breaking" : "trending";
}

// ROTATING FALLBACK
function rotateFallback(
  items: NewsItem[],
  sessionId: string | undefined,
  count: number
): NewsItem[] {
  if (!items.length) return [];
  const seed = (sessionId?.split("-").join("").length ?? 1) % items.length;

  const rotated = [...items.slice(seed), ...items.slice(0, seed)];
  return rotated.slice(0, count);
}

// MAIN
export async function getTopNews(
  sessionId?: string,
  options?: { dedupe?: boolean; forceRefresh?: boolean } // ✅ Added forceRefresh
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
    let skippedSession = 0;
    let skippedDay = 0;
    const today = new Date().toISOString().slice(0, 10);

    for (const item of pool.slice(0, 10)) {
      const fp = fingerprint(item);
      const sessionKey = `session:${sessionId}:${categoryName}:${fp}`;
      const dayKey = `day:${today}:${categoryName}:${fp}`;

      if (redis) {
        // ✅ Modified for forceRefresh
        if (!options?.forceRefresh && (await redis.get(sessionKey))) {
          skippedSession++;
          continue;
        }
        if (await redis.get(dayKey)) {
          skippedDay++;
          continue;
        }

        await redis.set(sessionKey, "1", { ex: 60 * 60 * 72 });
        await redis.set(dayKey, "1", { ex: 60 * 60 * 24 });
      }

      enriched.push({
        ...item,
        isFresh: isFresh(item),
        feedType: makeFeedType(item),
      });
    }

    log(`${categoryName}:session-skipped`, skippedSession);
    log(`${categoryName}:day-skipped`, skippedDay);

    if (enriched.length) return enriched;

    log(`${categoryName}:fallback`, "rotated");
    return rotateFallback(pool, sessionId, 5).map((item) => ({
      ...item,
      isFresh: isFresh(item),
      feedType: "trending",
    }));
  }

  const tech = await processCategory(techRaw, "tech");
  const finance = await processCategory(financeRaw, "finance");
  const crypto = await processCategory(cryptoRaw, "crypto");

  const globalPool = dedupeAcrossCategories([...tech, ...finance, ...crypto]).sort(
    (a, b) => trendingScore(b) - trendingScore(a)
  );

  // SOFT BREAKING FALLBACK + LOGGING
  const freshBreaking = globalPool.filter((i) => i.isFresh).slice(0, 5);

  let breaking: EnrichedNewsItem[];

  if (freshBreaking.length) {
    breaking = freshBreaking;
    log("breaking", "fresh");
  } else {
    breaking = globalPool.slice(0, 5).map((item) => ({
      ...item,
      isFresh: false,
      feedType: "trending",
    }));
    log("breaking:fallback", "trending-used");
  }

  // SOFT TOP STORIES FALLBACK + LOGGING
  let topStories: EnrichedNewsItem[];
  const topPool = globalPool.slice(0, 5);

  if (topPool.length < 5) {
    topStories = rotateFallback(globalPool, sessionId, 5).map((item) => ({
      ...item,
      isFresh: isFresh(item),
      feedType: "trending",
    }));
    log("topStories:fallback", "rotated-used");
  } else {
    topStories = topPool;
    log("topStories", "normal");
  }

  return {
    tech,
    finance,
    crypto,
    breaking,
    topStories,
  };
}
