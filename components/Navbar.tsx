"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Skills", href: "/skills" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-blue-600 text-white shadow-md backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-blue-700 font-bold text-lg sm:text-xl shadow">
            EO
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 lg:space-x-10 font-medium">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-gray-200 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-white"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden 
          ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="bg-blue-600 border-t border-blue-500 px-6 py-4 flex flex-col space-y-4 text-lg font-medium">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-gray-200"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
