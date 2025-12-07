"use client";

import { Mail, Phone, Github, Linkedin, FileText } from "lucide-react";
import React from "react";

const ContactInfo: React.FC = () => {
  return (
    <div className="space-y-8">

      {/* Contact Details */}
      <div className="space-y-4 text-lg">

        {/* Email */}
        <p className="flex items-center gap-3">
          <Mail className="text-blue-600" />
          {/* <a
            href="mailto:ekeneonyekachi1@gmail.com"
            className="hover:underline"
          > */}
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=ekeneonyekachi1@gmail.com"
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            ekeneonyekachi1@gmail.com
          </a>
        </p>

        {/* Phone */}
        <p className="flex items-center gap-3">
          <Phone className="text-blue-600" /> (+234) 9049-153-730
        </p>


        {/* GitHub */}
        <p className="flex items-center gap-3">
          <Github className="text-blue-600" />
          <a
            href="https://github.com/EkeneDeProgram"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            github.com/EkeneDeProgram
          </a>
        </p>

        {/* LinkedIn */}
        <p className="flex items-center gap-3">
          <Linkedin className="text-blue-600" />
          <a
            href="https://linkedin.com/in/ekenedeprogram"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            linkedin.com/in/ekenedeprogram
          </a>
        </p>

        {/* Resume */}
        <p className="flex items-center gap-3">
          <FileText className="text-blue-600" />
          <a
            href="/resume.pdf"
            download
            className="hover:underline"
          >
            Download Resume (PDF)
          </a>
        </p>

      </div>
    </div>
  );
};

export default ContactInfo;
