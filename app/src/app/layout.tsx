import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Portfolio | Software Engineering",
  description: "A Software Engineering student portfolio featuring projects, skills, and learning progress.",
};

const navigation = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/health", label: "Health" },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col`}>
        <header className="border-b border-slate-200 bg-white">
          <nav aria-label="Main navigation" className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-5">
            <Link href="/" className="text-lg font-bold text-slate-900">My Portfolio</Link>
            <div className="flex flex-wrap gap-4 text-sm font-medium">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href} className="text-slate-600 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700">
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </header>
        <div className="flex-1">{children}</div>
        <footer className="border-t border-slate-200 px-6 py-5 text-center text-sm text-slate-500">
          © My Portfolio
        </footer>
      </body>
    </html>
  );
}

