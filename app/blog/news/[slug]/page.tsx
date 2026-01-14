import { getTopNews } from "@/lib/news/fetchNews";
import BlogLayout from "@/components/blog/BlogLayout";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// ISR — regenerate every 30 minutes
export const revalidate = 60 * 30;

// Helpers
const slugify = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

// Generate unique slug using last URL segment
function newsSlug(title: string, url: string) {
  const urlParts = url.split("/");
  const urlId = urlParts[urlParts.length - 1] || urlParts[urlParts.length - 2];
  return `${slugify(title)}-${urlId}`;
}

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props) {
  const { slug } = params;

  // NO session, NO dedupe
  const news = await getTopNews(undefined, { dedupe: false });

  const allArticles = [...news.tech, ...news.finance, ...news.crypto];
  const article = allArticles.find((item) => newsSlug(item.title, item.url) === slug);

  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      images: [{ url: article.image || "/images/news-fallback.jpg" }],
    },
  };
}

export default async function NewsSlugPage({ params }: Props) {
  const { slug } = params;

  // NO session, NO dedupe
  const news = await getTopNews(undefined, { dedupe: false });

  const allArticles = [...news.tech, ...news.finance, ...news.crypto];
  const article = allArticles.find((item) => newsSlug(item.title, item.url) === slug);

  if (!article) return notFound();

  return (
    <BlogLayout>
      <article className="mx-auto max-w-4xl px-4 py-10">
        <Link
          href="/blog?type=news"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 mb-6"
        >
          ← Back to News
        </Link>

        <span className="block text-xs text-blue-600 font-semibold uppercase mb-2">
          {article.category.toUpperCase()}
        </span>

        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>

        <p className="text-gray-500 text-sm mb-6">
          {new Date(article.publishedAt).toLocaleDateString()} · {article.source}
        </p>

        <div className="relative w-full h-[420px] mb-8 rounded-xl overflow-hidden">
          <Image
            src={article.image || "/images/news-fallback.jpg"}
            alt={article.title}
            fill
            unoptimized
            className="object-cover"
          />
        </div>

        <div className="prose max-w-none">
          <p>{article.description}</p>
        </div>

        <div className="mt-8">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-medium hover:underline"
          >
            Read original article ↗
          </a>
        </div>
      </article>
    </BlogLayout>
  );
}

