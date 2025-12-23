import { NewsItem, NewsCategory, RawNewsArticle } from "./types";

export function normalizeNews(
  articles: RawNewsArticle[],
  category: NewsCategory
): NewsItem[] {
  return articles
    .filter((a): a is RawNewsArticle & { url: string } => Boolean(a.url))
    .map((a) => ({
      id: a.url, // URL = stable unique identifier
      title: a.title ?? "Untitled",
      description: a.description ?? "",
      url: a.url,
      image: a.urlToImage ?? undefined,
      source: a.source?.name ?? "Unknown",
      publishedAt: a.publishedAt ?? new Date().toISOString(),
      category,
    }));
}
