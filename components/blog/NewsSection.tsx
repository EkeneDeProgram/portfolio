"use client";

import { useState } from "react";
import { UnifiedItem } from "@/lib/blog/unified";
import UnifiedCard from "./UnifiedCard";

// Available news category filters.
type NewsCategoryFilter = "tech" | "finance" | "crypto" | "all";

// Props for the NewsSection component.
// `newsItems` is the array of all news items to display.
interface Props {
  newsItems: UnifiedItem[];
}

// Renders a news section with category filters and responsive grid layout.
export default function NewsSection({ newsItems }: Props) {
  // State to track the currently selected filter
  const [filter, setFilter] = useState<NewsCategoryFilter>("all");

  // Filter news items based on the selected category
  const filteredNewsItems =
    filter === "all"
      ? newsItems
      : newsItems.filter((n) => n.categorySlug === filter);

  return (
    <div>
      {/* Category filter buttons */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-4">
        {(["all", "tech", "finance", "crypto"] as NewsCategoryFilter[]).map(
          (cat) => (
            <button
              key={cat}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border transition
                ${
                  filter === cat
                    ? "bg-blue-600 text-white"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              onClick={() => setFilter(cat)}
            >
              {/* Capitalize category label */}
              {cat === "all"
                ? "All"
                : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          )
        )}
      </div>

      {/* Render message if no news items match the filter */}
      {filteredNewsItems.length === 0 ? (
        <p className="text-gray-500 text-sm sm:text-base">
          No news available.
        </p>
      ) : (
        // Responsive grid for news cards
        <ul className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6">
          {filteredNewsItems.map((item) => (
            <UnifiedCard key={`${item.type}-${item.id}`} item={item} />
          ))}
        </ul>
      )}
    </div>
  );
}
