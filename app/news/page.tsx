// import { getTopNews } from "@/lib/news/fetchNews";
// import NewsCard from "@/components/blog/NewsCard";

// export const revalidate = 60 * 60 * 8; // 8 hours ISR

// export default async function NewsPage() {
//   const news = await getTopNews();

//   return (
//     <main className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-10 md:py-12 lg:py-14">
//       {/* Page Title */}
//       <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 md:mb-10">
//         Top Tech, Finance & Crypto News
//       </h1>

//       {/* News Grid */}
//       <ul className="grid gap-4 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
//         {news.map((item) => (
//           <NewsCard key={item.id} item={item} />
//         ))}
//       </ul>
//     </main>
//   );
// }
