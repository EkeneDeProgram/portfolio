import Link from "next/link"; 
import Image from "next/image";

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:1337";

// Rich text node types (from CMS)
type RichTextChild = { text: string; type: string };
type RichTextBlock = { type: string; children: RichTextChild[] };

// Blog post data model
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

// Props
interface BlogPostCardProps {
  post: Post;
}

// Blog post card component
export default function BlogPostCard({ post }: BlogPostCardProps) {
  // Compute safe image URL
  const imageSrc =
    post.featuredImage?.url?.startsWith("http")
      ? post.featuredImage.url
      : post.featuredImage?.url
      ? `${CMS_URL}${post.featuredImage.url}`
      // ? `http://localhost:1337${post.featuredImage.url}`
      : "/images/news-placeholder.jpg"; // fallback placeholder

  return (
    <li className="group flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 pb-8 border-b last:border-b-0">
      {imageSrc && (
        <div className="relative w-full sm:w-[220px] h-52 sm:h-40 rounded-xl overflow-hidden flex-shrink-0">
          <Image
            src={imageSrc}
            alt={post.featuredImage?.alternativeText || post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 220px, 220px"
            unoptimized={post.featuredImage?.url?.startsWith("http")} // <-- external images skipped for optimization
          />
        </div>
      )}

      <div className="flex-1">
        {post.category && (
          <span className="text-xs sm:text-sm text-blue-600 font-semibold uppercase">
            {post.category}
        </span>
        )}

        <Link
          href={`/blog/${post.slug}`}
          className="block mt-1 text-lg sm:text-xl lg:text-2xl font-bold hover:text-blue-600"
        >
          {post.title}
        </Link>

        <p className="mt-2 text-gray-600 text-sm sm:text-base line-clamp-3">
          {post.excerpt}
        </p>

        <time className="block mt-4 text-xs sm:text-sm text-gray-500">
          {new Date(post.createdAt).toLocaleDateString()}
        </time>
      </div>
    </li>
  );
}
