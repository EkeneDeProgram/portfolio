// pages/skills.tsx
import React from "react";
import Head from "next/head";

// Import logos (replace with your local / public images or SVGs)
import PythonLogo from "../public/logos/python.svg";
import JSLogo from "../public/logos/javascript.svg";
import TSLogo from "../public/logos/typescript.svg";
import ReactLogo from "../public/logos/react.svg";
import NextLogo from "../public/logos/nextjs.svg";
import NodeLogo from "../public/logos/nodejs.svg";
import ExpressLogo from "../public/logos/express.svg";
import FlaskLogo from "../public/logos/flask.svg";
import MongoLogo from "../public/logos/mongodb.svg";
import GitLogo from "../public/logos/git.svg";
import DockerLogo from "../public/logos/docker.svg";
import PostmanLogo from "../public/logos/postman.svg";

const SkillsPage = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: [
        { name: "Python", logo: PythonLogo },
        { name: "JavaScript", logo: JSLogo },
        { name: "TypeScript", logo: TSLogo },
      ],
    },
    {
      title: "Frontend",
      skills: [
        { name: "React", logo: ReactLogo },
        { name: "Next.js", logo: NextLogo },
        { name: "HTML5 & CSS3", logo: "" },
        { name: "Tailwind CSS", logo: "" },
        { name: "Responsive Design", logo: "" },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", logo: NodeLogo },
        { name: "Express.js", logo: ExpressLogo },
        { name: "Flask", logo: FlaskLogo },
        { name: "RESTful APIs", logo: "" },
        { name: "MongoDB", logo: MongoLogo },
      ],
    },
    {
      title: "Tools & DevOps",
      skills: [
        { name: "Git & GitHub", logo: GitLogo },
        { name: "Docker", logo: DockerLogo },
        { name: "Postman", logo: PostmanLogo },
        { name: "Agile/Scrum", logo: "" },
      ],
    },
    {
      title: "Projects / Other Skills",
      skills: [
        { name: "Crypto Trading Bot (Python)", logo: "" },
        { name: "CV Generator (Node.js + React)", logo: "" },
        { name: "Full-Stack Web Apps", logo: "" },
      ],
    },
  ];

  return (
    <>
      <Head>
        <title>Skills – Ekene Onyekachi</title>
        <meta name="description" content="Skills of Ekene Onyekachi, Full-Stack Developer" />
      </Head>
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-center">Skills & Technologies</h1>
          <p className="text-center mb-12 text-gray-600 dark:text-gray-300">
            I build full-stack applications using modern technologies. Here are the tools, languages, and frameworks I use to create production-ready software.
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
                      {skill.logo ? (
                        <skill.logo className="w-8 h-8" />
                      ) : (
                        <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded flex items-center justify-center text-xs">{skill.name[0]}</div>
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
