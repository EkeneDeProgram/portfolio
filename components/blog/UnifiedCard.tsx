// components/blog/UnifiedCard.tsx

import Image from "next/image";
import { UnifiedItem } from "@/lib/blog/unified";

// Props for UnifiedCard component.
interface UnifiedCardProps {
  item: UnifiedItem;
}

// Renders a single card for blog posts or news items.
// Supports featured image, category/type label, title, excerpt, and a "Read more" link.
// Fully responsive across all screen sizes.
export default function UnifiedCard({ item }: UnifiedCardProps) {
  return (
    // Card container with border, rounded corners, hover shadow, and smooth transition
    <li className="border rounded-xl overflow-hidden hover:shadow-lg transition transform hover:scale-[1.02] duration-300">
      {/* Featured image */}
      {item.image && (
        <div className="relative h-48 sm:h-52 md:h-56 lg:h-60 w-full">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}

      {/* Card content */}
      <div className="p-4 sm:p-5 md:p-6">
        {/* Type or category label */}
        <span className="text-xs sm:text-sm font-semibold uppercase text-blue-600">
          {item.type === "news" ? "News" : item.categoryLabel}
        </span>

        {/* Title */}
        <h2 className="font-bold mt-2 sm:mt-3 text-sm sm:text-base md:text-lg line-clamp-2">
          {item.title}
        </h2>

        {/* Excerpt / summary */}
        <p className="text-sm sm:text-base text-gray-600 mt-2 line-clamp-3">
          {item.excerpt}
        </p>

        {/* "Read more" link */}
        <a
          href={item.href}
          target={item.type === "news" ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="inline-block mt-3 text-sm sm:text-base text-blue-700 hover:underline"
        >
          Read more →
        </a>
      </div>
    </li>
  );
}

