"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Mail, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingData } from "@/data/wedding";

interface NavbarProps {
  onReopenEnvelope?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onReopenEnvelope }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Couple", href: "#couple" },
    { name: "Details", href: "#details" },
    { name: "Venue", href: "#venue" },
    { name: "Sadhya", href: "#sadhya" },
    { name: "Family", href: "#family" },
    { name: "Wishes", href: "#wishes" },
    { name: "Photos", href: "#photos" },
    { name: "Share", href: "#share" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FFF9ED]/92 backdrop-blur-md border-b border-[#C49A43]/30 shadow-sm py-2.5"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Monogram Brand */}
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, "#hero")}
          className="flex items-center gap-2 group"
        >
          <div className="w-9 h-9 rounded-full border border-[#C49A43] flex items-center justify-center bg-[#FFF9ED] shadow-sm group-hover:scale-105 transition-transform">
            <span className="font-script text-base text-[#700D20] font-bold">
              {weddingData.couple.monogram}
            </span>
          </div>
          <span className="font-serif text-sm tracking-widest uppercase text-[#123D25] hidden sm:inline-block">
            Vishnuraj & Josly
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="font-serif text-xs uppercase tracking-widest text-[#2F261F] hover:text-[#700D20] transition-colors relative group py-1"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C49A43] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}

          {onReopenEnvelope && (
            <button
              onClick={onReopenEnvelope}
              title="View Envelope"
              className="flex items-center gap-1.5 text-xs font-serif uppercase tracking-wider text-[#700D20] px-3 py-1.5 rounded-full border border-[#C49A43]/50 hover:bg-[#F5EBD8] transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Envelope</span>
            </button>
          )}

          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("open-download-card"));
              }
            }}
            title="Download Invitation Card"
            className="flex items-center gap-1.5 text-xs font-serif uppercase tracking-wider text-[#123D25] px-3 py-1.5 rounded-full border border-[#C49A43] bg-[#FFFDF9] hover:bg-[#123D25] hover:text-[#FFF9ED] transition-all shadow-xs cursor-pointer group"
          >
            <Download className="w-3.5 h-3.5 text-[#C49A43] group-hover:text-[#E5C67C]" />
            <span>Card</span>
          </button>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("open-download-card"));
              }
            }}
            className="p-1.5 rounded-full border border-[#C49A43] text-[#123D25] bg-[#FFFDF9]"
            aria-label="Download Invitation Card"
            title="Download Card"
          >
            <Download className="w-4 h-4 text-[#C49A43]" />
          </button>

          {onReopenEnvelope && (
            <button
              onClick={onReopenEnvelope}
              className="p-1.5 rounded-full border border-[#C49A43]/50 text-[#700D20]"
              aria-label="View Envelope"
            >
              <Mail className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#123D25] hover:bg-[#F5EBD8] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-[#700D20]" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#FFF9ED]/98 backdrop-blur-lg border-b border-[#C49A43]/40 shadow-xl overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4 items-center text-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-serif text-base tracking-widest uppercase text-[#2F261F] hover:text-[#700D20] py-1 border-b border-[#C49A43]/15 w-full max-w-xs"
                >
                  {link.name}
                </a>
              ))}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("open-download-card"));
                  }
                }}
                className="mt-2 flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#123D25] text-[#FFF9ED] font-serif text-sm tracking-wide border border-[#C49A43] shadow-sm w-full max-w-xs cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#E5C67C]" />
                <span>Download Invitation Card</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

