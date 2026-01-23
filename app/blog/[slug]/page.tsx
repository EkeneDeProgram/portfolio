import { strapiQuery } from "@/lib/cms";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

// Types
type RichTextChild = { text: string; type: string };
type RichTextBlock = { type: string; children: RichTextChild[] };
type FeaturedImage = { url: string; alternativeText?: string };

type Post = {
  documentId: string;
  title: string;
  content: RichTextBlock[] | string;
  createdAt: string;
  category?: string;
  categorySlug?: string;
  featuredImage?: FeaturedImage;
};

// DYNAMIC METADATA
interface Params {
  params: Promise<{ slug: string }>;
}

// Helper to normalize content
function normalizeContent(content: RichTextBlock[] | string | undefined): RichTextBlock[] {
  if (!content) return [];
  if (Array.isArray(content)) return content;
  return [{ type: "paragraph", children: [{ text: content, type: "text" }] }];
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const GET_POST_BY_SLUG = `
    query ($slug: String!) {
      projectUpdates(filters: { slug: { eq: $slug } }) {
        title
        content
        featuredImage { url alternativeText }
      }
      careerGrowths(filters: { slug: { eq: $slug } }) {
        title
        content
        featuredImage { url alternativeText }
      }
      engineeringNotes(filters: { slug: { eq: $slug } }) {
        title
        content
        featuredImage { url alternativeText }
      }
    }
  `;

  const data = await strapiQuery<{
    projectUpdates: Post[];
    careerGrowths: Post[];
    engineeringNotes: Post[];
  }>(GET_POST_BY_SLUG, { slug });

  const post = [
    ...data.projectUpdates,
    ...data.careerGrowths,
    ...data.engineeringNotes,
  ][0];

  if (!post) {
    return {
      title: "Post Not Found | Ekene Onyekachi",
      description: "The requested blog post was not found.",
    };
  }

  const contentArray = normalizeContent(post.content);
  const stripHtml = (html: string) => html.replace(/<[^>]*>/g, "");
  const contentText = contentArray
    .flatMap((block) => block.children)
    .map((child) => stripHtml(child.text))
    .join(" ");

  return {
    title: `${post.title} | Ekene Onyekachi`,
    description: contentText.slice(0, 160),
    openGraph: {
      title: post.title,
      description: contentText.slice(0, 160),
      type: "article",
      url: `https://yourdomain.com/blog/${slug}`,
      images: post.featuredImage
        ? [
            {
              url: post.featuredImage.url,
              width: 1200,
              height: 630,
              alt: post.featuredImage.alternativeText || post.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      site: "@EkeneDeProgram",
      creator: "@EkeneDeProgram",
    },
  };
}

// GRAPHQL QUERY FOR PAGE
const GET_POST_BY_SLUG = `
query ($slug: String!) {
  projectUpdates(filters: { slug: { eq: $slug } }) {
    documentId
    title
    content
    createdAt
    featuredImage { url alternativeText }
  }
  careerGrowths(filters: { slug: { eq: $slug } }) {
    documentId
    title
    content
    createdAt
    featuredImage { url alternativeText }
  }
  engineeringNotes(filters: { slug: { eq: $slug } }) {
    documentId
    title
    content
    createdAt
    featuredImage { url alternativeText }
  }
}
`;

// HELPERS
function renderRichText(content: RichTextBlock[] | string | undefined) {
  const blocks = normalizeContent(content);
  return blocks
    .map((block) => {
      if (block.type === "paragraph") {
        const text = block.children.map((child) => child.text).join("");
        return `<p>${text}</p>`;
      }
      return "";
    })
    .join("");
}

// PAGE COMPONENT
interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const data = await strapiQuery<{
    projectUpdates: Omit<Post, "category" | "categorySlug">[];
    careerGrowths: Omit<Post, "category" | "categorySlug">[];
    engineeringNotes: Omit<Post, "category" | "categorySlug">[];
  }>(GET_POST_BY_SLUG, { slug });

  const allPosts: Post[] = [
    ...data.projectUpdates.map((p) => ({
      ...p,
      category: "Project Updates",
      categorySlug: "project-updates",
      content: normalizeContent(p.content),
    })),
    ...data.careerGrowths.map((p) => ({
      ...p,
      category: "Career Growth",
      categorySlug: "career-growth",
      content: normalizeContent(p.content),
    })),
    ...data.engineeringNotes.map((p) => ({
      ...p,
      category: "Engineering Notes",
      categorySlug: "engineering-notes",
      content: normalizeContent(p.content),
    })),
  ];

  const post = allPosts[0];
  if (!post) return notFound();

  return (
    <article className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-10 md:py-12 lg:py-14">
      {post.categorySlug && (
        <Link
          href={`/blog/category/${post.categorySlug}`}
          className="inline-flex items-center gap-2 text-sm sm:text-base text-gray-600 hover:text-blue-600 transition-colors mb-6"
        >
          <span className="text-lg leading-none">←</span>
          <span>Back to {post.category}</span>
        </Link>
      )}

      {post.category && (
        <span className="block text-xs sm:text-sm md:text-base text-blue-600 font-semibold uppercase tracking-wide mb-3">
          {post.category}
        </span>
      )}

      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 sm:mb-6 md:mb-8">
        {post.title}
      </h1>

      <p className="text-gray-500 text-xs sm:text-sm md:text-base mb-6">
        {new Date(post.createdAt).toLocaleDateString()}
      </p>

      {post.featuredImage && (
        <div className="relative w-full h-56 sm:h-64 md:h-72 lg:h-[420px] mb-6 sm:mb-8 md:mb-10 rounded-xl overflow-hidden">
          <Image
            src={
              post.featuredImage.url.startsWith("http")
                ? post.featuredImage.url
                : `http://localhost:1337${post.featuredImage.url}`
            }
            alt={post.featuredImage?.alternativeText || post.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 800px"
            unoptimized={post.featuredImage?.url.startsWith("http")}
          />
        </div>
      )}

      <div
        className="prose prose-sm sm:prose-base md:prose-lg lg:prose-xl max-w-full"
        dangerouslySetInnerHTML={{ __html: renderRichText(post.content) }}
      />
    </article>
  );
}
