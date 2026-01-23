// components/Footer.tsx
import Link from "next/link";

const Footer: React.FC = () => {
  const links = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Skills", href: "/skills" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <footer className="w-full bg-blue-600 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        
        {/* Footer Links */}
        <div className="flex flex-wrap justify-center md:justify-start gap-4 font-medium">
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

        {/* Copyright */}
        <div className="text-sm text-gray-200 text-center md:text-right">
          &copy; {new Date().getFullYear()} Ekene Onyekachi. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
