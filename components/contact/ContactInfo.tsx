"use client";

import { Mail, Phone, Github, Linkedin, FileText } from "lucide-react";
import React from "react";

const ContactInfo: React.FC = () => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="mx-auto max-w-md sm:max-w-lg lg:max-w-xl">
        <div className="space-y-6 sm:space-y-8 text-sm sm:text-base lg:text-lg">

          {/* Email */}
          <div className="flex items-start gap-3 sm:gap-4">
            <Mail className="mt-1 h-5 w-5 sm:h-6 sm:w-6 text-blue-600 flex-shrink-0" />
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=ekeneonyekachi1@gmail.com"
              className="break-all hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              ekeneonyekachi1@gmail.com
            </a>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-3 sm:gap-4">
            <Phone className="mt-1 h-5 w-5 sm:h-6 sm:w-6 text-blue-600 flex-shrink-0" />
            <a href="tel:+2349049153730" className="hover:underline">
              (+234) 9049153730
            </a>
          </div>

          {/* GitHub */}
          <div className="flex items-start gap-3 sm:gap-4">
            <Github className="mt-1 h-5 w-5 sm:h-6 sm:w-6 text-blue-600 flex-shrink-0" />
            <a
              href="https://github.com/EkeneDeProgram"
              target="_blank"
              rel="noopener noreferrer"
              className="break-all hover:underline"
            >
              github.com/EkeneDeProgram
            </a>
          </div>

          {/* LinkedIn */}
          <div className="flex items-start gap-3 sm:gap-4">
            <Linkedin className="mt-1 h-5 w-5 sm:h-6 sm:w-6 text-blue-600 flex-shrink-0" />
            <a
              href="https://linkedin.com/in/ekenedeprogram"
              target="_blank"
              rel="noopener noreferrer"
              className="break-all hover:underline"
            >
              linkedin.com/in/ekenedeprogram
            </a>
          </div>

          {/* Resume */}
          <div className="flex items-start gap-3 sm:gap-4">
            <FileText className="mt-1 h-5 w-5 sm:h-6 sm:w-6 text-blue-600 flex-shrink-0" />
            <a
              href="/Ekene-full-stack-dev.pdf"
              download
              className="hover:underline font-medium"
            >
              Download Resume (PDF)
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
