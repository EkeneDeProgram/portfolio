// import { strapiQuery } from "@/lib/cms";
// import { notFound } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import { Metadata } from "next";


// // Blog page SEO metadata
// export const metadata: Metadata = {
//   title: "Blog post | Ekene Onyekachi",
//   description:
//     "Stay updated with Ekene Onyekachi's latest blog posts, engineering notes, career growth insights, project updates.",
//   openGraph: {
//     title: "Blog | Ekene Onyekachi",
//     description:
//       "Stay updated with Ekene Onyekachi's latest blog posts, engineering notes, career growth insights, project updates.",
//     type: "website",
//     url: "https://yourdomain.com/blog",
//     siteName: "Ekene Onyekachi Portfolio",
//     images: [
//       {
//         url: "https://yourdomain.com/og-blog.png",
//         width: 1200,
//         height: 630,
//         alt: "Blog & News by Ekene Onyekachi",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     site: "@EkeneDeProgram",
//     creator: "@EkeneDeProgram",
//   },
// };


// // Types
// type RichTextChild = { text: string; type: string };
// type RichTextBlock = { type: string; children: RichTextChild[] };
// type FeaturedImage = { url: string; alternativeText?: string };

// type Post = {
//   documentId: string;
//   title: string;
//   content: RichTextBlock[];
//   createdAt: string;
//   category?: string;
//   categorySlug?: string;
//   featuredImage?: FeaturedImage;
// };

// // GraphQL Query
// const GET_POST_BY_SLUG = `
// query ($slug: String!) {
//   projectUpdates(filters: { slug: { eq: $slug } }) {
//     documentId
//     title
//     content
//     createdAt
//     featuredImage { url alternativeText }
//   }
//   careerGrowths(filters: { slug: { eq: $slug } }) {
//     documentId
//     title
//     content
//     createdAt
//     featuredImage { url alternativeText }
//   }
//   engineeringNotes(filters: { slug: { eq: $slug } }) {
//     documentId
//     title
//     content
//     createdAt
//     featuredImage { url alternativeText }
//   }
// }
// `;

// // Helpers
// function normalizeContent(
//   content: RichTextBlock[] | string | undefined
// ): RichTextBlock[] {
//   if (!content) return [];
//   if (Array.isArray(content)) return content;

//   return [
//     {
//       type: "paragraph",
//       children: [{ text: content, type: "text" }],
//     },
//   ];
// }

// function renderRichText(
//   content: RichTextBlock[] | string | undefined
// ) {
//   const blocks = normalizeContent(content);

//   return blocks
//     .map((block) => {
//       if (block.type === "paragraph") {
//         const text = block.children.map((child) => child.text).join("");
//         return `<p>${text}</p>`;
//       }
//       return "";
//     })
//     .join("");
// }

// // Props
// interface Props {
//   params: Promise<{ slug: string }>;
// }

// // Page Component
// export default async function BlogPostPage({ params }: Props) {
//   const { slug } = await params;

//   const data = await strapiQuery<{
//     projectUpdates: Omit<Post, "category" | "categorySlug">[];
//     careerGrowths: Omit<Post, "category" | "categorySlug">[];
//     engineeringNotes: Omit<Post, "category" | "categorySlug">[];
//   }>(GET_POST_BY_SLUG, { slug });

//   // Merge collections and attach category metadata
//   const allPosts: Post[] = [
//     ...data.projectUpdates.map((p) => ({
//       ...p,
//       category: "Project Updates",
//       categorySlug: "project-updates",
//       content: normalizeContent(p.content),
//     })),
//     ...data.careerGrowths.map((p) => ({
//       ...p,
//       category: "Career Growth",
//       categorySlug: "career-growth",
//       content: normalizeContent(p.content),
//     })),
//     ...data.engineeringNotes.map((p) => ({
//       ...p,
//       category: "Engineering Notes",
//       categorySlug: "engineering-notes",
//       content: normalizeContent(p.content),
//     })),
//   ];

//   const post = allPosts[0];
//   if (!post) return notFound();

//   return (
//     <article className="mx-auto w-full max-w-4xl px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-10 md:py-12 lg:py-14">

//       {/* Back to category */}
//       {post.categorySlug && (
//         <Link
//           href={`/blog/category/${post.categorySlug}`}
//           className="inline-flex items-center gap-2 text-sm sm:text-base text-gray-600 hover:text-blue-600 transition-colors mb-6"
//         >
//           <span className="text-lg leading-none">←</span>
//           <span>Back to {post.category}</span>
//         </Link>
//       )}

//       {/* Category */}
//       {post.category && (
//         <span className="block text-xs sm:text-sm md:text-base text-blue-600 font-semibold uppercase tracking-wide mb-3">
//           {post.category}
//         </span>
//       )}

//       {/* Title */}
//       <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 sm:mb-6 md:mb-8">
//         {post.title}
//       </h1>

//       {/* Date */}
//       <p className="text-gray-500 text-xs sm:text-sm md:text-base mb-6">
//         {new Date(post.createdAt).toLocaleDateString()}
//       </p>

//       {/* Featured Image */}
//       {post.featuredImage && (
//         <div className="relative w-full h-48 sm:h-60 md:h-72 lg:h-[420px] mb-6 sm:mb-8 md:mb-10 rounded-xl overflow-hidden">
//           <Image
//             src={`http://localhost:1337${post.featuredImage.url}`}
//             alt={post.featuredImage.alternativeText || post.title}
//             fill
//             priority
//             className="object-cover"
//             sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 800px"
//           />
//         </div>
//       )}

//       {/* Content */}
//       <div
//         className="prose prose-sm sm:prose-base md:prose-lg lg:prose-xl max-w-full"
//         dangerouslySetInnerHTML={{
//           __html: renderRichText(post.content),
//         }}
//       />
//     </article>
//   );
// }









import { strapiQuery } from "@/lib/cms";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";


// Blog page SEO metadata
export const metadata: Metadata = {
  title: "Blog post | Ekene Onyekachi",
  description:
    "Stay updated with Ekene Onyekachi's latest blog posts, engineering notes, career growth insights, project updates.",
  openGraph: {
    title: "Blog | Ekene Onyekachi",
    description:
      "Stay updated with Ekene Onyekachi's latest blog posts, engineering notes, career growth insights, project updates.",
    type: "website",
    url: "https://yourdomain.com/blog",
    siteName: "Ekene Onyekachi Portfolio",
    images: [
      {
        url: "https://yourdomain.com/og-blog.png",
        width: 1200,
        height: 630,
        alt: "Blog & News by Ekene Onyekachi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@EkeneDeProgram",
    creator: "@EkeneDeProgram",
  },
};


// Types
type RichTextChild = { text: string; type: string };
type RichTextBlock = { type: string; children: RichTextChild[] };
type FeaturedImage = { url: string; alternativeText?: string };

type Post = {
  documentId: string;
  title: string;
  content: RichTextBlock[];
  createdAt: string;
  category?: string;
  categorySlug?: string;
  featuredImage?: FeaturedImage;
};

// GraphQL Query
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

// Helpers
function normalizeContent(
  content: RichTextBlock[] | string | undefined
): RichTextBlock[] {
  if (!content) return [];
  if (Array.isArray(content)) return content;

  return [
    {
      type: "paragraph",
      children: [{ text: content, type: "text" }],
    },
  ];
}

function renderRichText(
  content: RichTextBlock[] | string | undefined
) {
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

// Props
interface Props {
  params: Promise<{ slug: string }>;
}

// Page Component
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const data = await strapiQuery<{
    projectUpdates: Omit<Post, "category" | "categorySlug">[];
    careerGrowths: Omit<Post, "category" | "categorySlug">[];
    engineeringNotes: Omit<Post, "category" | "categorySlug">[];
  }>(GET_POST_BY_SLUG, { slug });

  // Merge collections and attach category metadata
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
    <article className="mx-auto w-full max-w-4xl px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-10 md:py-12 lg:py-14">

      {/* Back to category */}
      {post.categorySlug && (
        <Link
          href={`/blog/category/${post.categorySlug}`}
          className="inline-flex items-center gap-2 text-sm sm:text-base text-gray-600 hover:text-blue-600 transition-colors mb-6"
        >
          <span className="text-lg leading-none">←</span>
          <span>Back to {post.category}</span>
        </Link>
      )}

      {/* Category */}
      {post.category && (
        <span className="block text-xs sm:text-sm md:text-base text-blue-600 font-semibold uppercase tracking-wide mb-3">
          {post.category}
        </span>
      )}

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 sm:mb-6 md:mb-8">
        {post.title}
      </h1>

      {/* Date */}
      <p className="text-gray-500 text-xs sm:text-sm md:text-base mb-6">
        {new Date(post.createdAt).toLocaleDateString()}
      </p>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="relative w-full h-48 sm:h-60 md:h-72 lg:h-[420px] mb-6 sm:mb-8 md:mb-10 rounded-xl overflow-hidden">
          <Image
            src={
              post.featuredImage
                ? post.featuredImage.url.startsWith("http")
                  ? post.featuredImage.url
                  : `http://localhost:1337${post.featuredImage.url}`
                : "/images/news-placeholder.jpg"
            }
            alt={post.featuredImage?.alternativeText || post.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 800px"
          />
        </div>
      )}

      {/* Content */}
      <div
        className="prose prose-sm sm:prose-base md:prose-lg lg:prose-xl max-w-full"
        dangerouslySetInnerHTML={{
          __html: renderRichText(post.content),
        }}
      />
    </article>
  );
}

