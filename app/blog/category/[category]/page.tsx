import { strapiQuery } from "@/lib/cms";
import BlogLayout from "@/components/blog/BlogLayout";
import BlogPostCard from "@/components/blog/BlogPostCard";
import BlogCategoryTabs from "@/components/blog/BlogCategoryTabs";
import BlogEmptyState from "@/components/blog/BlogEmptyState";

import { Metadata } from "next";

// Blog page SEO metadata
export const metadata: Metadata = {
  title: "Blog post | Ekene Onyekachi",
  description:
    "Stay updated with Ekene Onyekachi's latest blog posts, engineering notes, career growth insights, project updates.",
  openGraph: {
    title: "Blog | Ekene Onyekachi",
    description:
      "Stay updated with Ekene Onyekachi's latest blog posts, engineering notes, career growth insights, project updates.",
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

type Post = {
  documentId: string;
  title: string;
  slug: string;
  createdAt: string;
  content: RichTextBlock[];
  featuredImage?: { url: string; alternativeText?: string };
  category: string;
  categorySlug: string;
  excerpt: string;
};

// GraphQL query
const GET_ALL_POSTS = `
  query {
    projectUpdates(sort: "createdAt:desc") {
      documentId
      title
      slug
      createdAt
      content
      featuredImage { url alternativeText }
    }
    careerGrowths(sort: "createdAt:desc") {
      documentId
      title
      slug
      createdAt
      content
      featuredImage { url alternativeText }
    }
    engineeringNotes(sort: "createdAt:desc") {
      documentId
      title
      slug
      createdAt
      content
      featuredImage { url alternativeText }
    }
  }
`;

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "");
}

function normalizeContent(content: RichTextBlock[] | string): RichTextBlock[] {
  if (!content) return [];
  if (Array.isArray(content)) return content;
  return [{ type: "paragraph", children: [{ text: content, type: "text" }] }];
}

function getExcerpt(content: RichTextBlock[] | string, length = 140) {
  const blocks = normalizeContent(content);
  const text = blocks
    .flatMap((block) => block.children)
    .map((child) => stripHtml(child.text))
    .join(" ");
  return text.length <= length
    ? text
    : text.slice(0, text.lastIndexOf(" ", length)) + "…";
}

interface Props {
  params: { category: string } | Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: Props) {
  const resolvedParams = await params;
  const category = resolvedParams.category;

  const data = await strapiQuery<{
    projectUpdates: {
      documentId: string;
      title: string;
      slug: string;
      createdAt: string;
      content: RichTextBlock[] | string;
      featuredImage?: { url: string; alternativeText?: string };
    }[];
    careerGrowths: {
      documentId: string;
      title: string;
      slug: string;
      createdAt: string;
      content: RichTextBlock[] | string;
      featuredImage?: { url: string; alternativeText?: string };
    }[];
    engineeringNotes: {
      documentId: string;
      title: string;
      slug: string;
      createdAt: string;
      content: RichTextBlock[] | string;
      featuredImage?: { url: string; alternativeText?: string };
    }[];
  }>(GET_ALL_POSTS);

  const allPosts: Post[] = [
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

  const posts = allPosts
    .filter((post) => post.categorySlug === category)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );

  return (
    <BlogLayout>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-6 sm:mb-8 md:mb-10 text-2xl sm:text-3xl md:text-4xl font-bold capitalize">
          {category.replace(/-/g, " ")}
        </h1>

        <BlogCategoryTabs active={category} />

        {posts.length === 0 ? (
          <BlogEmptyState
            message={`No posts found for "${category.replace(/-/g, " ")}".`}
          />
        ) : (
          <ul className="mt-6 sm:mt-8 space-y-6 sm:space-y-8 md:space-y-10">
            {posts.map((post) => (
              <BlogPostCard
                key={post.documentId}
                post={{
                  ...post,
                  featuredImage: post.featuredImage
                    ? {
                        ...post.featuredImage,
                        url: post.featuredImage.url,
                      }
                    : undefined,
                }}
              />
            ))}
          </ul>
        )}
      </div>
    </BlogLayout>
  );
}
