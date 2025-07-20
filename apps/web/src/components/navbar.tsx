"use client";

import { motion } from "motion/react";
import { Github, LogIn, Menu, X } from "lucide-react";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "./ui/button";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="flex items-center justify-between px-4 sm:px-6 py-4 bg-white/80 backdrop-blur-sm">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-black">
        Shelfie
      </motion.div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-4">
        <motion.a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Github className="w-5 h-5 text-gray-600" />
        </motion.a>

        <SignedOut>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}>
            <SignInButton>
              <Button variant="ghost" size="default">
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            </SignInButton>
          </motion.div>
        </SignedOut>
        <SignedIn>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}>
            <UserButton />
          </motion.div>
        </SignedIn>
      </div>

      {/* Mobile Menu Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? (
          <X className="w-5 h-5 text-gray-600" />
        ) : (
          <Menu className="w-5 h-5 text-gray-600" />
        )}
      </motion.button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          x: isMobileMenuOpen ? 0 : "100%",
        }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 right-0 h-full w-64 bg-white border-l border-gray-200 z-50 md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <span className="text-lg font-semibold text-black">Menu</span>
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Mobile Menu Items */}
          <div className="flex flex-col p-4 space-y-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={toggleMobileMenu}>
              <Github className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">GitHub</span>
            </a>

            <SignedOut>
              <SignInButton>
                <Button
                  variant="default"
                  size="default"
                  className="w-full justify-start"
                  onClick={toggleMobileMenu}>
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center gap-3 p-3">
                <UserButton />
                <span className="text-gray-700">Account</span>
              </div>
            </SignedIn>
          </div>
        </div>
      </motion.div>
    </nav>
  );
}
