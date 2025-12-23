import Image from "next/image";
import { NewsItem } from "@/lib/news/types";

export default function NewsCard({ item }: { item: NewsItem }) {
  return (
    <li className="rounded-xl border overflow-hidden hover:shadow-lg transition-transform transform hover:scale-105 duration-300">
      {/* Image */}
      {item.image && (
        <div className="relative h-36 sm:h-40 md:h-48 lg:h-56 w-full">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-3 sm:p-4 md:p-5">
        <span className="text-[10px] sm:text-xs md:text-sm uppercase text-blue-600 font-semibold">
          {item.category}
        </span>

        <h2 className="font-bold mt-1 sm:mt-2 text-sm sm:text-base md:text-lg line-clamp-2">
          {item.title}
        </h2>

        <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-2 line-clamp-3">
          {item.description}
        </p>

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

