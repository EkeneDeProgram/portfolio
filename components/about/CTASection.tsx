"use client";

export default function CTASection() {
  return (
    <section className="w-full py-16 px-6 sm:px-12 md:px-20 text-center md:text-left bg-[#C2B280]/10">
      <div className="max-w-5xl mx-auto space-y-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#FFD700] relative inline-block">
          Let’s Connect
        </h2>

        <p className="text-lg text-[#FFFFFF] max-w-2xl">
          I’m always open to discussing new opportunities, collaborations, or just geeking out about backend systems and data engineering.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-[#FFD700] text-[#000000] font-semibold rounded-lg shadow-lg hover:bg-[#3B8B7E] hover:scale-105 transition transform"
          >
            Get in Touch
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            className="inline-block px-6 py-3 border border-[#FFD700] text-[#000000] font-semibold rounded-lg hover:bg-[#3B8B7E] hover:text-[#000000] hover:scale-105 transition transform"
          >
            View Resume
          </a>
        </div>
      </div>
    </section>
  );
}
