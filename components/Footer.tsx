// components/Footer.tsx
import Link from "next/link";
import { SiX } from "react-icons/si"; // X logo from Simple Icons

const Footer: React.FC = () => {
  return (
    <footer className="w-full  bg-blue-600 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

        {/* X Link with Icon */}
        <div className="flex items-center justify-center md:justify-start gap-2">
          <SiX className="text-2xl sm:text-3xl text-white hover:text-gray-400 transition-colors" />
          <Link
            href="https://x.com/KukiWorldwide"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-200 font-medium text-lg sm:text-xl transition-colors"
          >
            Follow me on X
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-400 text-center md:text-right">
          &copy; {new Date().getFullYear()} Ekene Onyekachi. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
