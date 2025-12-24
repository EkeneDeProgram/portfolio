import Image from "next/image";
import { NewsItem } from "@/lib/news/types";

// Props for the NewsCard component.
interface NewsCardProps {
  item: NewsItem;
}

// Renders a single news article preview card.
export default function NewsCard({ item }: NewsCardProps) {
  return (
    // Card wrapper with hover animation and visual separation
    <li className="rounded-xl border overflow-hidden hover:shadow-lg transition-transform transform hover:scale-105 duration-300">
      {item.image && (
        // Responsive image container
        <div className="relative h-36 sm:h-40 md:h-48 lg:h-56 w-full">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            // Optimize image loading for different screen sizes
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}

      {/* Card content */}
      <div className="p-3 sm:p-4 md:p-5">
        {/* News category label */}
        <span className="text-[10px] sm:text-xs md:text-sm uppercase text-blue-600 font-semibold">
          {item.category}
        </span>

        {/* News headline */}
        <h2 className="font-bold mt-1 sm:mt-2 text-sm sm:text-base md:text-lg line-clamp-2">
          {item.title}
        </h2>

        {/* Short description / summary */}
        <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-2 line-clamp-3">
          {item.description}
        </p>

        {/* External link to full article */}
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-blue-700 hover:underline"
        >
          Read more →
        </a>
      </div>
    </li>
  );
}
