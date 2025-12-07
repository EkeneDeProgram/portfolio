import React from "react";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contact | Ekene Onyekachi",
  description: "Get in touch with me via my portfolio contact form.",
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
