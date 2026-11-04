"use client";

import React from "react";
import { motion } from "framer-motion";
import { VJMonogram } from "@/components/decorations/VJMonogram";
import { Nilavilakku } from "@/components/decorations/Nilavilakku";
import { ArrowUp } from "lucide-react";
import { weddingData } from "@/data/wedding";

export const FooterSection: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative min-h-[90vh] sm:min-h-screen flex flex-col items-center justify-between py-16 px-4 bg-gradient-to-b from-[#123D25] via-[#0C321B] to-[#071F11] text-[#FFF9ED] overflow-hidden">
      {/* Background Kerala Backwater & Tropical Sunset Ambience */}
      {/* Golden Sunset Warmth Radial */}
      <div
        className="absolute bottom-0 inset-x-0 h-[400px] pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at bottom, rgba(229,198,124,0.4) 0%, rgba(196,154,67,0.15) 50%, transparent 80%)",
        }}
      />

      {/* Decorative Kerala Backwater Houseboat & Palm Silhouette SVG at bottom */}
      <div className="absolute bottom-0 inset-x-0 h-48 pointer-events-none opacity-25">
        <svg
          viewBox="0 0 1200 240"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Water reflection lines */}
          <path
            d="M 0 200 Q 300 190 600 200 T 1200 200"
            stroke="#E5C67C"
            strokeWidth="0.8"
            opacity="0.4"
          />
          <path
            d="M 0 220 Q 300 215 600 220 T 1200 220"
            stroke="#E5C67C"
            strokeWidth="0.6"
            opacity="0.3"
          />

          {/* Traditional Kettuvallam (Kerala Houseboat) Silhouette */}
          <g transform="translate(850, 140) scale(0.7)" fill="#05160C">
            {/* Curved bamboo thatched roof */}
            <path d="M 10 70 Q 150 15 320 70 L 300 90 L 30 90 Z" />
            <path d="M 0 75 C 50 95 280 95 340 75 C 310 100 30 100 0 75 Z" fill="#030E07" />
            {/* Small mast / lantern */}
            <circle cx="170" cy="40" r="3" fill="#E5C67C" opacity="0.8" />
          </g>

          {/* Tropical Coconut Palm Fronds on Far Left & Right */}
          <path
            d="M -20 180 Q 80 100 160 120 M 20 190 Q 90 70 200 90 M -10 200 Q 120 120 220 160"
            stroke="#05160C"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M 1220 180 Q 1120 100 1040 120 M 1180 190 Q 1110 70 1000 90"
            stroke="#05160C"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Nilavilakku glowing in foreground corner */}
      <div className="absolute bottom-6 left-6 z-10 hidden sm:block opacity-90 drop-shadow-[0_0_15px_rgba(229,198,124,0.3)]">
        <Nilavilakku size={180} showFabric />
      </div>

      {/* Center Thank You Message */}
      <div className="my-auto max-w-xl mx-auto flex flex-col items-center text-center relative z-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-6"
        >
          <VJMonogram size={120} glow />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#E5C67C] font-serif block mb-2">
            With Love & Gratitude
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cormorant font-semibold text-[#FFF9ED] leading-tight mb-4 drop-shadow-md">
            Your Presence Is Our Greatest Gift
          </h2>

          <p className="text-sm sm:text-base font-serif italic text-[#E5C67C] max-w-md mx-auto leading-relaxed">
            Thank you for being part of our special day and blessing our journey together.
          </p>
        </motion.div>

        {/* Decorative Gold Flourish */}
        <div className="w-48 h-px bg-gradient-to-r from-transparent via-[#E5C67C] to-transparent my-8" />

        {/* Couple & Date Reminder */}
        <div className="space-y-1 mb-8">
          <p className="text-2xl sm:text-3xl font-script text-[#E5C67C]">
            {weddingData.couple.groom.fullName} &amp; {weddingData.couple.bride.fullName}
          </p>
          <p className="text-xs uppercase tracking-widest text-[#FFF9ED]/70 font-sans">
            {weddingData.schedule.dateDisplay} • Vaikom, Kerala
          </p>
        </div>

        {/* Back to Invitation Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#C49A43] text-[#0C321B] font-serif text-sm tracking-wider font-semibold shadow-[0_8px_25px_rgba(196,154,67,0.3)] hover:bg-[#E5C67C] transition-all cursor-pointer"
        >
          <span>Back to Invitation</span>
          <ArrowUp className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Subtle Copyright / Made with Love */}
      <div className="relative z-20 text-[11px] font-sans text-[#FFF9ED]/50 tracking-wider">
        © 2026 Vishnuraj &amp; Josly. All rights reserved.
      </div>
    </footer>
  );
};

