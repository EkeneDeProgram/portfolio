import Link from "next/link";
import Image from "next/image";

//  Rich text node types used for post content.
// These mirror the structure returned by the CMS.
type RichTextChild = { text: string; type: string };
type RichTextBlock = { type: string; children: RichTextChild[] };

// Blog post data model.
// Represents the normalized shape of a post used throughout the blog UI.
export type Post = {
  documentId: string;
  title: string;
  slug: string;
  createdAt: string;
  content: RichTextBlock[];
  featuredImage?: { url: string; alternativeText?: string };
  category?: string;
  excerpt: string;
};

// Props for the BlogPostCard component.
interface BlogPostCardProps {
  post: Post;
}

// Renders a single blog post preview card.
export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    // List item wrapper with responsive layout and visual separation
    <li className="group flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 pb-8 border-b last:border-b-0">
      {post.featuredImage && (
        // Featured image container with hover scale effect
        <div className="relative w-full sm:w-[220px] h-52 sm:h-40 rounded-xl overflow-hidden flex-shrink-0">
          <Image
            // Full image URL resolved from CMS
            src={`http://localhost:1337${post.featuredImage.url}`}
            alt={post.featuredImage.alternativeText || post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="flex-1">
        {post.category && (
          // Optional category label
          <span className="text-xs sm:text-sm text-blue-600 font-semibold uppercase">
            {post.category}
          </span>
        )}

        {/* Post title linking to the full article */}
        <Link
          href={`/blog/${post.slug}`}
          className="block mt-1 text-lg sm:text-xl lg:text-2xl font-bold hover:text-blue-600"
        >
          {post.title}
        </Link>

        {/* Short post excerpt limited to three lines */}
        <p className="mt-2 text-gray-600 text-sm sm:text-base line-clamp-3">
          {post.excerpt}
        </p>

        {/* Publication date */}
        <time className="block mt-4 text-xs sm:text-sm text-gray-500">
          {new Date(post.createdAt).toLocaleDateString()}
        </time>
      </div>
    </li>
  );
}
