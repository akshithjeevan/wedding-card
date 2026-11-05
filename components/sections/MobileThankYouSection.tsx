"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Copy, Check, Share2, Download } from "lucide-react";
import { weddingData } from "@/data/wedding";

export const MobileThankYouSection: React.FC = () => {
  const [copiedTag, setCopiedTag] = useState(false);

  const handleCopyTag = async () => {
    try {
      await navigator.clipboard.writeText(weddingData.photoDrop.hashtag);
      setCopiedTag(true);
      setTimeout(() => setCopiedTag(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <footer className="w-full pt-6 pb-12 px-4 flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-sm flex flex-col items-center"
      >
        {/* Thank You Script */}
        <span className="font-script text-4xl sm:text-5xl text-[#3D182E] tracking-wide">
          Thank you
        </span>

        {/* Couple Names */}
        <p className="font-serif text-xs uppercase tracking-[0.25em] text-[#704863] font-semibold mt-2">
          Vishnuraj &amp; Josly
        </p>

        {/* Hashtag badge */}
        <button
          onClick={handleCopyTag}
          className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF4F0] hover:bg-[#F2E8E1] border border-[#D9C9C0] text-xs font-mono font-bold text-[#3D182E] transition-all cursor-pointer shadow-2xs"
          title="Click to copy hashtag"
        >
          <span>{weddingData.photoDrop.hashtag}</span>
          {copiedTag ? (
            <Check className="w-3.5 h-3.5 text-emerald-600" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-[#C49A43]" />
          )}
        </button>

        {/* Bottom Floral Illustration */}
        <div className="relative w-44 h-16 my-4">
          <Image
            src="/images/mauve-floral-divider.jpg"
            alt="Floral illustration"
            fill
            className="object-contain"
          />
        </div>

        <p className="text-[11px] font-serif text-[#8C7A87]">
          Celebrating the sacred union • 21 November 2026
        </p>
        <div className="flex items-center gap-1 text-[10px] font-sans text-[#A898A4] mt-1">
          <span>Made with</span>
          <Heart className="w-3 h-3 text-[#3D182E] fill-[#3D182E]" />
          <span>for Vishnuraj &amp; Josly</span>
        </div>
      </motion.div>
    </footer>
  );
};

