import React from "react";
import Head from "next/head";
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiFlask,
  SiMongodb,
  SiGit,
  SiDocker,
  SiPostman,
  SiTailwindcss,
  SiHtml5,
  SiCss3,
  SiDjango,
  SiFastapi,
  SiNestjs,
  SiPostgresql,
} from "react-icons/si";

const SkillsPage = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: [
        { name: "Python", icon: SiPython },
        { name: "JavaScript", icon: SiJavascript },
        { name: "TypeScript", icon: SiTypescript },
      ],
    },
    {
      title: "Frontend",
      skills: [
        { name: "React", icon: SiReact },
        { name: "Next.js", icon: SiNextdotjs },
        { name: "HTML5", icon: SiHtml5 },
        { name: "CSS3", icon: SiCss3 },
        { name: "Tailwind CSS", icon: SiTailwindcss },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", icon: SiNodedotjs },
        { name: "Express.js", icon: SiExpress },
        { name: "Flask", icon: SiFlask },
        { name: "Django", icon: SiDjango },
        { name: "FastAPI", icon: SiFastapi },
        { name: "NestJS", icon: SiNestjs },
        { name: "MongoDB", icon: SiMongodb },
        { name: "PostgreSQL", icon: SiPostgresql },
        { name: "REST APIs", icon: null },
      ],
    },
    {
      title: "Tools & DevOps",
      skills: [
        { name: "Git & GitHub", icon: SiGit },
        { name: "Docker", icon: SiDocker },
        { name: "Postman", icon: SiPostman },
        { name: "Agile/Scrum", icon: null },
      ],
    },

    // ➕ NEW CATEGORY HERE
    {
      title: "Other",
      skills: [
        { name: "Automation", icon: null },
        { name: "Bots", icon: null },
        { name: "API Integrations", icon: null },
      ],
    },
  ];

  return (
    <>
      <Head>
        <title>Skills – Ekene Onyekachi</title>
        <meta
          name="description"
          content="Skills of Ekene Onyekachi, Full-Stack Developer"
        />
      </Head>

      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-center">
            Skills & Technologies
          </h1>

          <p className="text-center mb-12 text-gray-600 dark:text-gray-300">
            I build full-stack applications using modern technologies. Here are
            the tools, languages, and frameworks I use to create production-ready
            software.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {skillCategories.map((category, index) => (
              <div key={index}>
                <h2 className="text-2xl font-semibold mb-4">{category.title}</h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {category.skills.map((skill, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-2 bg-white dark:bg-gray-800 rounded shadow hover:scale-105 transition-transform duration-200 cursor-default"
                    >
                      {skill.icon ? (
                        <skill.icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                      ) : (
                        <div className="w-7 h-7 bg-gray-300 dark:bg-gray-700 rounded flex items-center justify-center text-xs font-bold">
                          {skill.name[0]}
                        </div>
                      )}
                      <span className="text-sm font-medium">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default SkillsPage;
