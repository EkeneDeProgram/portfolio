// components/blog/GAEventClickTracker.tsx


"use client";

import { event as gaEvent } from "@/lib/gtag";

interface GAEventClickTrackerProps {
  slug: string;
  category: string;
}

export default function GAEventClickTracker({ slug, category }: GAEventClickTrackerProps) {
  const handleClick = () => {
    gaEvent({
      action: "category_post_click",
      category,
      label: slug,
    });
  };

  return (
    <button
      type="button"
      className="absolute inset-0 w-full h-full"
      onClick={handleClick}
    />
  );
}
