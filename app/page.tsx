export default function Home() {
  return (
    <main className="min-h-screen w-full bg-white text-gray-900 overflow-x-hidden">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-32 text-center md:text-left">
        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
          Ekene Onyekachi —{" "}
          <span className="text-gray-700">
            Full-Stack Engineer (Python • Next.js • TypeScript)
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-lg sm:text-xl text-gray-600 mt-6 max-w-3xl mx-auto md:mx-0 leading-relaxed">
          I build scalable APIs, clean user interfaces, and intelligent
          automation tools. I’ve led backend development for startups, built
          production-ready dashboards, and developed real-world systems used by
          growing companies. I love solving problems with code, product
          thinking, and clean engineering.
        </p>

        {/* Primary CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <a
            href="/projects"
            className="px-8 py-3 bg-black text-white font-semibold rounded-lg shadow hover:bg-gray-900 transition"
          >
            View Projects
          </a>

          <a
            href="/Ekene-full-stack-dev.pdf"
            download
            className="px-8 py-3 border border-black text-black font-semibold rounded-lg hover:bg-black hover:text-white transition"
          >
            Download CV
          </a>
        </div>

        {/* Secondary Links */}
        <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-6 text-gray-700 text-lg">
          <a
            href="https://github.com/EkeneDeProgram"
            className="hover:text-black transition"
            target="_blank"
          >
            GitHub
          </a>

          <a
            href="https://linkedin.com/in/ekenedeprogram"
            className="hover:text-black transition"
            target="_blank"
          >
            LinkedIn
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=ekeneonyekachi1@gmail.com"
            className="hover:text-black transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            Email
          </a>
        </div>
      </section>
    </main>
  );
}

