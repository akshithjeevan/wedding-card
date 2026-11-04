"use client";

import React from "react";
import { motion } from "framer-motion";
import { CountdownTimer } from "@/components/ui/CountdownTimer";
import { GoldDivider } from "@/components/decorations/GoldDivider";
import { FloralCorner } from "@/components/decorations/FloralCorner";
import { weddingData } from "@/data/wedding";
import { Calendar } from "lucide-react";

export const CountdownSection: React.FC = () => {
  // Construct direct Google Calendar event creation URL
  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    weddingData.share.calendar.title
  )}&dates=${weddingData.share.calendar.startTime}/${
    weddingData.share.calendar.endTime
  }&details=${encodeURIComponent(
    weddingData.share.calendar.description
  )}&location=${encodeURIComponent(weddingData.share.calendar.location)}`;

  return (
    <section
      id="countdown"
      className="relative py-20 px-4 overflow-hidden bg-[#FFF9ED]"
    >
      <FloralCorner position="top-left" size={190} />
      <FloralCorner position="bottom-right" size={190} />

      <div className="max-w-3xl mx-auto flex flex-col items-center text-center relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-[#C49A43] font-serif font-medium">
            Save The Date
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-semibold text-[#123D25] mt-1">
            The Big Day
          </h2>
          <p className="text-xs sm:text-sm font-serif italic text-[#76685A] mt-1">
            We are counting down to our wedding
          </p>
          <GoldDivider width={180} variant="flourish" className="mx-auto mt-2" />
        </motion.div>

        {/* Dynamic Countdown Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full mb-10"
        >
          <CountdownTimer />
        </motion.div>

        {/* Date Display Card & Add to Calendar Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-2 text-[#700D20]">
            <Calendar className="w-5 h-5 text-[#C49A43]" />
            <div className="text-center">
              <span className="block text-xs uppercase tracking-widest text-[#76685A] font-sans">
                {weddingData.schedule.dayOfWeek}
              </span>
              <span className="text-lg sm:text-xl font-serif font-bold text-[#700D20]">
                {weddingData.schedule.dateDisplay}
              </span>
            </div>
          </div>

          <a
            href={gcalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#700D20] text-[#FFF9ED] font-serif text-sm tracking-wide border border-[#C49A43] shadow-md hover:bg-[#520917] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#E5C67C]" />
            <span>Add to Calendar</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

