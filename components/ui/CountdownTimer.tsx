"use client";

import React, { useEffect, useState } from "react";
import { weddingData } from "@/data/wedding";
import confetti from "canvas-confetti";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isOver: boolean;
}

export const CountdownTimer: React.FC = () => {
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
    // Target date in IST (UTC+05:30)
    // 2026-11-21T11:45:00+05:30
    const targetTime = new Date(weddingData.schedule.targetIsoDateTime).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isOver: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isOver: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const triggerGoldConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#C49A43", "#E5C67C", "#700D20", "#FFFFFF", "#123D25"],
    });
  };

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  if (!mounted) {
    return (
      <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-lg mx-auto py-4">
        {["Days", "Hours", "Minutes", "Seconds"].map((label, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl bg-[#FFF9ED] border border-[#C49A43]/40 shadow-md"
          >
            <span className="text-2xl sm:text-4xl font-serif font-bold text-[#700D20]">
              --
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#76685A] mt-1 font-sans">
              {label}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (timeLeft.isOver) {
    return (
      <div className="text-center py-6 px-4 rounded-3xl bg-[#FFF9ED] border-2 border-[#C49A43] max-w-lg mx-auto shadow-xl">
        <h3 className="text-2xl sm:text-3xl font-serif text-[#123D25] font-bold mb-2">
          Today is the Day!
        </h3>
        <p className="text-[#700D20] text-lg font-serif italic mb-4">
          Let the celebration of Vishnuraj & Josly begin!
        </p>
        <button
          onClick={triggerGoldConfetti}
          className="px-6 py-2.5 rounded-full bg-[#123D25] text-[#E5C67C] font-serif border border-[#C49A43] hover:scale-105 transition-transform"
        >
          Celebrate with Gold Dust ✨
        </button>
      </div>
    );
  }

  const counters = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="grid grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
        {counters.map((item, idx) => (
          <div
            key={idx}
            className="relative flex flex-col items-center justify-center py-4 px-2 sm:py-6 sm:px-4 rounded-2xl bg-gradient-to-b from-[#FFFDF8] to-[#F5EBD8] border border-[#C49A43]/50 shadow-[0_6px_20px_rgba(196,154,67,0.12)] transition-transform duration-300 hover:-translate-y-1 group"
          >
            {/* Subtle inner corner gold accents */}
            <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 border-t border-l border-[#C49A43]/40" />
            <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 border-t border-r border-[#C49A43]/40" />
            <div className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 border-b border-l border-[#C49A43]/40" />
            <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 border-b border-r border-[#C49A43]/40" />

            <span className="text-3xl sm:text-5xl font-serif font-bold text-[#700D20] tracking-tight group-hover:scale-105 transition-transform">
              {formatNumber(item.value)}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#76685A] mt-1.5 font-medium font-sans">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

