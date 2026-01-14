"use client"; // ✅ Client component

import { useEffect } from "react";
import { event as gaEvent } from "@/lib/gtag";

interface NewsViewTrackerProps {
  slug: string;
}

export default function NewsViewTracker({ slug }: NewsViewTrackerProps) {
  useEffect(() => {
    gaEvent({
      action: "news_view",
      category: "News",
      label: slug,
    });
  }, [slug]);

  return null;
}
