import { Metadata } from "next";
import IntroSection from "@/components/about/IntroSection";
import JourneySection from "@/components/about/JourneySection";
import SkillsSection from "@/components/about/SkillsSection";
import CTASection from "@/components/about/CTASection";

export const metadata: Metadata = {
  title: "About Me | Ekene Onyekachi",
  description: "Learn more about Ekene Onyekachi, a Software & Data Engineer with 5+ years of experience in building scalable systems, AI-powered apps, and cloud-native platforms.",
};

export default function About() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 sm:px-12 md:px-20 py-16 bg-gradient-to-r from-[#C2B280] via-[#7D7F7D] to-[#4B5320] text-[#000000] dark:text-[#C2B280]">
      <main className="max-w-6xl w-full space-y-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#8B0000] text-center md:text-left">
          About Me
        </h1>

        <IntroSection />
        <JourneySection />
        <SkillsSection />
        <CTASection />
      </main>
    </div>
  );
}

