"use client";

import { motion } from "motion/react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className="px-6 py-20">
        <div className="text-left">
          <p className="text-base text-gray-600 mb-8 max-w-2xl">
            A digital bookshelf for organizing and tracking your reading
            collection. Add books, create shelves, and keep track of what you've
            read, what you're reading, and what you want to read next.
          </p>
        </div>
      </main>
    </div>
  );
}
