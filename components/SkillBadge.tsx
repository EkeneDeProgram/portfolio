"use client";

import type { ReactNode } from "react";

interface SkillBadgeProps {
  name: string;
  icon: ReactNode;
}

export default function SkillBadge({ name, icon }: SkillBadgeProps) {
  return (
    <div className="group relative flex items-center gap-2 px-4 py-2 bg-[#3B8B7E] text-[#000000] 
      rounded-full text-sm sm:text-base font-medium cursor-pointer 
      transform transition-all duration-300 shadow-sm hover:scale-105 hover:shadow-lg 
      hover:border-[#FFD700] hover:text-[#FFD700] hover:bg-[#7D7F7D]">

      {/* Icon with rotation effect */}
      <span className="text-xl transition-transform duration-500 group-hover:rotate-12">
        {icon}
      </span>

      {/* Skill Name */}
      <span>{name}</span>

      {/* Tooltip */}
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs 
        rounded bg-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity 
        whitespace-nowrap z-10">
        {name}
      </span>
    </div>
  );
}
