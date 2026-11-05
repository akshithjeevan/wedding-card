"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Utensils,
  Sparkles,
  Info,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Layers,
  Heart,
} from "lucide-react";
import { GoldDivider } from "@/components/decorations/GoldDivider";
import { FloralCorner } from "@/components/decorations/FloralCorner";
import { sadhyaDishes, SadhyaDish } from "@/data/sadhya";

export const SadhyaSection: React.FC = () => {
  const [activeView, setActiveView] = useState<"leaf" | "card">("leaf");
  const [selectedDishId, setSelectedDishId] = useState<string>("parippu-ghee");

  const selectedDish =
    sadhyaDishes.find((d) => d.id === selectedDishId) || sadhyaDishes[0];
  const currentIndex = sadhyaDishes.findIndex((d) => d.id === selectedDish.id);

  const handlePrev = () => {
    const nextIdx = (currentIndex - 1 + sadhyaDishes.length) % sadhyaDishes.length;
    setSelectedDishId(sadhyaDishes[nextIdx].id);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % sadhyaDishes.length;
    setSelectedDishId(sadhyaDishes[nextIdx].id);
  };

  const courses = [
    {
      title: "Crunchy Starters & Relishes",
      malayalam: "ഉപ്പേരിയും അച്ചാറുകളും",
      dishes: sadhyaDishes.filter((d) => d.category === "crunchy"),
    },
    {
      title: "Traditional Feast Curries",
      malayalam: "വിഭവസമൃദ്ധമായ കറികൾ",
      dishes: sadhyaDishes.filter((d) => d.category === "curry"),
    },
    {
      title: "The Warm Mains & Gravies",
      malayalam: "ചോറും പ്രധാന വിഭവങ്ങളും",
      dishes: sadhyaDishes.filter((d) => d.category === "main"),
    },
    {
      title: "The Grand Payasam Finale",
      malayalam: "മധുര പായസങ്ങൾ",
      dishes: sadhyaDishes.filter((d) => d.category === "sweet"),
    },
  ];

  return (
    <section
      id="sadhya"
      className="relative py-20 px-4 overflow-hidden bg-gradient-to-b from-[#FFF9ED] via-[#F5ECE0] to-[#FFF9ED]"
    >
      <FloralCorner position="top-right" size={170} />
      <FloralCorner position="bottom-left" size={170} />

      <div className="max-w-5xl mx-auto flex flex-col items-center relative z-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#123D25]/10 border border-[#C49A43]/40 text-[#123D25] text-xs uppercase tracking-[0.25em] font-serif font-semibold mb-3">
            <Utensils className="w-3.5 h-3.5 text-[#C49A43]" />
            <span>Grand Wedding Feast</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-semibold text-[#123D25]">
            Traditional Kerala Sadhya
          </h2>

          <p className="font-serif italic text-base sm:text-lg text-[#700D20] mt-1">
            വിഭവസമൃദ്ധമായ വിവാഹ സദ്യ
          </p>

          <GoldDivider width={200} variant="flourish" className="mx-auto mt-2" />

          <p className="text-sm sm:text-base font-serif text-[#76685A] mt-3 leading-relaxed">
            Served with warm love on a fresh green plantain leaf (താല വാഴയില), our wedding feast
            celebrates timeless Kerala flavors cooked to culinary perfection.
          </p>
        </motion.div>

        {/* View Toggle Tabs */}
        <div className="flex items-center gap-2 p-1.5 rounded-full bg-[#FFFDF9] border border-[#C49A43]/50 shadow-sm mb-10">
          <button
            onClick={() => setActiveView("leaf")}
            className={`flex items-center gap-2 px-5 py-2 rounded-full font-serif text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeView === "leaf"
                ? "bg-[#123D25] text-[#FFF9ED] shadow-md"
                : "text-[#76685A] hover:text-[#123D25]"
            }`}
          >
            <span>🍃</span>
            <span>Interactive Banana Leaf</span>
          </button>

          <button
            onClick={() => setActiveView("card")}
            className={`flex items-center gap-2 px-5 py-2 rounded-full font-serif text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeView === "card"
                ? "bg-[#123D25] text-[#FFF9ED] shadow-md"
                : "text-[#76685A] hover:text-[#123D25]"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-[#C49A43]" />
            <span>Royal Gold Menu</span>
          </button>
        </div>

        {/* VIEW 1: INTERACTIVE BANANA LEAF */}
        {activeView === "leaf" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col items-center"
          >
            {/* Visual Banana Leaf Canvas Container */}
            <div className="w-full overflow-x-auto pb-4 pt-2 flex justify-center">
              <div
                className="relative w-[780px] sm:w-[860px] md:w-[940px] h-[340px] sm:h-[380px] md:h-[420px] rounded-[70px_130px_130px_70px] p-6 shadow-[0_20px_50px_rgba(20,60,30,0.22)] border-4 border-[#3D8C40]/50 shrink-0 select-none overflow-hidden"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 50%, #388E3C 0%, #2E7D32 50%, #1B5E20 100%)",
                }}
              >
                {/* Banana Leaf Ribs & Veins Effect */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    backgroundImage: `
                      linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px),
                      repeating-linear-gradient(45deg, transparent, transparent 18px, rgba(255,255,255,0.08) 18px, rgba(255,255,255,0.08) 20px)
                    `,
                    backgroundSize: "100% 100%, 40px 40px",
                  }}
                />

                {/* Central Leaf Midrib (Horizontal Stem through middle) */}
                <div className="absolute top-[48%] left-2 right-2 h-2.5 bg-gradient-to-r from-[#81C784]/60 via-[#A5D6A7]/80 to-[#81C784]/40 rounded-full shadow-inner pointer-events-none" />

                {/* Leaf orientation indicator (Narrow Tip pointing Left) */}
                <div className="absolute left-4 top-4 text-[10px] font-sans font-bold tracking-widest text-[#E8F5E9]/70 uppercase bg-black/20 px-2 py-0.5 rounded-full backdrop-blur-xs">
                  Tip (ഇലത്തുമ്പ്) ◀
                </div>

                {/* Center Rice Mound Illustration on Leaf */}
                <div className="absolute top-[52%] left-[34%] -translate-x-1/2 -translate-y-1/2 w-44 sm:w-52 h-28 sm:h-34 rounded-full bg-gradient-to-b from-[#FFFDF8]/90 via-[#F7EFE2]/95 to-[#EFE2D0]/90 border-2 border-[#E5C67C]/40 shadow-[0_8px_20px_rgba(0,0,0,0.2)] flex flex-col items-center justify-center pointer-events-none z-0">
                  <span className="text-xl">🍚</span>
                  <span className="text-xs font-serif font-bold text-[#123D25] tracking-wide mt-0.5">
                    Kerala Matta Rice
                  </span>
                  <span className="text-[10px] font-serif text-[#76685A] italic">
                    ചോറ്
                  </span>
                </div>

                {/* Interactive Dish Hotspots on the Leaf */}
                {sadhyaDishes.map((dish) => {
                  const isSelected = dish.id === selectedDish.id;
                  return (
                    <button
                      key={dish.id}
                      onClick={() => setSelectedDishId(dish.id)}
                      style={{
                        top: `${dish.leafPosition.top}%`,
                        left: `${dish.leafPosition.left}%`,
                      }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center group cursor-pointer transition-transform duration-200 ${
                        isSelected ? "scale-115 z-20" : "hover:scale-108"
                      }`}
                      aria-label={dish.name}
                    >
                      {/* Dish Avatar Plate */}
                      <div
                        className={`w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center text-base sm:text-lg border-2 shadow-md transition-all ${
                          isSelected
                            ? "bg-[#FFFDF9] border-[#FFD700] ring-4 ring-[#FFD700]/50 shadow-[0_0_15px_rgba(255,215,0,0.7)]"
                            : "bg-[#FFFDF8]/90 border-[#C49A43] group-hover:border-[#FFF9ED] group-hover:bg-[#FFFDF9]"
                        }`}
                      >
                        <span>{dish.icon}</span>
                      </div>

                      {/* Small Dish Label Pill */}
                      <div
                        className={`mt-1 px-2 py-0.5 rounded-full text-[10px] font-serif font-semibold whitespace-nowrap shadow-xs transition-colors ${
                          isSelected
                            ? "bg-[#123D25] text-[#FFD700] border border-[#FFD700]"
                            : "bg-black/55 text-white/95 group-hover:bg-black/75"
                        }`}
                      >
                        {dish.name.split(" ")[0]}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <p className="text-xs font-serif italic text-[#76685A] mt-2 mb-6 text-center">
              Tap any item on the banana leaf to discover its authentic recipe &amp; tradition!
            </p>

            {/* Selected Dish Presentation Card */}
            <motion.div
              key={selectedDish.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="w-full max-w-2xl bg-gradient-to-r from-[#FFFDF9] via-[#FAF3E8] to-[#FFFDF9] rounded-3xl p-6 sm:p-8 border-2 border-[#C49A43]/60 shadow-[0_12px_35px_rgba(18,61,37,0.12)] relative"
            >
              {/* Category pill & Navigation Header */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-[11px] font-sans font-bold text-[#C49A43] tracking-widest uppercase bg-[#C49A43]/15 px-3 py-1 rounded-full border border-[#C49A43]/30">
                  {selectedDish.courseTitle}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous dish"
                    className="w-8 h-8 rounded-full border border-[#C49A43]/50 flex items-center justify-center text-[#123D25] hover:bg-[#123D25] hover:text-[#FFF9ED] transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono font-bold text-[#76685A] px-2">
                    {currentIndex + 1} / {sadhyaDishes.length}
                  </span>
                  <button
                    onClick={handleNext}
                    aria-label="Next dish"
                    className="w-8 h-8 rounded-full border border-[#C49A43]/50 flex items-center justify-center text-[#123D25] hover:bg-[#123D25] hover:text-[#FFF9ED] transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Title & Malayalam name */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#123D25] text-white flex items-center justify-center text-2xl border border-[#C49A43] shadow-sm">
                    {selectedDish.icon}
                  </div>
                  <div>
                    <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-[#123D25]">
                      {selectedDish.name}
                    </h3>
                    <p className="font-serif italic text-sm text-[#700D20] font-semibold">
                      {selectedDish.malayalam}
                    </p>
                  </div>
                </div>

                {/* Taste Profile Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#123D25] text-[#E5C67C] text-xs font-serif self-start sm:self-center border border-[#C49A43]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{selectedDish.taste}</span>
                </div>
              </div>

              {/* Tagline & Description */}
              <p className="text-xs sm:text-sm font-serif font-bold text-[#C49A43] uppercase tracking-wider mb-2">
                — {selectedDish.tagline}
              </p>
              <p className="text-sm sm:text-base font-serif text-[#5C4D3E] leading-relaxed">
                {selectedDish.description}
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* VIEW 2: ROYAL GOLD MENU CARD */}
        {activeView === "card" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl space-y-8"
          >
            {courses.map((course, cIdx) => (
              <div
                key={cIdx}
                className="bg-[#FFFDF9]/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border-2 border-[#C49A43]/50 shadow-[0_10px_30px_rgba(18,61,37,0.08)]"
              >
                {/* Course Title Header */}
                <div className="text-center mb-6">
                  <span className="text-[11px] font-sans font-bold tracking-[0.25em] text-[#C49A43] uppercase">
                    Course {cIdx + 1}
                  </span>
                  <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-[#123D25] mt-0.5">
                    {course.title}
                  </h3>
                  <p className="font-serif italic text-sm text-[#700D20]">
                    {course.malayalam}
                  </p>
                  <GoldDivider width={130} variant="diamond" className="mx-auto mt-2" />
                </div>

                {/* Dish Cards in this Course */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.dishes.map((dish) => (
                    <div
                      key={dish.id}
                      className="p-4 rounded-2xl bg-[#FAF3E8]/80 border border-[#C49A43]/35 hover:border-[#123D25]/50 transition-all group flex items-start gap-3.5"
                    >
                      <div className="w-11 h-11 rounded-xl bg-[#FFFDF9] border border-[#C49A43] flex items-center justify-center text-xl shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                        {dish.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-playfair font-bold text-base text-[#123D25]">
                            {dish.name}
                          </h4>
                          <span className="text-[11px] font-serif text-[#700D20] font-semibold italic shrink-0">
                            {dish.malayalam}
                          </span>
                        </div>
                        <p className="text-xs font-serif text-[#C49A43] font-medium mt-0.5">
                          {dish.tagline}
                        </p>
                        <p className="text-xs font-serif text-[#665749] mt-1.5 leading-relaxed">
                          {dish.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Traditional Sadhya Etiquette & Cultural Secret Note */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-2xl mt-12 p-5 sm:p-6 rounded-2xl bg-[#123D25] text-[#FFF9ED] border border-[#C49A43] shadow-[0_8px_25px_rgba(18,61,37,0.25)] flex items-start gap-4"
        >
          <div className="w-10 h-10 rounded-full bg-[#E5C67C]/20 border border-[#E5C67C] flex items-center justify-center shrink-0 text-[#E5C67C]">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-playfair text-base sm:text-lg font-bold text-[#E5C67C]">
              Traditional Banana Leaf Etiquette (സദ്യ ചിട്ടകൾ)
            </h4>
            <p className="text-xs sm:text-sm font-serif text-[#FFF9ED]/90 mt-1 leading-relaxed">
              When enjoying a Kerala Sadhya, the tapered end of the banana leaf always points to the
              guest&apos;s left. At the end of the feast, folding the top half of the leaf toward you
              signifies sheer culinary bliss and sends heartfelt blessings to Vishnuraj &amp; Josly!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
