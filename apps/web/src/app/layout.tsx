"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { metadata } from "./metadata";
import Navbar from "../components/navbar";

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${ibmPlexMono.variable} tracking-tighter font-mono font-light antialiased bg-white text-black`}>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
