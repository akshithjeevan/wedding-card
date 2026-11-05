"use client";

import React from "react";
import { motion } from "framer-motion";
import { Car, Clock, Sparkles, UtensilsCrossed, Camera, Heart } from "lucide-react";
import { weddingData } from "@/data/wedding";

export const WeddingProgramTimeline: React.FC = () => {
  const events = [
    {
      time: weddingData.schedule.departureTime,
      period: "AM",
      title: "Groom's Departure",
      location: "Madayil House, Vaikom",
      description: "Groom starts from family residence with family & elders.",
      icon: Car,
    },
    {
      time: "11:45 AM - 12:00 PM",
      period: "NOON",
      title: "Auspicious Muhurtham",
      location: "Chiramel Auditorium",
      description: "Tying of the sacred Thali & exchange of garlands.",
      icon: Heart,
      highlight: true,
    },
    {
      time: "12:15 PM",
      period: "ONWARDS",
      title: "Traditional Wedding Sadhya",
      location: "Auditorium Dining Hall",
      description: "Authentic Kerala festive grand feast served on plantain leaves.",
      icon: UtensilsCrossed,
    },
    {
      time: "01:00 PM",
      period: "ONWARDS",
      title: "Reception & Family Photos",
      location: "Main Stage",
      description: "Bless the newly married couple & capture joyful memories.",
      icon: Camera,
    },
  ];

  return (
    <section id="program" className="w-full py-8 px-4 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-sm flex flex-col items-center text-center"
      >
        <span className="font-serif text-xs uppercase tracking-[0.3em] text-[#704863] font-semibold">
          Schedule of Celebrations
        </span>
        <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-[#3D182E] mt-1 mb-6">
          Wedding Program
        </h3>

        {/* Vertical Timeline Card */}
        <div className="w-full bg-[#FFFFFF] rounded-2xl p-6 border border-[#E8DFD8] shadow-[0_4px_20px_rgba(61,24,46,0.06)] relative text-left">
          {/* Vertical Guide Line */}
          <div className="absolute left-[38px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#C49A43] via-[#704863]/40 to-[#C49A43]" />

          <div className="space-y-6 relative">
            {events.map((evt, idx) => {
              const Icon = evt.icon;
              return (
                <div key={idx} className="flex items-start gap-4 relative group">
                  {/* Timeline Node Icon */}
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border z-10 transition-transform group-hover:scale-110 ${
                      evt.highlight
                        ? "bg-[#3D182E] text-[#FFF7EE] border-[#C49A43] shadow-[0_0_12px_rgba(196,154,67,0.4)]"
                        : "bg-[#FFFDF9] text-[#704863] border-[#D9C9C0]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Event Details */}
                  <div className="flex-1 pt-0.5">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#C49A43]">
                        {evt.time}
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-sm sm:text-base text-[#3D182E] mt-0.5">
                      {evt.title}
                    </h4>
                    <p className="text-[11px] font-serif text-[#704863] font-medium">
                      {evt.location}
                    </p>
                    <p className="text-[11px] font-serif text-[#8C7A87] mt-0.5 leading-relaxed">
                      {evt.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dress Code Callout Card at Bottom of Program */}
          <div className="mt-6 pt-4 border-t border-[#EFE6E0] flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#FAF4F0] text-[#704863] flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-[#C49A43]" />
            </div>
            <div className="text-left">
              <span className="text-[10px] font-sans uppercase tracking-widest text-[#704863] font-semibold block">
                Dress Code
              </span>
              <p className="text-xs font-serif text-[#3D182E] font-medium">
                Traditional Kerala Ethnic / Kasavu &amp; Festive Formals
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
