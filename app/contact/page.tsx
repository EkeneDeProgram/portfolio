import React from "react";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contact | Ekene Onyekachi",
  description: "Get in touch with me via my portfolio contact form.",
};


const ContactMe: React.FC = () => {
  return (
    <section className="relative min-h-screen py-20 px-6 overflow-hidden bg-gradient-to-r from-[#C2B280] via-[#7D7F7D] to-[#4B5320] text-[#000000] dark:text-[#C2B280]">
      <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        <ContactInfo />
        <ContactForm />
      </div>
    </section>
  );
};


export default ContactMe;
