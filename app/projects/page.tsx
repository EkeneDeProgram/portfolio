import { Metadata } from "next";
import React from "react";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";



export const metadata: Metadata = {
  title: "My Projects | Ekene Onyekachi",
  description:
    "Explore real-world projects built by Ekene Onyekachi, showcasing full-stack development, Python, Next.js, and TypeScript expertise.",
  openGraph: {
    title: "My Projects | Ekene Onyekachi",
    description:
      "Explore real-world projects built by Ekene Onyekachi, showcasing full-stack development, Python, Next.js, and TypeScript expertise.",
    type: "website",
    url: "https://yourdomain.com/projects",
    siteName: "Ekene Onyekachi Portfolio", 
    images: [
      {
        url: "https://yourdomain.com/og-projects.png",
        width: 1200,
        height: 630,
        alt: "Projects by Ekene Onyekachi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image", 
    site: "@EkeneDeProgram",
    creator: "@EkeneDeProgram",
  },
};


const projects = [
  {
    title: "Innobee — Innovation Management Platform",
    role: "Senior Product Developer",
    tech: ["Python", "Flask", "MongoDB", "Git", "Docker"],
    description:
      "Innobee is a peer-to-peer innovation-management platform designed to connect stakeholders across the innovation ecosystem and streamline collaboration. The platform allows organizations, innovators, and partners to co-develop ideas, share resources, and manage innovation initiatives more effectively. I contributed as a product developer, helping architect and implement platform features.",
    contributions: [
      "Designed and implemented REST APIs using Flask",
      "Built core business logic and data models using MongoDB",
      "Led the backend engineering team",
      "Planned API architecture",
      "Worked closely with the founder to iterate and refine features",
    ],
    projectLink: "#",
  },
  {
    title: "Nobzo Website — Company Landing Platform",
    role: "Frontend Engineer",
    tech: ["Next.js", "TypeScript", "TailwindCSS"],
    description:
      "A modern, responsive website for Nobzoent, designed to present the company’s vision, services, and pre-launch product experience.",
    contributions: [
      "Built the full frontend with Next.js",
      "Designed reusable UI components",
      "Implemented SEO-optimized pages",
      "Ensured smooth navigation and load performance",
    ],
    projectLink: "#",
  },
  {
    title: "Nobzo Admin Dashboard",
    role: "Full-Stack Engineer",
    tech: ["React", "TypeScript", "Node.js", "REST APIs"],
    description:
      "An internal admin system used to manage users, reports, analytics, and product operations.",
    contributions: [
      "Built major frontend modules using React",
      "Wrote backend APIs used by the dashboard",
      "Integrated the backend with React components",
      "Implemented authentication, data tables, filters, and forms",
      "Improved UI/UX for better admin flow",
    ],
  },
  // {
  //   title: "Crypto Trading Bot",
  //   role: "Creator",
  //   tech: ["Python", "Trading APIs", "Automation", "Algorithms"],
  //   description:
  //     "A Python-based automated crypto trading bot designed to analyze price movements and execute trades based on defined strategies.",
  //   contributions: [
  //     "Implemented trading strategy logic",
  //     "Integrated exchange APIs",
  //     "Built automated buy/sell triggers",
  //     "Added logging and risk control features",
  //   ],
  //   github: "#",
  //   githubFrontend: "#",
  //   projectLink: "#",
  // },
  {
    title: "CV Generator (Web App)",
    role: "Full-Stack Engineer",
    tech: ["Node.js", "TypeScript", "Express", "React"],
    description:
      "A web tool that helps users generate clean, professional CVs through a simple and interactive UI.",
    contributions: [
      "Built backend API with TypeScript + Express",
      "Created client-side form builder with React",
      "Added PDF export and template formatting",
      "Implemented authentication and data storage",
    ],
    github: "#",
    githubFrontend: "#",
    projectLink: "#",
  },
  {
    title: "Personal Portfolio",
    role: "Creator",
    tech: ["Next.js", "TailwindCSS"],
    description:
      "A professional portfolio built to showcase my engineering experience, projects, and skills.",
    contributions: [
      "Designed minimalist UI layout",
      "Built responsive pages with clean sections",
      "Optimized for SEO and fast loading",
    ],
    github: "#",
    githubFrontend: "#",
    projectLink: "#",
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 px-4 sm:px-8 lg:px-24 py-12">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12">
        Projects
      </h1>

      <div className="space-y-12 sm:space-y-16 max-w-5xl mx-auto">
        {projects.map((project) => (
          <div
            key={project.title}
            className="border border-gray-200 rounded-xl p-4 sm:p-6 lg:p-10 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-2xl sm:text-3xl font-semibold">{project.title}</h2>
            <p className="text-gray-600 mt-1 text-lg">{project.role}</p>

            <div className="flex flex-wrap gap-2 mt-4">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 text-sm bg-gray-100 rounded-md border text-gray-700"
                >
                  {t}
                </span>
              ))}
            </div>

            <p className="mt-6 text-gray-700 leading-relaxed">{project.description}</p>

            <ul className="mt-6 list-disc pl-6 space-y-2 text-gray-700">
              {project.contributions.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>

            {(project.github || project.githubFrontend || project.projectLink) && (
              <div className="mt-6 flex flex-wrap gap-4">
                {project.github && (
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:underline"
                  >
                    <Github size={18} /> GitHub
                  </Link>
                )}

                {project.githubFrontend && (
                  <Link
                    href={project.githubFrontend}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:underline"
                  >
                    <ExternalLink size={18} /> GitHub UI
                  </Link>
                )}

                {project.projectLink && (
                  <Link
                    href={project.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:underline"
                  >
                    <ExternalLink size={18} /> Project Link
                  </Link>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
