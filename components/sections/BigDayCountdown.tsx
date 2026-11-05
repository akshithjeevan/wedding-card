"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { weddingData } from "@/data/wedding";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isOver: boolean;
}

export const BigDayCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const targetTime = new Date(weddingData.schedule.targetIsoDateTime).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const diff = targetTime - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isOver: false });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const format2Digits = (n: number) => String(n).padStart(2, "0");

  return (
    <section id="countdown" className="w-full py-6 px-4 flex justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-sm rounded-2xl bg-[#2D1224] text-[#FFF9F3] p-6 text-center shadow-[0_8px_30px_rgba(45,18,36,0.25)] border border-[#C49A43]/40 relative overflow-hidden"
      >
        {/* Subtle decorative glow */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#C49A43] via-[#E5C67C] to-[#C49A43]" />

        <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#E5C67C] font-semibold block mb-4">
          Countdown to Our Big Day
        </span>

        {/* Digits Display */}
        {mounted ? (
          <div className="flex items-center justify-center gap-1 sm:gap-2 my-2">
            {/* Days */}
            <div className="flex flex-col items-center min-w-[58px]">
              <span className="font-playfair text-2xl sm:text-3xl font-bold tracking-tight text-[#FFFFFF]">
                {timeLeft.days}
              </span>
              <span className="text-[9px] font-sans uppercase tracking-widest text-[#E5C67C]/80 mt-1 font-semibold">
                Days
              </span>
            </div>

            <span className="text-xl sm:text-2xl text-[#E5C67C] font-light mb-3 select-none">
              :
            </span>

            {/* Hours */}
            <div className="flex flex-col items-center min-w-[50px]">
              <span className="font-playfair text-2xl sm:text-3xl font-bold tracking-tight text-[#FFFFFF]">
                {format2Digits(timeLeft.hours)}
              </span>
              <span className="text-[9px] font-sans uppercase tracking-widest text-[#E5C67C]/80 mt-1 font-semibold">
                Hours
              </span>
            </div>

            <span className="text-xl sm:text-2xl text-[#E5C67C] font-light mb-3 select-none">
              :
            </span>

            {/* Minutes */}
            <div className="flex flex-col items-center min-w-[50px]">
              <span className="font-playfair text-2xl sm:text-3xl font-bold tracking-tight text-[#FFFFFF]">
                {format2Digits(timeLeft.minutes)}
              </span>
              <span className="text-[9px] font-sans uppercase tracking-widest text-[#E5C67C]/80 mt-1 font-semibold">
                Minutes
              </span>
            </div>

            <span className="text-xl sm:text-2xl text-[#E5C67C] font-light mb-3 select-none">
              :
            </span>

            {/* Seconds */}
            <div className="flex flex-col items-center min-w-[50px]">
              <span className="font-playfair text-2xl sm:text-3xl font-bold tracking-tight text-[#E5C67C]">
                {format2Digits(timeLeft.seconds)}
              </span>
              <span className="text-[9px] font-sans uppercase tracking-widest text-[#E5C67C]/80 mt-1 font-semibold">
                Seconds
              </span>
            </div>
          </div>
        ) : (
          <div className="py-4 text-xs font-serif text-[#E5C67C]">
            Calculating countdown...
          </div>
        )}

        {/* Flourish Divider */}
        <div className="flex items-center justify-center gap-2 mt-4 pt-3 border-t border-white/10">
          <span className="w-8 h-px bg-[#C49A43]/50" />
          <span className="text-[10px] font-serif italic text-white/70">
            21 November 2026
          </span>
          <span className="w-8 h-px bg-[#C49A43]/50" />
        </div>
      </motion.div>
    </section>
  );
};

