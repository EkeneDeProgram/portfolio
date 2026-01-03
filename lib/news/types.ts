// News Categories
export type NewsCategory = "tech" | "finance" | "crypto";

// Normalized News Item (used in UI & app logic)
export type NewsItem = {
  id: string;              // unique identifier (used for dedupe)
  title: string;
  description: string;
  url: string;
  image?: string;
  source: string;
  publishedAt: string;
  category: NewsCategory;
  summary?: string;
};

// Raw API Response Shape (external, untrusted data)
export type RawNewsArticle = {
  title?: string | null;
  description?: string | null;
  url: string;
  urlToImage?: string | null;
  source?: {
    name?: string | null;
  } | null;
  publishedAt?: string | null;
};

