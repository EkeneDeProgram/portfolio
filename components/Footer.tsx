"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/yourusername", icon: "/github.svg", color: "#3B8B7E" },
    { name: "LinkedIn", href: "https://linkedin.com/in/yourusername", icon: "/linkedin.svg", color: "#336699" },
    { name: "Twitter", href: "https://twitter.com/yourhandle", icon: "/x.svg", color: "#1DA1F2" },
    { name: "TikTok", href: "https://www.tiktok.com/@yourhandle", icon: "/tiktok.svg", color: "#3B8B7E" },
    { name: "Facebook", href: "https://www.facebook.com/yourhandle", icon: "/facebook.svg", color: "#336699" },
    { name: "Instagram", href: "https://www.instagram.com/yourhandle", icon: "/instagram.svg", color: "#FFD700" },
    { name: "YouTube", href: "https://www.youtube.com/@yourhandle", icon: "/youtube.svg", color: "#FF0000" },
    { name: "Snapchat", href: "https://www.snapchat.com/add/yourhandle", icon: "/snapchat.svg", color: "#FFD700" },
  ];

  return (
    <footer className="shadow-md bg-[#2F3E46]/95 backdrop-blur-md text-white border-t mt-16 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col items-center gap-6">

        {/* Copyright */}
        {year && (
          <p className="text-sm text-gray-300 text-center">
            &copy; {year} Ekene. All rights reserved.
          </p>
        )}

        {/* Social icons */}
        <div className="flex flex-wrap justify-center gap-6 mt-2">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className={`group relative w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110`}
            >
              {/* Circular border effect */}
              <span
                className="absolute inset-0 rounded-full border-2 opacity-0 transition-all duration-300 group-hover:opacity-100"
                style={{ borderColor: social.color }}
              ></span>

              <Image
                src={social.icon}
                alt={social.name}
                width={28}
                height={28}
                className="relative z-10 transition-transform duration-300 group-hover:scale-125"
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
