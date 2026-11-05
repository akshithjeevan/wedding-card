"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { weddingData } from "@/data/wedding";

export const MobileInvitationHero: React.FC = () => {
  return (
    <section id="hero" className="relative w-full overflow-hidden text-center pt-0 pb-6 px-4">
      {/* Top Watercolor Floral Garland matching the reference */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full relative h-36 sm:h-44 -mx-4 overflow-hidden mb-2"
      >
        <Image
          src="/images/mauve-floral-header.jpg"
          alt="Lavender & Mauve Wedding Floral Header"
          fill
          priority
          className="object-cover object-top"
        />
        {/* Soft bottom fade to blend with pure white canvas */}
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent" />
      </motion.div>

      <div className="flex flex-col items-center max-w-sm mx-auto px-2 relative z-10">
        {/* Traditional Sacred Invocation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-3"
        >
          <span className="text-xs sm:text-sm font-serif text-[#C49A43] font-semibold tracking-wider block">
            ॥ ശ്രീ ഗണേശായ നമഃ ॥
          </span>
          <span className="text-[10px] sm:text-[11px] font-serif uppercase tracking-[0.25em] text-[#8C7A87] mt-0.5 block">
            With the divine blessings of the Almighty
          </span>
        </motion.div>

        {/* Intertwined Calligraphic Monogram VJ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="my-2 relative flex items-center justify-center"
        >
          <div className="w-20 h-20 rounded-full border-2 border-[#C49A43]/50 bg-[#FAF4F0]/60 flex items-center justify-center shadow-xs">
            <span className="font-script text-4xl sm:text-5xl text-[#3D182E] font-bold select-none drop-shadow-xs">
              {weddingData.couple.monogram}
            </span>
          </div>
        </motion.div>

        {/* Invitation Lead text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-1 my-3"
        >
          <p className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.28em] text-[#704863] font-semibold">
            Together With Their Families
          </p>
          <p className="text-[10px] sm:text-[11px] font-serif italic text-[#8C7A87]">
            Request the honour of your gracious presence at the
          </p>
          <h2 className="font-playfair text-xl sm:text-2xl font-bold tracking-wide text-[#3D182E] uppercase pt-1">
            Wedding Ceremony
          </h2>
        </motion.div>

        {/* Subtle decorative divider line */}
        <div className="flex items-center justify-center gap-2 my-2 w-48">
          <span className="h-px bg-[#C49A43]/40 flex-1" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#C49A43]" />
          <span className="h-px bg-[#C49A43]/40 flex-1" />
        </div>

        {/* Groom & Bride Names */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="space-y-1.5 my-3"
        >
          {/* Groom */}
          <div>
            <h1 className="font-script text-4xl sm:text-5xl text-[#3D182E] leading-tight font-normal">
              {weddingData.couple.groom.fullName}
            </h1>
            <p className="text-[11px] font-serif text-[#704863] italic">
              {weddingData.couple.groom.description}
            </p>
          </div>

          {/* With / And */}
          <div className="flex items-center justify-center gap-2 py-1">
            <span className="w-6 h-px bg-[#C49A43]/40" />
            <span className="font-script text-2xl text-[#C49A43] italic">with</span>
            <span className="w-6 h-px bg-[#C49A43]/40" />
          </div>

          {/* Bride */}
          <div>
            <h2 className="font-script text-4xl sm:text-5xl text-[#3D182E] leading-tight font-normal">
              {weddingData.couple.bride.fullName}
            </h2>
            <p className="text-[11px] font-serif text-[#704863] italic">
              {weddingData.couple.bride.parents}
            </p>
            <p className="text-[10px] font-serif text-[#8C7A87]">
              {weddingData.couple.bride.address}
            </p>
          </div>
        </motion.div>

        {/* Floral Bouquet Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative w-44 h-14 my-2"
        >
          <Image
            src="/images/mauve-floral-divider.jpg"
            alt="Watercolor Floral Divider"
            fill
            className="object-contain"
          />
        </motion.div>

        {/* Couple Quote / Sub-Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-xs font-serif italic text-[#704863] max-w-xs leading-relaxed"
        >
          &ldquo;{weddingData.couple.subMessage}&rdquo;
        </motion.p>
      </div>
    </section>
  );
};
