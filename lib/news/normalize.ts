import { NewsItem, NewsCategory, RawNewsArticle } from "./types";

// Category-specific fallback images
const FALLBACK_IMAGES: Record<NewsCategory, string> = {
  crypto: "/images/crypto_news.jpg",
  finance: "/images/finance_news.jpg",
  tech: "/images/tech_news.jpg",
};

// Ultimate safety fallback (should rarely be used)
const DEFAULT_FALLBACK = "/images/news-fallback.jpg";

export function normalizeNews(
  articles: RawNewsArticle[],
  category: NewsCategory
): NewsItem[] {
  const fallbackImage =
    FALLBACK_IMAGES[category] ?? DEFAULT_FALLBACK;

  return articles
    // Require only a URL to keep crypto results resilient
    .filter((a): a is RawNewsArticle & { url: string } => Boolean(a.url))
    .map((a) => ({
      id: a.url,
      title: a.title ?? "Untitled",
      description:
        a.description ??
        "Read the full article for the latest updates.",
      url: a.url,
      image: a.urlToImage || fallbackImage,
      source: a.source?.name ?? "Unknown",
      publishedAt: a.publishedAt ?? new Date().toISOString(),
      category,
    }));
}
