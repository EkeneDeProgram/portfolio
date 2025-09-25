"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <nav className="w-full fixed top-0 left-0 z-50 shadow-md bg-[#2F3E46]/95 text-white backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
        
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#3B8B7E] text-white font-bold text-xl shadow-md transition-transform duration-300 hover:scale-110">
            EO
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 font-medium">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative hover:text-[#FFD700] transition-colors group"
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#FFD700] group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#2F3E46]/95 shadow-lg border-t border-[#3B8B7E]">
          <div className="flex flex-col space-y-4 px-6 py-4 text-lg font-medium">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-[#FFD700] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
