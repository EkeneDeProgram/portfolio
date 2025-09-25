"use client";

import React from "react";
import HighlightKeywords from "./HighlightKeywords";
import Lottie from "lottie-react";
import animationData from "@/public/animations/animation.json";
import Link from "next/link";

const keywords = [
  { text: "frontend interfaces", color: "text-[#3B8B7E]" },
  { text: "backend architectures", color: "text-[#4B5320]" },
  { text: "cloud-native platforms", color: "text-[#336699]" },
  { text: "data engineering", color: "text-[#4B5320]" },
  { text: "machine learning", color: "text-[#3B8B7E]" }, // muted green
  { text: "artificial intelligence (AI)", color: "text-[#336699]" }, // muted blue
];

const HeroSection: React.FC = () => {
  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 sm:px-16 lg:px-32 py-16 relative overflow-hidden bg-[#2F3E46] text-white">
      
      {/* Left: Text */}
      <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-6 z-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-[#FFD700]">
          Hi, I’m Ekene Onyekachi
        </h2>

        <HighlightKeywords keywords={keywords} />

        <p className="mt-4 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl text-gray-100">
          I specialize in designing and delivering high-performance solutions — from sleek{" "}
          <span className="font-semibold text-[#FFD700]">frontend interfaces</span>{" "}
          to resilient <span className="font-semibold text-[#3B8B7E]">backend architectures</span>{" "}
          and <span className="font-semibold text-[#336699]">cloud-native platforms</span>. My{" "}
          <span className="font-semibold text-[#FFD700]">data engineering</span> expertise extends to{" "}
          <span className="font-semibold text-[#3B8B7E]">machine learning</span> and{" "}
          <span className="font-semibold text-[#336699]">artificial intelligence (AI)</span>, where I build intelligent systems.
        </p>

        {/* CTA Button */}
        <Link href="/contact" className="mt-4 inline-block px-6 py-3 bg-[#FFD700] text-[#2F3E46] font-semibold rounded-lg shadow-lg hover:bg-[#3B8B7E] transition">
          Contact Me
        </Link>
      </div>

      {/* Right: Animation + Green Wave */}
      <div className="flex-1 mt-12 md:mt-0 flex justify-center md:justify-end relative z-10">
        <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-lg shadow-2xl p-4 border border-white/20 overflow-hidden">
          {/* Green wave background */}
          <div className="absolute top-0 left-0 w-full h-full bg-[#4B5320] opacity-40 animate-wave"></div>
          
          {/* Lottie animation */}
          <Lottie animationData={animationData} loop={true} autoplay={true} className="relative w-full h-full" />
        </div>
      </div>

      {/* Wave animation */}
      <style jsx>{`
        @keyframes wave {
          0% { transform: translateX(-50%) rotate(0deg); }
          50% { transform: translateX(50%) rotate(3deg); }
          100% { transform: translateX(-50%) rotate(0deg); }
        }
        .animate-wave {
          background: linear-gradient(
            135deg,
            #4b5320 0%,
            #4b5320 25%,
            #4b5320 50%,
            #4b5320 75%,
            #4b5320 100%
          );
          clip-path: polygon(
            0% 60%, 10% 65%, 20% 55%, 30% 60%, 40% 50%,
            50% 55%, 60% 45%, 70% 50%, 80% 40%, 90% 45%, 100% 35%, 100% 100%, 0% 100%
          );
          animation: wave 12s linear infinite; /* slower, smoother */
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
