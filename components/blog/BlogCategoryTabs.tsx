import Link from "next/link";

const categories = [
  { label: "All", slug: "all" },
  { label: "Career Growth", slug: "career-growth" },
  { label: "Engineering Notes", slug: "engineering-notes" },
  { label: "Project Updates", slug: "project-updates" },
];

export default function BlogCategoryTabs({
  active,
}: {
  active: string;
}) {
  return (
    <nav className="flex flex-wrap gap-3 mb-10">
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          href={
            cat.slug === "all"
              ? "/blog"
              : `/blog/category/${cat.slug}`
          }
          className={`px-4 py-2 rounded-full text-sm font-medium border transition
            ${
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
