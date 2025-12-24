// components/blog/BlogContentTypeTabs.tsx
import Link from "next/link";

// Tab options for filtering blog content types.
const tabs = [
  { label: "All", value: "all" },
  { label: "Blog Post", value: "blog" },
  { label: "News", value: "news" },
];

//  Props for BlogContentTypeTabs.
interface BlogContentTypeTabsProps {
  active: string;
}

// Renders a horizontal set of tabs to filter blog content by type.
// Highlights the active tab and navigates to the corresponding route.
// Fully responsive across all screen sizes.
export default function BlogContentTypeTabs({
  active,
}: BlogContentTypeTabsProps) {
  return (
    // Container: flex with horizontal spacing and wrap for small screens
    <div className="flex flex-wrap gap-2 sm:gap-3 mb-8">
      {tabs.map((tab) => (
        <Link
          key={tab.value}
          // Route: all goes to /blog, others pass type as query param
          href={tab.value === "all" ? "/blog" : `/blog?type=${tab.value}`}
          // Styling: responsive padding, rounded, font, and active state
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm md:text-base font-medium transition
            ${
              active === tab.value
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
