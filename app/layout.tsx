import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { ThemeProvider } from "../lib/theme-provider";
import { cn } from "@/lib/utils";

import "./globals.css";
import "./css/zoom.css"

import Navbar from "@/components/shared/Navbar/Navbar";
import NavbarMobile from "@/components/shared/Navbar/NavbarMobile";
import Footer from "@/components/shared/Footer/Footer";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Toolhance",
  description: "Maximize Your Productivity with Toolhance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={cn(GeistSans.className, "dark:bg-[#111115] bg-white")}>
        <ThemeProvider
          enableSystem
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          themes={["light", "dark",]}
        >
          <Navbar />
          <NavbarMobile />
          {children}
          <Toaster />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
