import React from "react";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Contact | Ekene Onyekachi",
  description:
    "Get in touch with me via my portfolio contact form.",
  openGraph: {
    title: "Contact | Ekene Onyekachi",
    description:
      "Get in touch with me via my portfolio contact form.",
    type: "website",
    url: "https://portfolio-q8l2.onrender.com/contact",
    siteName: "Ekene Onyekachi Portfolio", 
    images: [
      {
        url: "https://portfolio-q8l2.onrender.com/ekene.png",
        width: 1200,
        height: 630,
        alt: "Projects by Ekene Onyekachi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image", 
    site: "@KukiWorldwide",
    creator: "@KukiWorldwide", 
  },
};


const ContactMe: React.FC = () => {
  return (
    <section className="min-h-screen bg-white text-gray-900 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Page Title */}
        <h1 className="text-4xl sm:text-5xl font-bold text-center md:text-left mb-16">
          Contact Me
        </h1>

        {/* Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Info (Left) */}
          <ContactInfo />

          {/* Contact Form (Right) */}
          <div className="bg-gray-50 p-8 rounded-xl shadow-sm border border-gray-200">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMe;
