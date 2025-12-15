import Link from "next/link";
import Image from "next/image";
import { strapiQuery } from "@/lib/cms";

// TypeScript types for Strapi posts
type RichTextChild = { text: string; type: string };
type RichTextBlock = { type: string; children: RichTextChild[] };

type Post = {
  documentId: string;
  title: string;
  slug: string;
  createdAt: string;
  content: RichTextBlock[];
  featuredImage?: { url: string; alternativeText?: string };
  category?: string;
};

type GetAllPostsResponse = { projectUpdates: Post[] };

// GraphQL query
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
      category
    }
  }
`;

// Strip HTML from Strapi text
function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "");
}

// Generate clean excerpt
function getExcerpt(content: Post["content"], length = 140) {
  if (!content?.length) return "";

  const text = content
    .flatMap((block) => block.children)
    .map((child) => stripHtml(child.text))
    .join(" ");

  if (text.length <= length) return text;

  return text.slice(0, text.lastIndexOf(" ", length)) + "…";
}

export default async function BlogPage() {
  const data = await strapiQuery<GetAllPostsResponse>(GET_ALL_POSTS);
  const posts = data.projectUpdates;

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-10">
        Blog
      </h1>

      <ul className="space-y-10">
        {posts.map((post) => (
          <li
            key={post.documentId}
            className="group grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-6 pb-8 border-b last:border-b-0"
          >
            {/* Image */}
            {post.featuredImage && (
              <div className="relative w-full h-52 sm:h-40 md:h-44 lg:h-48 rounded-xl overflow-hidden bg-gray-100">
                <Image
                  src={`http://localhost:1337${post.featuredImage.url}`}
                  alt={post.featuredImage.alternativeText || post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 220px"
                />
              </div>
            )}

            {/* Content */}
            <div className="flex flex-col justify-between">
              <div>
                {post.category && (
                  <span className="text-xs sm:text-sm text-blue-600 font-semibold uppercase tracking-wide">
                    {post.category}
                  </span>
                )}

                <Link
                  href={`/blog/${post.slug}`}
                  className="block mt-1 text-xl sm:text-2xl font-bold leading-snug hover:text-blue-700 transition-colors"
                >
                  {post.title}
                </Link>

                <p className="mt-3 text-sm sm:text-base text-gray-600 line-clamp-3">
                  {getExcerpt(post.content)}
                </p>
              </div>

              <time className="mt-4 text-xs sm:text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
              </time>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
