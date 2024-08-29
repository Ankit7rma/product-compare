/** @format */
"use client";

import type { Metadata } from "next";
import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "../lib/utils";
import SideNavbar from "@/components/SideNavbar";
import AppNavbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <html lang="en" className={theme}>
      <body
        className={cn("min-h-screen w-full flex flex-col", inter.className, {
          "debug-screens": process.env.NODE_ENV === "development",
        })}
      >
        <AppNavbar toggleTheme={toggleTheme} currentTheme={theme} />

        <div className="flex flex-1">
          <SideNavbar />

          <div className="p-8 w-full bg-white dark:bg-gray-900 text-black dark:text-white">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
