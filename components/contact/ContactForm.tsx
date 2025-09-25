"use client";

import React, { useRef, useEffect, useState } from "react";
import { init, sendForm } from "@emailjs/browser";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const pubKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (pubKey) init(pubKey);
  }, []);

  // Inline validation
  const validate = () => {
    const form = formRef.current;
    const newErrors: { [key: string]: string } = {};
    if (!form) return newErrors;

    if (!form.user_name.value.trim()) newErrors.user_name = "Name is required";
    if (!form.user_email.value.trim()) newErrors.user_email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.user_email.value)) newErrors.user_email = "Email is invalid";
    if (!form.message.value.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    if (!formRef.current) return;
    setStatus("sending");

    try {
      await sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        formRef.current
      );
      setStatus("success");
      formRef.current.reset();
      setErrors({});
    } catch (err) {
      console.error("EmailJS Error:", err);
      setStatus("error");
    }
  };

  return (
      <div className=" bg-white/30 text-[#000000] backdrop-blur-md rounded-3xl p-8 shadow-2xl z-10">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#FFD700]">
          Send Me a Message
        </h2>

        <form ref={formRef} onSubmit={handleSubmit} className="mt-6 flex flex-col gap-6 w-full relative">
          {/* Name Field */}
          <div className="relative">
            <input
              id="user_name"
              name="user_name"
              type="text"
              placeholder=" "
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
              required
            />
            <label
              htmlFor="user_name"
              className="absolute left-3 top-3 text-[#FFFFFF] dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-blue-500 peer-focus:text-sm"
            >
              Your Name
            </label>
            {errors.user_name && <p className="text-red-500 text-sm mt-1">{errors.user_name}</p>}
          </div>

          {/* Email Field */}
          <div className="relative">
            <input
              id="user_email"
              name="user_email"
              type="email"
              placeholder=" "
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
              required
            />
            <label
              htmlFor="user_email"
              className="absolute left-3 top-3 text-[#FFFFFF] dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-blue-500 peer-focus:text-sm"
            >
              Your Email
            </label>
            {errors.user_email && <p className="text-red-500 text-sm mt-1">{errors.user_email}</p>}
          </div>

          {/* Message Field */}
          <div className="relative">
            <textarea
              id="message"
              name="message"
              placeholder=" "
              rows={6}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
              required
            />
            <label
              htmlFor="message"
              className="absolute left-3 top-3 text-[#FFFFFF] dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-blue-500 peer-focus:text-sm"
            >
              Message
            </label>
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full bg-[#FFD700] font-bold py-3 rounded-full shadow-lg hover:scale-105 hover:bg-[#3B8B7E] transition-transform duration-300"
          >
            {status === "sending" ? "Sending..." : "Send"}
          </button>

          {/* Status Messages */}
          {status === "success" && <p className="text-[#4B5320] mt-2 text-center">Message sent successfully!</p>}
          {status === "error" && <p className="text-red-600 mt-2 text-center">Failed to send message. Please try again.</p>}
        </form>
      </div>
  );
}
