import React, { ReactNode } from "react";

// Props for the BlogLayout component.
// `children` represents the page content rendered within the layout.
interface BlogLayoutProps {
  children: ReactNode;
}

// Provides a consistent layout wrapper for all blog pages.
// Handles background styling, responsive width, and page spacing.
export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    // Root container ensuring full-height layout and consistent background
    <div className="min-h-screen bg-gray-50">
      {/* Main content container with responsive max-width and padding */}
      <main className="w-full max-w-full sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-16">
        {children}
      </main>
    </div>
  );
}
