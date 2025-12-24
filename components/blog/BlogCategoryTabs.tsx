import Link from "next/link";

// Blog categories used to render the category navigation tabs.
 
const categories = [
  { label: "All", slug: "all" },
  { label: "Career Growth", slug: "career-growth" },
  { label: "Engineering Notes", slug: "engineering-notes" },
  { label: "Project Updates", slug: "project-updates" },
];

// Props for the BlogCategoryTabs component.
interface BlogCategoryTabsProps {
  active: string;
}

// Renders a horizontal list of blog category tabs.
export default function BlogCategoryTabs({ active }: BlogCategoryTabsProps) {
  return (
    // Navigation container for blog category tabs
    <nav className="flex flex-wrap gap-2 sm:gap-3 mb-10">
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          // Route to all blogs or a specific category page
          href={cat.slug === "all" ? "/blog" : `/blog/category/${cat.slug}`}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium border transition
            ${
              // Apply active styles when the current category matches
              active === cat.slug
                ? "bg-blue-600 text-white border-blue-600"
                : "text-gray-600 border-gray-300 hover:bg-gray-100"
            }`}
        >
          {cat.label}
        </Link>
      ))}
    </nav>
  );
}
