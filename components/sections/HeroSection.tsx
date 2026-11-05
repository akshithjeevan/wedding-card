"use client";

import React from "react";
import { motion } from "framer-motion";
import { VJMonogram } from "@/components/decorations/VJMonogram";
import { Nilavilakku } from "@/components/decorations/Nilavilakku";
import { FloralCorner } from "@/components/decorations/FloralCorner";
import { GoldDivider } from "@/components/decorations/GoldDivider";
import { weddingData } from "@/data/wedding";
import { ChevronDown, Download } from "lucide-react";

export const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-between pt-24 pb-12 px-4 overflow-hidden"
    >
      {/* Corner Floral Ornaments */}
      <FloralCorner position="top-left" size={220} className="hidden sm:block" />
      <FloralCorner position="top-right" size={220} />
      <FloralCorner position="bottom-right" size={240} />

      {/* Kerala Nilavilakku & Kasavu Drapery at Bottom-Left */}
      <div className="absolute bottom-0 left-0 z-10 hidden sm:block opacity-95">
        <Nilavilakku size={200} showFabric />
      </div>

      {/* Main Center Content Container */}
      <div className="relative z-20 max-w-2xl mx-auto flex flex-col items-center text-center my-auto px-4">
        {/* Monogram with reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-4"
        >
          <VJMonogram size={120} glow />
        </motion.div>

        {/* Wedding Invitation Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-cormorant font-semibold text-[#123D25] tracking-wide">
            Wedding Invitation
          </h1>
        </motion.div>

        <GoldDivider width={220} variant="flourish" className="my-3" />

        {/* Parent invitation message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xs sm:text-sm md:text-base font-serif italic text-[#76685A] max-w-lg mb-6 leading-relaxed"
        >
          {weddingData.couple.invitationMessage}
        </motion.p>

        {/* Groom & Bride Names */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="space-y-1 sm:space-y-2 mb-6"
        >
          <div className="text-4xl sm:text-6xl md:text-7xl font-script text-[#700D20] font-normal tracking-wide drop-shadow-sm">
            {weddingData.couple.groom.fullName}
          </div>

          <div className="flex items-center justify-center gap-3 my-1">
            <span className="w-8 sm:w-12 h-px bg-[#C49A43]/60" />
            <span className="text-xs sm:text-sm font-serif italic uppercase tracking-widest text-[#C49A43]">
              with
            </span>
            <span className="w-8 sm:w-12 h-px bg-[#C49A43]/60" />
          </div>

          <div className="text-4xl sm:text-6xl md:text-7xl font-script text-[#700D20] font-normal tracking-wide drop-shadow-sm">
            {weddingData.couple.bride.fullName}
          </div>
        </motion.div>

        {/* Supporting Poetry Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-xs sm:text-sm font-serif text-[#2F261F]/80 max-w-md leading-relaxed px-4 mb-6"
        >
          {weddingData.couple.subMessage}
        </motion.p>

        {/* 1-Click Printable / PDF Invitation Download Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("open-download-card"));
              }
            }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FFFDF9] text-[#123D25] border-2 border-[#C49A43] shadow-[0_4px_16px_rgba(196,154,67,0.2)] hover:bg-[#123D25] hover:text-[#FFF9ED] hover:scale-105 transition-all text-xs sm:text-sm font-serif font-semibold cursor-pointer group"
          >
            <Download className="w-4 h-4 text-[#C49A43] group-hover:text-[#E5C67C] transition-colors" />
            <span>Download Invitation Card</span>
          </button>
        </motion.div>
      </div>

      {/* Scroll to Discover Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 1.5,
          ease: "easeInOut",
        }}
        className="relative z-20 flex flex-col items-center gap-1.5 cursor-pointer mt-6"
        onClick={() => {
          document.querySelector("#couple")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.25em] text-[#C49A43]">
          Scroll to Discover
        </span>
        <div className="w-7 h-7 rounded-full border border-[#C49A43]/50 flex items-center justify-center text-[#700D20] bg-[#FFF9ED]/80 shadow-sm">
          <ChevronDown className="w-4 h-4" />
        </div>
      </motion.div>
    </section>
  );
};

