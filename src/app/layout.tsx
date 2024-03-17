
"use client";
import { useEffect, useRef } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const bodyRef = useRef<HTMLBodyElement | null>(null);
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.addEventListener("mousemove", (e) => {
        const cursor = document.getElementsByClassName(
          "cursor"
        )[0] as HTMLDivElement;
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      });
    }
  }, []);
  return (
    <html lang="en">
      <body ref={bodyRef} className={inter.className}>
        <nav style={{zIndex: "400"}} className="flex w-full fixed top-0 left-0 text-white">
          <Link href={"/"} className="logo-font cursor-pointer relative transition-all hover:scale-125 bolder-navbar uppercase p-5 logo-animation text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 text-2xl animate-gradient bg-300%">
            Bright Sense
          </Link>
        </nav>
        <div className="cursor_container">
            <div className="cursor"></div>
            {children}
        </div>
      </body>
    </html>
  );
}

