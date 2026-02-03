"use client";

import Image from "next/image";
import Link from "next/link";
import { UnifiedItem } from "@/lib/blog/unified";
import { event as gaEvent } from "@/lib/gtag";

interface UnifiedCardProps {
  item: UnifiedItem;
}

export default function UnifiedCard({ item }: UnifiedCardProps) {
  const imageSrc = item.image || "/images/news-placeholder.jpg";
  const isInternal = item.href.startsWith("/blog");

  const handleClick = () => {
    gaEvent({
      action: `${item.type}_click`,
      category: item.type === "blog" ? "Blog" : "News",
      label: item.id,
    });
  };

  return (
    <li
      onClick={handleClick}
      className="border rounded-xl overflow-hidden hover:shadow-lg transition transform hover:scale-[1.02] duration-300 bg-white"
    >
      <div className="relative h-48 sm:h-52 md:h-56 lg:h-60 w-full">
        <Image
          src={imageSrc}
          alt={item.title}
          fill
          unoptimized
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="p-4 sm:p-5 md:p-6">
        <span className="text-xs sm:text-sm font-semibold uppercase text-blue-600">
          {item.type === "news" ? "News" : item.categoryLabel}
        </span>

        <h2 className="font-bold mt-2 sm:mt-3 text-sm sm:text-base md:text-lg line-clamp-2 text-gray-900">
          {item.title}
        </h2>

        <p className="text-sm sm:text-base text-gray-700 mt-2 line-clamp-3">
          {item.excerpt}
        </p>

        {isInternal ? (
          <Link
            href={item.href}
            className="inline-block mt-3 text-sm sm:text-base text-blue-700 hover:underline"
          >
            Read more →
          </Link>
        ) : (
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-sm sm:text-base text-blue-700 hover:underline"
          >
            Read more →
          </a>
        )}
      </div>
    </li>
  );
}
