// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import Navbar from "@/components/Navbar";
// import GoogleAnalytics from "@/components/GoogleAnalytics";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Home | Ekene Onyekachi",
//   description: "My personal portfolio",
//   icons: {
//     icon: "/icons/favicon.svg",
//     shortcut: "/icons/favicon.svg",
//     apple: "/icons/apple-touch-icon.png",
//   },
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body
//         className={`flex flex-col min-h-screen ${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
//       >
//         {/* Google Analytics */}
//         <GoogleAnalytics />

//         <Navbar />

//         {/* Main content grows to fill remaining space */}
//         <main className="grow pt-20">{children}</main>
//       </body>
//     </html>
//   );
// }











import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // <-- imported Footer
import GoogleAnalytics from "@/components/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home | Ekene Onyekachi",
  description: "My personal portfolio",
  icons: {
    icon: "/icons/favicon.svg",
    shortcut: "/icons/favicon.svg",
    apple: "/icons/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`flex flex-col min-h-screen ${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {/* Google Analytics */}
        <GoogleAnalytics />

        {/* Navbar */}
        <Navbar />

        {/* Main content grows to fill remaining space */}
        <main className="grow pt-20">{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
