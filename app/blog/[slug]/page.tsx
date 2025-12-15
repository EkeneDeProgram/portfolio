// app/blog/[slug]/page.tsx
import { strapiQuery } from "@/lib/cms";
import { notFound } from "next/navigation";
import Image from "next/image";

// TypeScript types
type RichTextChild = {
  text: string;
  type: string;
};

type RichTextBlock = {
  type: string;
  children: RichTextChild[];
};

type FeaturedImage = {
  url: string;
  alternativeText?: string;
};

type Post = {
  documentId: string;
  title: string;
  content: RichTextBlock[];
  createdAt: string;
  category?: string;
  featuredImage?: FeaturedImage;
};

type GetPostBySlugResponse = {
  projectUpdates: Post[];
};

// GraphQL query
const GET_POST_BY_SLUG = `
  query ($slug: String!) {
    projectUpdates(filters: { slug: { eq: $slug } }) {
      documentId
      title
      content
      createdAt
      category
      featuredImage {
        url
        alternativeText
      }
    }
  }
`;

// Helper to render Strapi rich text blocks
function renderRichText(blocks: RichTextBlock[]) {
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

// --- Props type ---
interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const data = await strapiQuery<GetPostBySlugResponse>(
    GET_POST_BY_SLUG,
    { slug }
  );

  const post = data.projectUpdates[0];

  if (!post) return notFound();

  return (
    <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Category */}
      {post.category && (
        <span className="inline-block text-xs sm:text-sm text-blue-600 font-semibold uppercase tracking-wide mb-3">
          {post.category}
        </span>
      )}

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
        {post.title}
      </h1>

      {/* Date */}
      <p className="text-gray-500 text-xs sm:text-sm mb-6">
        {new Date(post.createdAt).toLocaleDateString()}
      </p>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="relative w-full h-56 sm:h-72 md:h-96 lg:h-[420px] mb-8 rounded-xl overflow-hidden">
          <Image
            src={`http://localhost:1337${post.featuredImage.url}`}
            alt={post.featuredImage.alternativeText || post.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>
      )}

      {/* Content */}
      <div
        className="prose prose-sm sm:prose-base lg:prose-lg max-w-none"
        dangerouslySetInnerHTML={{
          __html: renderRichText(post.content),
        }}
      />
    </article>
  );
}
