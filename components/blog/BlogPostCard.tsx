// import Link from "next/link";
// import Image from "next/image";

// export default function BlogPostCard({ post }: any) {
//   return (
//     <li className="group grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-6 pb-8 border-b last:border-b-0">
//       {post.featuredImage && (
//         <div className="relative h-52 sm:h-40 rounded-xl overflow-hidden">
//           <Image
//             src={`http://localhost:1337${post.featuredImage.url}`}
//             alt={post.featuredImage.alternativeText || post.title}
//             fill
//             className="object-cover group-hover:scale-105 transition"
//           />
//         </div>
//       )}

//       <div>
//         <span className="text-xs text-blue-600 font-semibold uppercase">
//           {post.category}
//         </span>

//         <Link
//           href={`/blog/${post.slug}`}
//           className="block mt-1 text-xl font-bold hover:text-blue-600"
//         >
//           {post.title}
//         </Link>

//         <p className="mt-2 text-gray-600 line-clamp-3">
//           {post.excerpt}
//         </p>

//         <time className="block mt-4 text-sm text-gray-500">
//           {new Date(post.createdAt).toLocaleDateString()}
//         </time>
//       </div>
//     </li>
//   );
// }
