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

  const inputClasses =
    "peer w-full px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white text-gray-900 text-sm sm:text-base";

  const labelClasses =
    "absolute left-4 sm:left-5 top-3 sm:top-3.5 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-blue-600 peer-focus:text-sm bg-white px-1";

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="mx-auto max-w-md sm:max-w-lg lg:max-w-xl bg-white p-6 sm:p-8 lg:p-10 rounded-3xl shadow-xl">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 text-center text-gray-900">
          Send Me a Message
        </h2>

        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Name */}
          <div className="relative">
            <input
              id="user_name"
              name="user_name"
              type="text"
              className={inputClasses}
              placeholder=" "
              required
            />
            <label htmlFor="user_name" className={labelClasses}>
              Your Name
            </label>
            {errors.user_name && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.user_name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="relative">
            <input
              id="user_email"
              name="user_email"
              type="email"
              className={inputClasses}
              placeholder=" "
              required
            />
            <label htmlFor="user_email" className={labelClasses}>
              Your Email
            </label>
            {errors.user_email && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.user_email}
              </p>
            )}
          </div>

          {/* Message */}
          <div className="relative">
            <textarea
              id="message"
              name="message"
              rows={5}
              className={`${inputClasses} resize-none`}
              placeholder=" "
              required
            />
            <label htmlFor="message" className={labelClasses}>
              Message
            </label>
            {errors.message && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-full bg-gray-900 py-3.5 text-sm sm:text-base font-semibold text-white shadow-lg transition hover:bg-blue-700 disabled:opacity-60"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>

          {/* Status */}
          {status === "success" && (
            <p className="text-green-600 text-center text-sm mt-2">
              Message sent successfully!
            </p>
          )}
          {status === "error" && (
            <p className="text-red-600 text-center text-sm mt-2">
              Failed to send message. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
