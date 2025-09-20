"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Menu links
  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <nav className="w-full fixed top-0 left-0 z-50 shadow-md bg-gradient-to-r from-[#C2B280] via-[#7D7F7D] to-[#4B5320] text-[#000000] dark:text-[#C2B280] transition-colors duration-300 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
        
        {/* Logo with Initials EO */}
        <Link href="/" className="flex items-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#8B0000] text-[#C2B280] font-bold text-xl shadow-lg 
            hover:scale-110 hover:rotate-6 transition-transform duration-300 ease-in-out">
            EO
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 font-medium">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative hover:text-[#8B0000] transition-colors group"
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#8B0000] group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-[#C2B280] via-[#7D7F7D] to-[#4B5320] shadow-lg border-t border-[#7D7F7D]">
          <div className="flex flex-col space-y-4 px-6 py-4 text-lg font-medium">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-[#8B0000] transition-colors"
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
