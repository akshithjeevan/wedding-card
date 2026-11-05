"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";

export const MobilePhotoCollage: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState(0);

  const photos = [
    {
      src: "/images/couple-1.png",
      caption: "Two souls, one destiny",
      date: "21 November 2026",
    },
    {
      src: "/images/couple-2.png",
      caption: "Together in smile & grace",
      date: "Beginning of forever",
    },
    {
      src: "/images/couple-3.png",
      caption: "Love, laughter & happily ever after",
      date: "Vishnuraj & Josly",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActivePhoto((prev) => (prev + 1) % photos.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [photos.length]);

  return (
    <section id="moments" className="w-full py-8 px-4 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-sm flex flex-col items-center text-center"
      >
        <span className="font-serif text-xs uppercase tracking-[0.3em] text-[#704863] font-semibold">
          Captured Moments
        </span>
        <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-[#3D182E] mt-1 mb-5">
          Vishnuraj &amp; Josly
        </h3>

        {/* Polaroid Presentation Card */}
        <div className="w-full bg-[#FFFFFF] rounded-2xl p-4 sm:p-5 border border-[#E8DFD8] shadow-[0_8px_30px_rgba(61,24,46,0.08)] relative">
          {/* Polaroid Frame */}
          <div className="bg-[#FAF7F5] rounded-xl p-3 pb-5 border border-[#E5DDD6] shadow-inner relative overflow-hidden">
            <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-[#EAE2DC]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePhoto}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={photos[activePhoto].src}
                    alt="Vishnuraj & Josly Portrait"
                    fill
                    className="object-cover object-top"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation dots */}
              <div className="absolute bottom-2.5 inset-x-0 flex items-center justify-center gap-1.5 z-10">
                {photos.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePhoto(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === activePhoto
                        ? "w-5 bg-white shadow-xs"
                        : "bg-white/60 hover:bg-white"
                    }`}
                    aria-label={`Go to photo ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Handwritten style caption under polaroid */}
            <div className="mt-3.5 flex flex-col items-center">
              <span className="font-script text-2xl text-[#3D182E] tracking-wide">
                {photos[activePhoto].caption}
              </span>
              <span className="text-[10px] font-serif uppercase tracking-widest text-[#C49A43] font-semibold mt-0.5">
                {photos[activePhoto].date}
              </span>
            </div>
          </div>

          {/* Envelope "We Can't Wait to Celebrate with You" Sticky Note Card */}
          <div className="mt-4 p-3.5 rounded-xl bg-gradient-to-r from-[#FAF4F0] to-[#F5ECE5] border border-[#E0D3CA] flex items-center justify-center gap-2 text-center">
            <Heart className="w-4 h-4 text-[#704863] fill-[#704863] shrink-0" />
            <span className="font-script text-xl text-[#3D182E]">
              We can&apos;t wait to celebrate with you!
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

