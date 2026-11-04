"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Navigation } from "lucide-react";
import { GoldDivider } from "@/components/decorations/GoldDivider";
import { FloralCorner } from "@/components/decorations/FloralCorner";
import { weddingData } from "@/data/wedding";

export const WeddingDetails: React.FC = () => {
  const details = [
    {
      icon: Calendar,
      title: "Date",
      primary: weddingData.schedule.dateDisplay,
      secondary: weddingData.schedule.dayOfWeek,
      extra: `(${weddingData.schedule.malayalamDate})`,
    },
    {
      icon: Clock,
      title: "Time",
      primary: weddingData.schedule.timeDisplay,
      secondary: "Muhurtham",
      extra: "Auspicious Hours",
    },
    {
      icon: MapPin,
      title: "Venue",
      primary: weddingData.venue.name,
      secondary: weddingData.venue.addressLine1,
      extra: weddingData.venue.addressLine2,
    },
  ];

  const handleDirectionsClick = () => {
    const venueEl = document.querySelector("#venue");
    if (venueEl) {
      venueEl.scrollIntoView({ behavior: "smooth" });
    } else {
      window.open(weddingData.venue.googleMapsDirectionsUrl, "_blank");
    }
  };

  return (
    <section
      id="details"
      className="relative py-20 px-4 overflow-hidden bg-gradient-to-b from-[#FFF9ED] via-[#F6ECE0] to-[#FFF9ED]"
    >
      <FloralCorner position="top-right" size={170} />
      <FloralCorner position="bottom-left" size={170} />

      <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-[#C49A43] font-serif font-medium">
            Essential Information
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-semibold text-[#123D25] mt-1">
            Wedding Details
          </h2>
          <GoldDivider width={180} variant="flourish" className="mx-auto mt-2" />
        </motion.div>

        {/* 3 Information Cards / Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 w-full mb-12 relative">
          {details.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className={`flex flex-col items-center px-6 relative ${
                  idx !== 0 ? "md:border-l md:border-[#C49A43]/40" : ""
                }`}
              >
                {/* Circular Gold Icon Frame */}
                <div className="w-16 h-16 rounded-full border-2 border-[#C49A43] bg-[#FFFDF8] flex items-center justify-center text-[#C49A43] shadow-md mb-4 group hover:scale-105 transition-transform">
                  <Icon className="w-7 h-7 text-[#700D20]" />
                </div>

                <span className="text-xs font-sans uppercase tracking-[0.2em] text-[#C49A43] font-semibold mb-2">
                  {item.title}
                </span>

                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#700D20] mb-1">
                  {item.primary}
                </h3>

                <p className="text-sm font-serif text-[#123D25] font-medium">
                  {item.secondary}
                </p>

                {item.extra && (
                  <p className="text-xs font-serif italic text-[#76685A] mt-1">
                    {item.extra}
                  </p>
                )}

                {/* Mobile divider */}
                <div className="w-24 h-px bg-[#C49A43]/30 mt-6 md:hidden" />
              </motion.div>
            );
          })}
        </div>

        {/* Get Directions Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button
            onClick={handleDirectionsClick}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#123D25] text-[#FFF9ED] font-serif text-sm tracking-wider border border-[#C49A43] shadow-[0_8px_25px_rgba(18,61,37,0.25)] hover:bg-[#0C321B] hover:scale-105 transition-all cursor-pointer"
          >
            <Navigation className="w-4 h-4 text-[#E5C67C]" />
            <span>Get Directions</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

