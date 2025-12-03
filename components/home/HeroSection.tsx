"use client";

import React from "react";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

const HeroSection: React.FC = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 lg:px-24 py-20 bg-white text-gray-900">
      
      {/* Headline */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center leading-tight max-w-4xl">
        Ekene Onyekachi — Full-Stack Engineer{" "}
        <span className="block text-lg sm:text-xl lg:text-2xl font-medium text-gray-600 mt-3">
          (Python • Next.js • TypeScript)
        </span>
      </h1>

      {/* Sub Text */}
      <p className="mt-6 text-base sm:text-lg lg:text-xl text-center max-w-3xl leading-relaxed text-gray-700">
        I build scalable APIs, clean user interfaces, and intelligent automation tools.
        I’ve led backend development for startups, built production-ready dashboards,
        and developed real-world systems used by growing companies. I love solving
        problems with code, product thinking, and clean engineering.
      </p>

      {/* Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center">
        <Link
          href="/projects"
          className="px-6 py-3 w-full sm:w-auto text-center bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          View Projects
        </Link>

        <a
          href="/files/ekene-cv.pdf"
          download
          className="px-6 py-3 w-full sm:w-auto text-center bg-gray-900 text-white font-semibold rounded-lg shadow hover:bg-gray-800 transition"
        >
          Download CV
        </a>
      </div>

      {/* Secondary Links */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-gray-700">
        <a
          href="https://github.com/YOUR_GITHUB"
          target="_blank"
          className="flex items-center gap-2 hover:text-blue-600 transition"
        >
          <Github size={20} /> GitHub
        </a>

        <a
          href="https://linkedin.com/in/YOUR_LINKEDIN"
          target="_blank"
          className="flex items-center gap-2 hover:text-blue-600 transition"
        >
          <Linkedin size={20} /> LinkedIn
        </a>

        <a
          href="mailto:YOUR_EMAIL@example.com"
          className="flex items-center gap-2 hover:text-blue-600 transition"
        >
          <Mail size={20} /> Email
        </a>
      </div>

    </section>
  );
};

export default HeroSection;
