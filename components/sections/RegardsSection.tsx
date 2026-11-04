"use client";

import React from "react";
import { motion } from "framer-motion";
import { GoldDivider } from "@/components/decorations/GoldDivider";
import { FloralCorner } from "@/components/decorations/FloralCorner";
import { weddingData } from "@/data/wedding";

export const RegardsSection: React.FC = () => {
  return (
    <section
      id="regards"
      className="relative py-16 px-4 overflow-hidden bg-[#FFF9ED]"
    >
      <FloralCorner position="top-left" size={160} />
      <FloralCorner position="bottom-right" size={160} />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-playfair font-semibold text-[#123D25]">
            With Best Regards
          </h2>
          <GoldDivider width={160} variant="diamond" className="mx-auto mt-2" />
        </motion.div>

        {/* Regards Names - Horizontal on Desktop, Stacked on Mobile */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 w-full max-w-2xl">
          {weddingData.regards.map((name, idx) => (
            <React.Fragment key={name}>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="px-6 py-2"
              >
                <span className="text-xl sm:text-2xl font-serif font-medium text-[#700D20] tracking-wide">
                  {name}
                </span>
              </motion.div>

              {idx < weddingData.regards.length - 1 && (
                <>
                  {/* Desktop Vertical Gold Separator */}
                  <div className="hidden md:block w-px h-8 bg-gradient-to-b from-transparent via-[#C49A43] to-transparent" />
                  {/* Mobile Horizontal Gold Divider */}
                  <div className="md:hidden w-16 h-px bg-[#C49A43]/40" />
                </>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

