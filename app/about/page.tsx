import { Metadata } from "next";
import { Code, Boxes, Cpu, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "About Me | Ekene Onyekachi",
  description:
    "Learn more about Ekene Onyekachi, a Full-Stack Engineer specializing in Python, TypeScript, Next.js, automation, and scalable API development.",
};

export default function About() {
  return (
    <div className="min-h-screen bg-white text-gray-900 px-6 sm:px-12 md:px-20 py-20">
      <main className="max-w-5xl mx-auto space-y-20">

        {/* Headline */}
        <header className="space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            Hi, I’m Ekene — I build systems that solve real problems.
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl">
            I focus on building scalable, reliable, user-friendly software that delivers real value.
          </p>
        </header>

        {/* Summary */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">What I Do</h2>

          <p className="text-lg text-gray-700 leading-relaxed">
            I’m a full-stack engineer specializing in Python, JavaScript/TypeScript, 
            Next.js, and scalable API development. I’ve led backend engineering for startups, 
            built production dashboards, created automation tools, and developed systems 
            that support real users.
          </p>

          <p className="text-lg text-gray-700">My engineering style focuses on:</p>

          <ul className="list-disc pl-6 text-lg text-gray-700 space-y-1">
            <li>clean architecture</li>
            <li>readable, maintainable code</li>
            <li>scalable APIs</li>
            <li>product-driven development</li>
            <li>user-focused UI</li>
          </ul>
        </section>

        {/* Tech Stack */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold">Tech Stack</h2>

          <div className="grid sm:grid-cols-2 gap-8">

            {/* Frontend */}
            <div className="flex items-start gap-4">
              <Code className="w-8 h-8 text-gray-800" />
              <div>
                <h3 className="text-xl font-semibold">Frontend</h3>
                <p className="text-gray-700 text-lg">
                  React, Next.js, TypeScript, TailwindCSS, HTML5, CSS3
                </p>
              </div>
            </div>

            {/* Backend */}
            <div className="flex items-start gap-4">
              <Cpu className="w-8 h-8 text-gray-800" />
              <div>
                <h3 className="text-xl font-semibold">Backend</h3>
                <p className="text-gray-700 text-lg">
                  Python (Flask, Django, FastAPI), Node.js, Express, NestJS, MongoDB, PostgreSQL
                </p>
              </div>
            </div>

            {/* Tools */}
            <div className="flex items-start gap-4">
              <Wrench className="w-8 h-8 text-gray-800" />
              <div>
                <h3 className="text-xl font-semibold">Tools</h3>
                <p className="text-gray-700 text-lg">
                  Git, Docker, Postman, Cloud Hosting
                </p>
              </div>
            </div>

            {/* Other */}
            <div className="flex items-start gap-4">
              <Boxes className="w-8 h-8 text-gray-800" />
              <div>
                <h3 className="text-xl font-semibold">Other</h3>
                <p className="text-gray-700 text-lg">
                  Automation, Bots, API Integrations
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Personal Note */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">A Little Personal</h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">
            I love solving problems, learning fast, improving products, and contributing 
            to meaningful work. I enjoy building tools that improve productivity, automate 
            tasks, and bring clarity to complex systems.
          </p>
        </section>
      </main>
    </div>
  );
}
