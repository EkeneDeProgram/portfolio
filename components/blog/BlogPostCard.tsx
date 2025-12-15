import Link from "next/link";
import Image from "next/image";

// Types
type RichTextChild = { text: string; type: string };
type RichTextBlock = { type: string; children: RichTextChild[] };

export type Post = {
  documentId: string;
  title: string;
  slug: string;
  createdAt: string;
  content: RichTextBlock[];
  featuredImage?: { url: string; alternativeText?: string };
  category?: string;
  excerpt: string; // passed from page
};

interface BlogPostCardProps {
  post: Post;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <li className="group flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 pb-8 border-b last:border-b-0">
      {post.featuredImage && (
        <div className="relative w-full sm:w-[220px] h-52 sm:h-40 rounded-xl overflow-hidden flex-shrink-0">
          <Image
            src={`http://localhost:1337${post.featuredImage.url}`}
            alt={post.featuredImage.alternativeText || post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
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
