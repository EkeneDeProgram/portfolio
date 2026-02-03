import { strapiQuery } from "@/lib/cms";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import "highlight.js/styles/github.css";

// Types
type FeaturedImage = { url: string; alternativeText?: string };

type Post = {
  documentId: string;
  title: string;
  content: string;
  createdAt: string;
  category?: string;
  categorySlug?: string;
  featuredImage?: FeaturedImage;
};

// DYNAMIC METADATA
interface Params {
  params: Promise<{ slug: string }>;
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

  const contentText = post.content.replace(/[#_*`>]/g, "").slice(0, 160);

  return {
    title: `${post.title} | Ekene Onyekachi`,
    description: contentText,
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

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const data = await strapiQuery<{
    projectUpdates: Post[];
    careerGrowths: Post[];
    engineeringNotes: Post[];
  }>(GET_POST_BY_SLUG, { slug });

  const allPosts: Post[] = [
    ...data.projectUpdates.map((p) => ({
      ...p,
      category: "Project Updates",
      categorySlug: "project-updates",
    })),
    ...data.careerGrowths.map((p) => ({
      ...p,
      category: "Career Growth",
      categorySlug: "career-growth",
    })),
    ...data.engineeringNotes.map((p) => ({
      ...p,
      category: "Engineering Notes",
      categorySlug: "engineering-notes",
    })),
  ];

  const post = allPosts[0];
  if (!post) return notFound();

  return (
    <article className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 py-12">
      {post.categorySlug && (
        <Link
          href={`/blog/category/${post.categorySlug}`}
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 mb-6"
        >
          ← Back to {post.category}
        </Link>
      )}

      <span className="block text-sm text-blue-600 font-semibold uppercase mb-3">
        {post.category}
      </span>

      <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
        {post.title}
      </h1>

      <p className="text-gray-500 mb-8">
        {new Date(post.createdAt).toLocaleDateString()}
      </p>

      {post.featuredImage && (
        <div className="relative w-full h-[420px] mb-10 rounded-xl overflow-hidden">
          <Image
            src={post.featuredImage.url}
            alt={post.featuredImage.alternativeText || post.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>
      )}

      {/* CONTENT STYLING UPGRADE */}
      <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-8 prose-code:before:hidden prose-code:after:hidden">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeHighlight]}
          components={{
            pre: ({ children }) => (
              <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
                {children}
              </pre>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600">
                {children}
              </blockquote>
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
