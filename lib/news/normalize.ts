import { NewsItem, NewsCategory, RawNewsArticle } from "./types";

//FALLBACK IMAGES
const FALLBACK_IMAGES: Record<NewsCategory, string> = {
  crypto: "/images/crypto_news.jpg",
  finance: "/images/finance_news.jpg",
  tech: "/images/tech_news.jpg",
};

const DEFAULT_FALLBACK = "/images/news-fallback.jpg";

// HELPERS
function normalizeText(value: string | null | undefined): string {
  return value
    ? value
        .normalize("NFKD") // normalize unicode
        .replace(/[^\w\s]/g, "") // remove symbols
        .replace(/\s+/g, " ")
        .trim()
    : "";
}

function normalizeSource(
  source: { name?: string | null } | null | undefined
): string {
  return source?.name?.trim() || "Unknown";
}

// NORMALIZER
export function normalizeNews(
  articles: RawNewsArticle[],
  category: NewsCategory
): NewsItem[] {
  const fallbackImage = FALLBACK_IMAGES[category] ?? DEFAULT_FALLBACK;

  return articles
    // Require only a URL to keep crypto results resilient
    .filter((a): a is RawNewsArticle & { url: string } => Boolean(a.url))
    .map((a) => ({
      id: a.url,
      title: normalizeText(a.title) || "Untitled",
      description:
        normalizeText(a.description) ||
        "Read the full article for the latest updates.",
      url: a.url,
      image: a.urlToImage || fallbackImage,
      source: normalizeSource(a.source),
      publishedAt: a.publishedAt ?? new Date().toISOString(),
      category,
      summary: undefined, // placeholder for AI summary
    }));
}
