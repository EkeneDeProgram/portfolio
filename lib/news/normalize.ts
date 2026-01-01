import { NewsItem, NewsCategory, RawNewsArticle } from "./types";

const FALLBACK_IMAGE = "/images/news-fallback.jpg";

export function normalizeNews(
  articles: RawNewsArticle[],
  category: NewsCategory
): NewsItem[] {
  return articles
    .filter((a): a is RawNewsArticle & { url: string } => Boolean(a.url))
    .map((a) => ({
      id: a.url,
      title: a.title ?? "Untitled",
      description:
        a.description ??
        "Read the full article for the latest updates.",
      url: a.url,
      image: a.urlToImage || FALLBACK_IMAGE,
      source: a.source?.name ?? "Unknown",
      publishedAt: a.publishedAt ?? new Date().toISOString(),
      category,
    }));
}
