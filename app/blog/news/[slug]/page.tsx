// import { getTopNews } from "@/lib/news/fetchNews";
// import BlogLayout from "@/components/blog/BlogLayout";
// import Image from "next/image";
// import Link from "next/link";
// import { notFound } from "next/navigation";

// // ISR — regenerate every 30 minutes
// export const revalidate = 1800; // 30 minutes in seconds

// // export const revalidate = 60 * 30;

// // Helpers
// const slugify = (text: string) =>
//   text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

// // Generate unique slug using last URL segment
// function newsSlug(title: string, url: string) {
//   const urlParts = url.split("/");
//   const urlId = urlParts[urlParts.length - 1] || urlParts[urlParts.length - 2];
//   return `${slugify(title)}-${urlId}`;
// }

// interface Props {
//   params: Promise<{ slug: string }>; // <- params can be a Promise
// }

// // DYNAMIC METADATA
// export async function generateMetadata({ params }: Props) {
//   const resolvedParams = await params; // await first
//   const { slug } = resolvedParams;

//   // NO session, NO dedupe
//   const news = await getTopNews(undefined, { dedupe: false });

//   const allArticles = [...news.tech, ...news.finance, ...news.crypto];
//   const article = allArticles.find((item) => newsSlug(item.title, item.url) === slug);

//   if (!article) return {};

//   return {
//     title: article.title,
//     description: article.description,
//     openGraph: {
//       title: article.title,
//       description: article.description,
//       images: [{ url: article.image || "/images/news-fallback.jpg" }],
//     },
//   };
// }

// // PAGE COMPONENT
// export default async function NewsSlugPage({ params }: Props) {
//   const resolvedParams = await params; // await first
//   const { slug } = resolvedParams;

//   const news = await getTopNews(undefined, { dedupe: false });

//   const allArticles = [...news.tech, ...news.finance, ...news.crypto];
//   const article = allArticles.find((item) => newsSlug(item.title, item.url) === slug);

//   if (!article) return notFound();

//   return (
//     <BlogLayout>
//       <article className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
//         <Link
//           href="/blog?type=news"
//           className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600"
//         >
//           ← Back to News
//         </Link>

//         <span className="mb-2 block text-xs font-semibold uppercase text-blue-600">
//           {article.category?.toUpperCase()}
//         </span>

//         <h1 className="mb-4 text-2xl sm:text-3xl lg:text-4xl font-bold">
//           {article.title}
//         </h1>

//         <p className="mb-6 text-sm text-gray-500">
//           {new Date(article.publishedAt).toLocaleDateString()} · {article.source}
//         </p>

//         <div className="relative mb-8 h-[220px] sm:h-[320px] lg:h-[420px] w-full overflow-hidden rounded-xl">
//           <Image
//             src={article.image || "/images/news-fallback.jpg"}
//             alt={article.title}
//             fill
//             unoptimized
//             className="object-cover"
//           />
//         </div>

//         <div className="prose prose-sm sm:prose-base md:prose-lg lg:prose-xl max-w-full">
//           <p>{article.description}</p>
//         </div>

//         <div className="mt-8">
//           <a
//             href={article.url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="font-medium text-blue-600 hover:underline"
//           >
//             Read original article ↗
//           </a>
//         </div>
//       </article>
//     </BlogLayout>
//   );
// }












import { getTopNews } from "@/lib/news/fetchNews";
import BlogLayout from "@/components/blog/BlogLayout";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// ISR — regenerate every 30 minutes
export const revalidate = 1800; // 30 minutes in seconds

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
  params: Promise<{ slug: string }>; // <- params can be a Promise
}

// DYNAMIC METADATA
export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params; // await first
  const { slug } = resolvedParams;

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

// PAGE COMPONENT
export default async function NewsSlugPage({ params }: Props) {
  const resolvedParams = await params; // await first
  const { slug } = resolvedParams;

  const news = await getTopNews(undefined, { dedupe: false });
  const allArticles = [...news.tech, ...news.finance, ...news.crypto];
  const article = allArticles.find((item) => newsSlug(item.title, item.url) === slug);

  if (!article) return notFound();

  return (
    <BlogLayout>
      <article className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Back link */}
        <Link
          href="/blog?type=news"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
        >
          ← Back to News
        </Link>

        {/* Category label */}
        <span className="mb-2 block text-xs font-semibold uppercase text-blue-600">
          {article.category?.toUpperCase()}
        </span>

        {/* Article title */}
        <h1 className="mb-4 text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
          {article.title}
        </h1>

        {/* Date / Source */}
        <p className="mb-6 text-sm text-gray-700">
          {new Date(article.publishedAt).toLocaleDateString()} · {article.source}
        </p>

        {/* Featured image */}
        <div className="relative mb-8 h-[220px] sm:h-[320px] lg:h-[420px] w-full overflow-hidden rounded-xl">
          <Image
            src={article.image || "/images/news-fallback.jpg"}
            alt={article.title}
            fill
            unoptimized
            className="object-cover"
          />
        </div>

        {/* Article description */}
        <div className="prose prose-sm sm:prose-base md:prose-lg lg:prose-xl max-w-full text-gray-800">
          <p>{article.description}</p>
        </div>

        {/* Original link */}
        <div className="mt-8">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-600 hover:underline"
          >
            Read original article ↗
          </a>
        </div>
      </article>
    </BlogLayout>
  );
}
