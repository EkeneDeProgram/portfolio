"use client";

import Lottie from "lottie-react";
import journeyAnimation from "@/public/animations/developer1.json"// place your JSON file here

export default function JourneySection() {
  return (
    <section className="w-full py-16 px-6 sm:px-12 md:px-20 bg-[#C2B280]/10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left: Text Content */}
        <div className="space-y-6 animate-slideUp">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#FFD700] relative inline-block">
            My Journey
          </h2>

          <p className="text-lg sm:text-xl text-[#FFFFFF] leading-relaxed">
            My journey into software engineering started with a curiosity for how
            systems work behind the scenes. Over the past 5 years, I’ve built impactful
            solutions across data engineering, AI, and full-stack development.
          </p>

          <ul className="list-disc list-inside space-y-2 text-[#FFFFFF]">
            <li className="animate-fadeIn delay-100">
              Designed and deployed{" "}
              <span className="font-semibold text-[#3B8B7E]">data pipelines</span> 
              for analytics and ETL workflows.
            </li>
            <li className="animate-fadeIn delay-200">
              Built{" "}
              <span className="font-semibold text-[#3B8B7E]">AI-powered applications</span> 
              for predictive modeling and automation.
            </li>
            <li className="animate-fadeIn delay-300">
              Developed and scaled{" "}
              <span className="font-semibold text-[#3B8B7E]">high-performance backend systems</span>.
            </li>
            <li className="animate-fadeIn delay-400">
              Deployed{" "}
              <span className="font-semibold text-[#3B8B7E]">cloud-native platforms</span> 
              on AWS and Kubernetes.
            </li>
          </ul>
        </div>

        {/* Right: Lottie Illustration */}
        <div className="flex justify-center items-center relative">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
            <Lottie 
              animationData={journeyAnimation} 
              loop={true} 
              className="w-full h-full drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
