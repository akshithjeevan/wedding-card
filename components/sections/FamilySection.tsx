"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone, MapPin } from "lucide-react";
import { Nilavilakku } from "@/components/decorations/Nilavilakku";
import { FloralCorner } from "@/components/decorations/FloralCorner";
import { GoldDivider } from "@/components/decorations/GoldDivider";
import { weddingData } from "@/data/wedding";

export const FamilySection: React.FC = () => {
  return (
    <section
      id="family"
      className="relative py-20 px-4 overflow-hidden bg-gradient-to-b from-[#FFF9ED] via-[#F4E9D6] to-[#FFF9ED]"
    >
      <FloralCorner position="top-right" size={170} />
      <FloralCorner position="bottom-left" size={170} />

      {/* Nilavilakku at bottom-right or side */}
      <div className="absolute bottom-2 right-4 z-10 hidden lg:block opacity-90">
        <Nilavilakku size={180} showFabric />
      </div>

      <div className="max-w-3xl mx-auto flex flex-col items-center text-center relative z-20">
        {/* Dark Forest-Green Ornamental Banner with Gold Borders */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative px-8 py-3 rounded-full bg-[#123D25] border-2 border-[#C49A43] shadow-[0_6px_20px_rgba(18,61,37,0.3)] mb-8"
        >
          {/* Inner gold thread */}
          <div className="absolute inset-1 rounded-full border border-[#E5C67C]/40 pointer-events-none" />
          <h2 className="text-sm sm:text-base font-serif uppercase tracking-[0.2em] text-[#FFF9ED] font-medium">
            With Best Wishes From
          </h2>
        </motion.div>

        {/* Family Names & Residence Address */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#700D20] tracking-wide mb-3">
            {weddingData.family.hosts}
          </h3>

          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-serif text-[#2F261F]/80 max-w-md mx-auto leading-relaxed">
            <MapPin className="w-4 h-4 text-[#C49A43] shrink-0" />
            <span>{weddingData.family.address}</span>
          </div>

          <GoldDivider width={160} variant="diamond" className="mx-auto mt-4" />
        </motion.div>

        {/* Contact Numbers (All Clickable tel: links in a Single Row) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full max-w-xl mx-auto"
        >
          <span className="text-xs uppercase tracking-widest text-[#76685A] font-sans block mb-4">
            Contact &amp; Blessings
          </span>

          <div className="flex flex-row items-center justify-center gap-1.5 sm:gap-3 w-full px-1">
            {weddingData.family.phoneNumbers.map((phone, idx) => (
              <a
                key={idx}
                href={`tel:${phone.raw}`}
                className="flex items-center justify-center gap-1 sm:gap-2 px-2.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-[#FFFDF8] border border-[#C49A43] shadow-sm hover:bg-[#123D25] hover:text-[#FFF9ED] hover:scale-105 active:scale-95 transition-all text-[#123D25] group shrink-0"
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#123D25] text-[#E5C67C] flex items-center justify-center shrink-0 group-hover:bg-[#C49A43] group-hover:text-[#123D25] transition-colors">
                  <Phone className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                </div>
                <span className="font-sans text-[11px] sm:text-sm font-semibold tracking-tight sm:tracking-wide whitespace-nowrap">
                  {phone.display}
                </span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

