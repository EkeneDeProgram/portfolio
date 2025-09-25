"use client";

import Lottie from "lottie-react";
import developerAnimation from "@/public/animations/developer.json"; 

export default function IntroSection() {
  return (
    <section className="w-full py-16 px-6 sm:px-12 md:px-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 animate-fadeIn delay-200">
        
        {/* LEFT: Intro Text */}
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#FFD700] relative inline-block">
            Who I Am
          </h2>

          <p className="text-lg sm:text-xl text-[#FFFFFF] leading-relaxed">
            Hi, I’m <span className="font-bold">Ekene Onyekachi</span>, a{" "}
            <span className="font-semibold">Software Engineer</span> with{" "}
            <span className="font-semibold">over 5 years of experience</span>{" "}
            building scalable, efficient, and creative solutions.
          </p>

          <p className="text-lg sm:text-xl text-[#FFFFFF]">
            I specialize in{" "}
            <span className="font-semibold">frontend interfaces</span>,{" "}
            <span className="font-semibold">backend architectures</span>, and{" "}
            <span className="font-semibold">cloud-native platforms</span>.
          </p>

          <p className="text-lg text-[#FFFFFF] font-medium">
            Fullstack Developer | ML/AI Enthusiast | Cloud-Native Builder
          </p>
        </div>

        {/* RIGHT: Animation */}
        <div className="flex-1 w-full max-w-md">
          <Lottie 
            animationData={developerAnimation} 
            loop={true} 
            className="w-full h-full" 
          />
        </div>
      </div>
    </section>
  );
}
