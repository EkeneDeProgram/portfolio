"use client";

import SkillBadge from "../SkillBadge";
import { SiPython, SiJavascript, SiTypescript, SiNodedotjs, SiReact, SiNextdotjs, SiDjango, SiFlask, SiFastapi, SiNestjs, SiTensorflow, SiOpenai, SiMongodb, SiPostgresql, SiMysql, SiDocker, SiKubernetes, SiAmazon } from "react-icons/si";

export default function SkillsSection() {
  return (
    <section className="w-full py-16 px-6 sm:px-12 md:px-20  bg-white/30 dark:bg-black/20 backdrop-blur-md rounded-3xl p-8 shadow-2xl z-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#8B0000] relative inline-block">
          Core Skills
          <span className="absolute -bottom-2 left-0 w-16 h-1 bg-[#4B5320] rounded-full"></span>
        </h2>

        {/* Skill Categories */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Languages */}
          <div className="p-6 rounded-lg bg-white shadow-md hover:shadow-xl transition transform hover:scale-105">
            <h3 className="text-xl font-semibold mb-3 text-[#000000]">Languages</h3>
            <div className="flex flex-wrap gap-3">
              <SkillBadge name="Python" icon={<SiPython />} />
              <SkillBadge name="JavaScript" icon={<SiJavascript />} />
              <SkillBadge name="TypeScript" icon={<SiTypescript />} />
            </div>
          </div>

          {/* Frameworks */}
          <div className="p-6 rounded-lg bg-white shadow-md hover:shadow-xl transition transform hover:scale-105">
            <h3 className="text-xl font-semibold mb-3 text-[#000000]">Frameworks</h3>
            <div className="flex flex-wrap gap-3">
              <SkillBadge name="Node.js" icon={<SiNodedotjs />} />
              <SkillBadge name="React" icon={<SiReact />} />
              <SkillBadge name="Next.js" icon={<SiNextdotjs />} />
              <SkillBadge name="Django" icon={<SiDjango />} />
              <SkillBadge name="Flask" icon={<SiFlask />} />
              <SkillBadge name="FastAPI" icon={<SiFastapi />} />
              <SkillBadge name="NestJS" icon={<SiNestjs />} />
              <SkillBadge name="TensorFlow" icon={<SiTensorflow />} />
              <SkillBadge name="OpenAI" icon={<SiOpenai />} />
            </div>
          </div>

          {/* Databases */}
          <div className="p-6 rounded-lg bg-white shadow-md hover:shadow-xl transition transform hover:scale-105">
            <h3 className="text-xl font-semibold mb-3 text-[#000000]">Databases</h3>
            <div className="flex flex-wrap gap-3">
              <SkillBadge name="MongoDB" icon={<SiMongodb />} />
              <SkillBadge name="PostgreSQL" icon={<SiPostgresql />} />
              <SkillBadge name="MySQL" icon={<SiMysql />} />
            </div>
          </div>

          {/* DevOps & Cloud */}
          <div className="p-6 rounded-lg bg-white shadow-md hover:shadow-xl transition transform hover:scale-105">
            <h3 className="text-xl font-semibold mb-3 text-[#000000]">DevOps & Cloud</h3>
            <div className="flex flex-wrap gap-3">
              <SkillBadge name="Docker" icon={<SiDocker />} />
              <SkillBadge name="Kubernetes" icon={<SiKubernetes />} />
              <SkillBadge name="Cloud Platforms" icon={<SiAmazon />} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
