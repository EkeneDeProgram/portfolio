// Props for the BlogEmptyState component.
// `message` allows a custom empty-state message to be displayed.
interface BlogEmptyStateProps {
  message?: string;
}

// Displays an empty state message when no blog posts are available.
export default function BlogEmptyState({ message }: BlogEmptyStateProps) {
  return (
    // Container centered both vertically and horizontally
    <div className="flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20 px-4">
      <p className="text-gray-500 text-base sm:text-lg md:text-xl lg:text-2xl text-center max-w-xl">
        {/* Fallback message when no custom message is provided */}
        {message || "No posts found."}
      </p>
    </div>
  );
}
