"use client";

import React from "react";
import { motion } from "framer-motion";
import { VintageCar } from "@/components/decorations/VintageCar";
import { weddingData } from "@/data/wedding";

export const DepartureSection: React.FC = () => {
  return (
    <section className="relative py-8 px-4 bg-[#FFF9ED] flex justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative flex items-center justify-between gap-4 sm:gap-6 px-6 sm:px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FFFDF8] via-[#F6ECE0] to-[#FFFDF8] border-2 border-[#C49A43] shadow-[0_6px_20px_rgba(196,154,67,0.15)] max-w-lg w-full overflow-hidden"
      >
        {/* Subtle inner gold rim */}
        <div className="absolute inset-1 rounded-full border border-[#E5C67C]/40 pointer-events-none" />

        {/* Animated Moving Vintage Car */}
        <motion.div
          animate={{ x: [0, 8, 0] }}
          transition={{
            repeat: Infinity,
            duration: 3.5,
            ease: "easeInOut",
          }}
          className="shrink-0"
        >
          <VintageCar size={54} />
        </motion.div>

        {/* Departure Text & Time */}
        <div className="text-right sm:text-center flex-1">
          <span className="block text-[11px] sm:text-xs font-serif uppercase tracking-widest text-[#123D25] font-semibold">
            Groom&apos;s Departure Time
          </span>
          <span className="text-xl sm:text-2xl font-serif font-bold text-[#700D20] tracking-wide">
            {weddingData.schedule.departureTime}
          </span>
        </div>
      </motion.div>
    </section>
  );
};

