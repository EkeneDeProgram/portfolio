// app/blog/page.tsx

import { strapiQuery } from "@/lib/cms";
import { getTopNews } from "@/lib/news/fetchNews";
import { UnifiedItem } from "@/lib/blog/unified";

import BlogLayout from "@/components/blog/BlogLayout";
import BlogContentTypeTabs from "@/components/blog/BlogContentTypeTabs";
import UnifiedCard from "@/components/blog/UnifiedCard";
import BlogEmptyState from "@/components/blog/BlogEmptyState";

// Types
type RichTextChild = {
  text: string;
  type: string;
};

type RichTextBlock = {
  type: string;
  children: RichTextChild[];
};

type StrapiImage = {
  url: string;
  alternativeText?: string;
};

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

// GraphQL
const GET_ALL_POSTS = `
  query {
    projectUpdates(sort: "createdAt:desc") {
      documentId
      title
      slug
      createdAt
      content
      featuredImage {
        url
        alternativeText
      }
    }
    careerGrowths(sort: "createdAt:desc") {
      documentId
      title
      slug
      createdAt
      content
      featuredImage {
        url
        alternativeText
      }
    }
    engineeringNotes(sort: "createdAt:desc") {
      documentId
      title
      slug
      createdAt
      content
      featuredImage {
        url
        alternativeText
      }
    }
  }
`;

// Helpers
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}

function normalizeContent(content: RichTextBlock[] | string): RichTextBlock[] {
  if (!content) return [];
  if (Array.isArray(content)) return content;
  return [
    {
      type: "paragraph",
      children: [{ text: content, type: "text" }],
    },
  ];
}

function getExcerpt(content: RichTextBlock[] | string, length = 140): string {
  const blocks = normalizeContent(content);
  const text = blocks
    .flatMap((block) => block.children)
    .map((child) => stripHtml(child.text))
    .join(" ");

  return text.length <= length
    ? text
    : `${text.slice(0, text.lastIndexOf(" ", length))}…`;
}

// Props
interface Props {
  searchParams?: Promise<{
    type?: "blog" | "news";
  }>;
}

// Page Component
export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams;
  const filter = params?.type ?? "all";

  // Fetch CMS blog posts
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
    image: post.featuredImage ? `http://localhost:1337${post.featuredImage.url}` : undefined,
    categoryLabel: post.category,
    categorySlug: post.categorySlug,
  }));

  // Fetch & map news
  const newsRaw = await getTopNews(); // { tech: [...], finance: [...], crypto: [...] }

  // Map to UnifiedItem
  const newsByCategory: Record<string, UnifiedItem[]> = {};
  Object.entries(newsRaw).forEach(([category, items]) => {
    newsByCategory[category] = items.map((item) => ({
      id: item.id,
      type: "news",
      title: item.title,
      excerpt: item.description || "",
      date: item.publishedAt,
      href: item.url,
      image: item.image,
      categoryLabel: category.toUpperCase(),
      categorySlug: category,
    }));
  });

  // Render
  return (
    <BlogLayout>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">Blog</h1>

      {/* Blog / News toggle */}
      <BlogContentTypeTabs active={filter} />

      {/* Blog Section */}
      {filter === "blog" && blogItems.length === 0 && (
        <BlogEmptyState message="No blog content available." />
      )}
      {filter === "blog" && blogItems.length > 0 && (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
          {blogItems.map((item) => (
            <UnifiedCard key={`${item.type}-${item.id}`} item={item} />
          ))}
        </ul>
      )}

      {/* News Section */}
      {filter === "news" &&
        Object.entries(newsByCategory).map(([category, items]) => (
          <section key={category} className="mt-8">
            <h2 className="text-xl font-semibold mb-4">
              {category.charAt(0).toUpperCase() + category.slice(1)} News
            </h2>
            {items.length === 0 ? (
              <BlogEmptyState message={`No ${category} news available.`} />
            ) : (
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <UnifiedCard key={`${item.type}-${item.id}`} item={item} />
                ))}
              </ul>
            )}
          </section>
        ))}

      {/* All content */}
      {filter === "all" && (
        <>
          {/* Blogs */}
          {blogItems.length > 0 && (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
              {blogItems.map((item) => (
                <UnifiedCard key={`${item.type}-${item.id}`} item={item} />
              ))}
            </ul>
          )}

          {/* News grouped by category */}
          {Object.entries(newsByCategory).map(([category, items]) => (
            <section key={category} className="mt-8">
              <h2 className="text-xl font-semibold mb-4">
                {category.charAt(0).toUpperCase() + category.slice(1)} News
              </h2>
              {items.length === 0 ? (
                <BlogEmptyState message={`No ${category} news available.`} />
              ) : (
                <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((item) => (
                    <UnifiedCard key={`${item.type}-${item.id}`} item={item} />
                  ))}
                </ul>
              )}
            </section>
          ))}
        </>
      )}
    </BlogLayout>
  );
}

