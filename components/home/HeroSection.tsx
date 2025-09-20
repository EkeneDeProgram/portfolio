"use client";

import HighlightKeywords from "./HighlightKeywords";
import Lottie from "lottie-react";
import animationData from "@/public/animations/animation.json"; // ✅ path to your file

// Keyword list with color mapping
const keywords = [
  { text: "Software Engineer", color: "text-[#4B5320]" },
  { text: "frontend interfaces", color: "text-[#C2B280]" },
  { text: "backend architectures", color: "text-[#7D7F7D]" },
  { text: "cloud-native platforms", color: "text-[#8B0000]" },
  { text: "data engineering", color: "text-[#000000]" },
  { text: "machine learning", color: "text-[#4B5320]" },
  { text: "artificial intelligence (AI)", color: "text-[#8B0000]" },
];

const HeroSection: React.FC = () => {
  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 sm:px-16 lg:px-32 py-16 
      bg-gradient-to-r from-[#C2B280] via-[#7D7F7D] to-[#4B5320] text-[#000000] dark:text-[#C2B280] transition-colors duration-300">
      
      {/* Left: Text Content */}
      <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-[#4B5320] dark:text-[#C2B280]">
          Hi, I’m Ekene Onyekachi
        </h2>

        <HighlightKeywords keywords={keywords} />

        <p className="mt-4 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl text-[#000000] dark:text-[#C2B280]">
          I specialize in designing and delivering high-performance solutions — from sleek{" "}
          <span className="font-semibold text-[#4B5320]">frontend interfaces</span>{" "}
          to resilient{" "}
          <span className="font-semibold text-[#7D7F7D]">backend architectures</span>{" "}
          and{" "}
          <span className="font-semibold text-[#8B0000]">cloud-native platforms</span>.
          My{" "}
          <span className="font-semibold text-[#4B5320]">data engineering</span>{" "}
          expertise extends to{" "}
          <span className="font-semibold text-[#4B5320]">machine learning</span>{" "}
          and{" "}
          <span className="font-semibold text-[#8B0000]">artificial intelligence (AI)</span>,
          where I build intelligent systems that unlock insights and power next-generation applications.
        </p>
      </div>

      {/* Right: Animation */}
      <div className="flex-1 mt-12 md:mt-0 flex justify-center md:justify-end">
        <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-lg shadow-2xl bg-white/30 dark:bg-black/20 p-4 backdrop-blur-md">
          <Lottie animationData={animationData} loop={true} autoplay={true} />
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
