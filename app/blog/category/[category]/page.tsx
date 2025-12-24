// app/blog/category/[category]/page.tsx
import { strapiQuery } from "@/lib/cms";
import BlogLayout from "@/components/blog/BlogLayout";
import BlogPostCard from "@/components/blog/BlogPostCard";
import BlogCategoryTabs from "@/components/blog/BlogCategoryTabs";
import BlogEmptyState from "@/components/blog/BlogEmptyState";

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
  category: string;      // Display label
  categorySlug: string;  // URL slug
  excerpt: string;
};

// GraphQL query for all collections
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
  const text = blocks.flatMap(block => block.children).map(child => stripHtml(child.text)).join(" ");
  return text.length <= length ? text : text.slice(0, text.lastIndexOf(" ", length)) + "…";
}

interface Props {
  params: { category: string } | Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: Props) {
  // Await params if it's a Promise
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
    ...data.projectUpdates.map(p => ({
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
    ...data.careerGrowths.map(p => ({
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
    ...data.engineeringNotes.map(p => ({
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

  const posts = allPosts.filter(post => post.categorySlug === category);

  posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <BlogLayout>
      {/* Responsive heading */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10">
        {category.replace(/-/g, " ")}
      </h1>

      <BlogCategoryTabs active={category} />

      {posts.length === 0 ? (
        <BlogEmptyState
          message={`No posts found for "${category.replace(/-/g, " ")}".`}
        />
      ) : (
        <ul className="space-y-6 sm:space-y-8 md:space-y-10 mt-4 sm:mt-6">
          {posts.map(post => (
            <BlogPostCard key={post.documentId} post={post} />
          ))}
        </ul>
      )}
    </BlogLayout>
  );
}

