import { normalizeNews } from "./normalize";
import { NewsItem, NewsCategory } from "./types";

const API_KEY = process.env.NEWS_API_KEY!;
const BASE_URL = process.env.NEWS_API_URL!;

async function fetchCategory(category: NewsCategory, query: string) {
  const res = await fetch(
    `${BASE_URL}?q=${query}&pageSize=10&apiKey=${API_KEY}`,
    {
      // Next.js cache + ISR
      next: {
        revalidate: 60 * 60 * 8, // 8 hours
        tags: [`news-${category}`],
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch ${category} news`);
  }

  const data = await res.json();
  return normalizeNews(data.articles || [], category);
}

export async function getTopNews(): Promise<NewsItem[]> {
  const [tech, finance, crypto] = await Promise.all([
    fetchCategory("tech", "technology"),
    fetchCategory("finance", "finance OR markets"),
    fetchCategory("crypto", "crypto OR blockchain"),
  ]);

  // Deduplicate across categories
  const map = new Map<string, NewsItem>();

  [...tech, ...finance, ...crypto].forEach((item) => {
    if (!map.has(item.id)) {
      map.set(item.id, item);
    }
  });

  return Array.from(map.values())
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() -
        new Date(a.publishedAt).getTime()
    )
    .slice(0, 10); // final top 10
}
