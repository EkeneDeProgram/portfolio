"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/yourusername", icon: "/github.svg", glow: "group-hover:drop-shadow-[0_0_8px_#333]" },
    { name: "LinkedIn", href: "https://linkedin.com/in/yourusername", icon: "/linkedin.svg", glow: "group-hover:drop-shadow-[0_0_8px_#0A66C2]" },
    { name: "Twitter", href: "https://twitter.com/yourhandle", icon: "/x.svg", glow: "group-hover:drop-shadow-[0_0_8px_#1DA1F2]" },
    { name: "TikTok", href: "https://www.tiktok.com/@yourhandle", icon: "/tiktok.svg", glow: "group-hover:drop-shadow-[0_0_8px_#000000]" },
    { name: "Facebook", href: "https://www.facebook.com/yourhandle", icon: "/facebook.svg", glow: "group-hover:drop-shadow-[0_0_8px_#1877F2]" },
    { name: "Instagram", href: "https://www.instagram.com/yourhandle", icon: "/instagram.svg", glow: "group-hover:drop-shadow-[0_0_8px_#E4405F]" },
    { name: "YouTube", href: "https://www.youtube.com/@yourhandle", icon: "/youtube.svg", glow: "group-hover:drop-shadow-[0_0_8px_#FF0000]" },
    { name: "Snapchat", href: "https://www.snapchat.com/add/yourhandle", icon: "/snapchat.svg", glow: "group-hover:drop-shadow-[0_0_8px_#FFFC00]" },
  ];

  return (
    <footer className="bg-gradient-to-r from-[#C2B280] via-[#7D7F7D] to-[#4B5320] text-[#000000] dark:text-[#C2B280] border-t border-gray-300 dark:border-gray-600 mt-16 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col items-center gap-6">
        
        {/* Copyright */}
        {year && (
          <p className="text-sm text-gray-700 dark:text-gray-400 text-center">
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
              className="group"
            >
              <Image
                src={social.icon}
                alt={social.name}
                width={28}
                height={28}
                className={`transition-transform duration-300 group-hover:scale-110 ${social.glow}`}
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
