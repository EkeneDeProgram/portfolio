// lib/blog/unified.ts
export type UnifiedContentType = "blog" | "news";

export type UnifiedItem = {
  id: string;
  type: UnifiedContentType;

  title: string;
  excerpt: string;
  date: string;

  href: string;
  image?: string;

  categoryLabel: string;
  categorySlug: string;
};
