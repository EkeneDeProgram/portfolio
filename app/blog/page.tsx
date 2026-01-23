import { strapiQuery } from "@/lib/cms";
import { getTopNews } from "@/lib/news/fetchNews";
import { UnifiedItem } from "@/lib/blog/unified";

import BlogLayout from "@/components/blog/BlogLayout";
import BlogContentTypeTabs from "@/components/blog/BlogContentTypeTabs";
import UnifiedCard from "@/components/blog/UnifiedCard";
import BlogEmptyState from "@/components/blog/BlogEmptyState";

import { Metadata } from "next";
import { event as gaEvent } from "@/lib/gtag";

// ISR: regenerate this page every 15 minutes
export const revalidate = 60 * 15;

// Blog page SEO metadata
export const metadata: Metadata = {
  title: "Blog post & News | Ekene Onyekachi",
  description:
    "Stay updated with Ekene Onyekachi's latest blog posts, engineering notes, career growth insights, project updates, and curated tech & crypto news.",
  openGraph: {
    title: "Blog post & News | Ekene Onyekachi",
    description:
      "Stay updated with Ekene Onyekachi's latest blog posts, engineering notes, career growth insights, project updates, and curated tech & crypto news.",
    type: "website",
    url: "https://yourdomain.com/blog",
    siteName: "Ekene Onyekachi Portfolio",
    images: [
      {
        url: "https://yourdomain.com/og-blog.png",
        width: 1200,
        height: 630,
        alt: "Blog & News by Ekene Onyekachi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@EkeneDeProgram",
    creator: "@EkeneDeProgram",
  },
};

// Types
type RichTextChild = { text: string; type: string };
type RichTextBlock = { type: string; children: RichTextChild[] };
type StrapiImage = { url: string; alternativeText?: string };

type StrapiPost = {
  documentId: string;
  title: string;
  slug: string;
  createdAt: string;
  content: RichTextBlock[] | string;
  featuredImage?: StrapiImage;
};

type StrapiBlogResponse = {
  projectUpdates: StrapiPost[];
  careerGrowths: StrapiPost[];
  engineeringNotes: StrapiPost[];
};

type Post = {
  documentId: string;
  title: string;
  slug: string;
  createdAt: string;
  content: RichTextBlock[];
  featuredImage?: StrapiImage;
  category: string;
  categorySlug: string;
  excerpt: string;
};

// GraphQL query
const GET_ALL_POSTS = `
query {
  projectUpdates(sort: "createdAt:desc") {
    documentId title slug createdAt content
    featuredImage { url alternativeText }
  }
  careerGrowths(sort: "createdAt:desc") {
    documentId title slug createdAt content
    featuredImage { url alternativeText }
  }
  engineeringNotes(sort: "createdAt:desc") {
    documentId title slug createdAt content
    featuredImage { url alternativeText }
  }
}
`;

// Helpers
const stripHtml = (html: string) => html.replace(/<[^>]*>/g, "");

function normalizeContent(content: RichTextBlock[] | string): RichTextBlock[] {
  if (!content) return [];
  if (Array.isArray(content)) return content;
  return [{ type: "paragraph", children: [{ text: content, type: "text" }] }];
}

function getExcerpt(content: RichTextBlock[] | string, length = 140): string {
  const text = normalizeContent(content)
    .flatMap((b) => b.children)
    .map((c) => stripHtml(c.text))
    .join(" ");
  return text.length <= length
    ? text
    : `${text.slice(0, text.lastIndexOf(" ", length))}…`;
}

// Slug helpers
function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}

function newsSlug(title: string, url: string) {
  const urlParts = url.split("/");
  const urlId = urlParts[urlParts.length - 1] || urlParts[urlParts.length - 2];
  return `${slugify(title)}-${urlId}`;
}

// Props
interface Props {
  searchParams?: Promise<{ type?: "blog" | "news" }>;
}

// SESSION FETCH
async function fetchSessionId(): Promise<string> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

  const res = await fetch(`${baseUrl}/api/session`, {
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch session");
  }

  const data = await res.json();
  return data.sessionId;
}

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams;
  const filter = params?.type ?? "all";

  const data = await strapiQuery<StrapiBlogResponse>(GET_ALL_POSTS);

  const blogPosts: Post[] = [
    ...data.projectUpdates.map((p) => ({
      documentId: p.documentId,
      title: p.title,
      slug: p.slug,
      createdAt: p.createdAt,
      content: normalizeContent(p.content),
      featuredImage: p.featuredImage,
      category: "Project Updates",
      categorySlug: "project-updates",
      excerpt: getExcerpt(p.content),
    })),
    ...data.careerGrowths.map((p) => ({
      documentId: p.documentId,
      title: p.title,
      slug: p.slug,
      createdAt: p.createdAt,
      content: normalizeContent(p.content),
      featuredImage: p.featuredImage,
      category: "Career Growth",
      categorySlug: "career-growth",
      excerpt: getExcerpt(p.content),
    })),
    ...data.engineeringNotes.map((p) => ({
      documentId: p.documentId,
      title: p.title,
      slug: p.slug,
      createdAt: p.createdAt,
      content: normalizeContent(p.content),
      featuredImage: p.featuredImage,
      category: "Engineering Notes",
      categorySlug: "engineering-notes",
      excerpt: getExcerpt(p.content),
    })),
  ];

  const blogItems: UnifiedItem[] = blogPosts.map((post) => ({
    id: post.documentId,
    type: "blog",
    title: post.title,
    excerpt: post.excerpt,
    date: post.createdAt,
    href: `/blog/${post.slug}`,
    image: post.featuredImage
      ? post.featuredImage.url.startsWith("http")
        ? post.featuredImage.url
        : `http://localhost:1337${post.featuredImage.url}`
      : undefined,
    categoryLabel: post.category,
    categorySlug: post.categorySlug,
    onClick: () =>
      gaEvent({
        action: "blog_click",
        category: "Blog",
        label: post.slug,
      }),
  }));

  const sessionId = await fetchSessionId();
  const newsRaw = await getTopNews(sessionId);

  const newsByCategory: Record<string, UnifiedItem[]> = {};

  Object.entries(newsRaw).forEach(([category, items]) => {
    newsByCategory[category] = items.map((item) => ({
      id: newsSlug(item.title, item.url),
      type: "news",
      title: item.title,
      excerpt: item.description || "",
      date: item.publishedAt,
      href: `/blog/news/${newsSlug(item.title, item.url)}`,
      image: item.image,
      categoryLabel: category.toUpperCase(),
      categorySlug: category,
      onClick: () =>
        gaEvent({
          action: "news_click",
          category: "News",
          label: newsSlug(item.title, item.url),
        }),
    }));
  });

  return (
    <BlogLayout>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">
          Blog
        </h1>

        <BlogContentTypeTabs active={filter} />

        {filter !== "news" && blogItems.length > 0 && (
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogItems.map((item) => (
              <UnifiedCard key={`${item.type}-${item.id}`} item={item} />
            ))}
          </ul>
        )}

        {(filter === "news" || filter === "all") &&
          Object.entries(newsByCategory).map(([category, items]) => (
            <section key={category} className="mt-10 sm:mt-12">
              <h2 className="mb-4 text-lg sm:text-xl font-semibold">
                {category.charAt(0).toUpperCase() + category.slice(1)} News
              </h2>

              {items.length === 0 ? (
                <BlogEmptyState message={`No ${category} news available.`} />
              ) : (
                <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((item) => (
                    <UnifiedCard
                      key={`${item.type}-${item.id}`}
                      item={item}
                    />
                  ))}
                </ul>
              )}
            </section>
          ))}
      </div>
    </BlogLayout>
  );
}
