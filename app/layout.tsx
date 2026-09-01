import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CityPulse",
  description: "Civic issue reporting and neighborhood awareness for cities.",
};

const navItems = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/report", label: "Report" },
  { href: "/my-reports", label: "My Reports" },
  { href: "/profile", label: "Profile" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full text-[#edf3f7]">
        <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-4 py-4 sm:px-6 lg:px-8">
          <header className="mb-8 border border-[#1e3545] bg-[#0b1823]/90 shadow-[0_24px_80px_rgba(3,11,18,0.45)] backdrop-blur-sm">
            <div className="flex flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center border border-[#49d6ff]/40 bg-[#0f1f2a] text-sm font-bold tracking-[0.18em] text-[#49d6ff]">
                  CP
                </div>
                <div>
                  <p className="text-lg font-semibold tracking-[-0.03em] text-[#edf3f7]">CityPulse</p>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#9fb5c2]">
                    Civic intelligence
                  </p>
                </div>
              </div>

              <nav className="flex flex-wrap items-center gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-none border border-transparent px-3 py-2 text-sm font-medium text-[#cfe2eb] transition hover:border-[#1e3545] hover:bg-[#112734] hover:text-[#edf3f7]"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>

          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
