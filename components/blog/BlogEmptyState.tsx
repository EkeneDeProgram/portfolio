export default function BlogEmptyState({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20 px-4">
      <p className="text-gray-500 text-base sm:text-lg md:text-xl lg:text-2xl text-center max-w-xl">
        {message || "No posts found."}
      </p>
    </div>
  );
}
