"use client";
import type { Metadata } from "next";
import { useRef } from "react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const bodyRef = useRef<HTMLBodyElement | null>(null);
  bodyRef.current?.addEventListener("mousemove", (e) => {
    const cursor = (document.getElementsByClassName("cursor")[0]) as HTMLDivElement
    cursor.style.left = `${e.clientX}px`
    cursor.style.top = `${e.clientY}px`
  })
  return (
    <html lang="en">
      <body ref={bodyRef} className={inter.className}>
          <div className="cursor_container">
            <div className="cursor"></div>
            {children}
          </div>
        </body>
    </html>
  );
}
