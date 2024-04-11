import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import "./globals.css";
import { cn } from "@/lib/utils";

import Navbar from "@/components/shared/Navbar/Navbar";
import NavbarMobile from "@/components/shared/Navbar/NavbarMobile";

import { ThemeProvider } from "../lib/theme-provider";

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
          attribute='class'
          defaultTheme='system'
          disableTransitionOnChange
          themes={['light', 'dark',]}
        >
          <Navbar />
          <NavbarMobile />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
