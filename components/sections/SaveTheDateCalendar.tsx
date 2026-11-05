"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Heart, Plus } from "lucide-react";
import { weddingData } from "@/data/wedding";

export const SaveTheDateCalendar: React.FC = () => {
  // November 2026 calendar layout:
  // Nov 1, 2026 is Sunday (day index 0)
  // Total days in Nov 2026 = 30
  const daysInMonth = 30;
  const startDayOffset = 0; // Sunday is 0
  const weddingDay = 21; // Nov 21, 2026

  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < startDayOffset; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    weddingData.share.calendar.title
  )}&dates=${weddingData.share.calendar.startTime}/${
    weddingData.share.calendar.endTime
  }&details=${encodeURIComponent(
    weddingData.share.calendar.description
  )}&location=${encodeURIComponent(weddingData.share.calendar.location)}`;

  return (
    <section id="calendar" className="w-full py-8 px-4 flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-sm flex flex-col items-center"
      >
        {/* Save the Date Script Header */}
        <span className="font-script text-3xl sm:text-4xl text-[#3D182E] font-normal tracking-wide">
          Save the Date
        </span>

        {/* Month Label */}
        <h3 className="font-serif text-xs uppercase tracking-[0.35em] text-[#704863] font-semibold mt-1 mb-5">
          November 2026
        </h3>

        {/* Calendar Card Frame */}
        <div className="w-full bg-[#FFFFFF] rounded-2xl p-5 border border-[#E8DFD8] shadow-[0_4px_20px_rgba(61,24,46,0.06)] relative overflow-hidden">
          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-1 mb-3">
            {daysOfWeek.map((day, idx) => (
              <div
                key={idx}
                className="text-[11px] font-sans font-semibold text-[#8C7A87] uppercase tracking-wider text-center"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Dates Grid */}
          <div className="grid grid-cols-7 gap-y-2 gap-x-1">
            {calendarDays.map((day, idx) => {
              if (day === null) {
                return <div key={idx} className="h-8" />;
              }

              const isWeddingDay = day === weddingDay;

              return (
                <div
                  key={idx}
                  className="h-8 flex items-center justify-center relative select-none"
                >
                  {isWeddingDay ? (
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      className="relative w-8 h-8 rounded-full bg-[#3D182E] text-[#FFF7EE] flex items-center justify-center font-serif text-sm font-bold shadow-[0_2px_10px_rgba(61,24,46,0.35)] cursor-pointer"
                      title="Wedding Day: 21 November 2026"
                    >
                      <span>{day}</span>
                      {/* Heart Indicator Badge */}
                      <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#C49A43] text-white rounded-full flex items-center justify-center shadow-xs">
                        <Heart className="w-2 h-2 fill-white text-white" />
                      </div>
                    </motion.div>
                  ) : (
                    <span className="font-serif text-xs text-[#4A3B45] hover:text-[#3D182E] transition-colors">
                      {day}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Subtle Divider */}
          <div className="w-full h-px bg-[#EFE6E0] my-4" />

          {/* Featured Highlight for 21 November */}
          <div className="flex flex-col items-center">
            <span className="font-serif text-xs uppercase tracking-widest text-[#C49A43] font-semibold">
              Saturday
            </span>
            <span className="font-script text-4xl text-[#3D182E] my-1">
              21 November
            </span>
            <span className="text-[11px] font-serif text-[#7A6A76] italic">
              (1202 Vrischikam 5) • 11:45 AM - 12:00 Noon
            </span>
            <span className="text-[11px] font-sans font-medium text-[#3D182E] mt-1">
              Chiramel Auditorium, Vaikom
            </span>

            {/* Quick Add to Calendar Button */}
            <a
              href={gcalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FAF4F0] hover:bg-[#3D182E] text-[#3D182E] hover:text-[#FFF7EE] border border-[#D9C9C0] hover:border-[#3D182E] text-xs font-serif font-medium transition-all shadow-2xs group cursor-pointer"
            >
              <CalendarIcon className="w-3.5 h-3.5 text-[#C49A43] group-hover:text-[#FFF7EE]" />
              <span>Add to Google Calendar</span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
