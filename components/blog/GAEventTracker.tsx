"use client"; // must be at the top

import { useEffect } from "react";
import { event as gaEvent } from "@/lib/gtag";

interface GAEventTrackerProps {
  slug: string;
  category: string;
}

export default function GAEventTracker({ slug, category }: GAEventTrackerProps) {
  useEffect(() => {
    gaEvent({
      action: "view_blog_post",
      category,
      label: slug,
    });
  }, [slug, category]);

  return null; // doesn't render anything visible
}
