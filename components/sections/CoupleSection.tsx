"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FloralCorner } from "@/components/decorations/FloralCorner";
import { GoldDivider } from "@/components/decorations/GoldDivider";
import { weddingData } from "@/data/wedding";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";

export const CoupleSection: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const couplePhotos = [
    {
      src: "/images/couple-1.png",
      alt: "Vishnuraj T. & Josly Merin - Festive Portrait",
      caption: "Two souls, one destiny",
    },
    {
      src: "/images/couple-2.png",
      alt: "Vishnuraj T. & Josly Merin - Romantic Portrait",
      caption: "Together in smile and grace",
    },
    {
      src: "/images/couple-3.png",
      alt: "Vishnuraj T. & Josly Merin - Tender Portrait",
      caption: "Beginning of forever",
    },
  ];

  // Automatic slideshow timer
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActivePhoto((prev) => (prev + 1) % couplePhotos.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, couplePhotos.length]);

  const nextPhoto = () => {
    setActivePhoto((prev) => (prev + 1) % couplePhotos.length);
  };

  const prevPhoto = () => {
    setActivePhoto((prev) => (prev - 1 + couplePhotos.length) % couplePhotos.length);
  };

  return (
    <section
      id="couple"
      className="relative py-20 px-4 overflow-hidden bg-gradient-to-b from-[#FFF9ED] via-[#F8EFE0] to-[#FFF9ED]"
    >
      <FloralCorner position="top-right" size={180} />
      <FloralCorner position="bottom-left" size={180} />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-20">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-[#C49A43] font-serif font-medium">
            Union of Two Hearts
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-semibold text-[#123D25] mt-1">
            The Couple
          </h2>
          <GoldDivider width={180} variant="flourish" className="mx-auto mt-2" />
        </motion.div>

        {/* Real Couple Photography Showcase Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative w-full max-w-md sm:max-w-lg mb-10 group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Ornate Gold Outer Border Frame */}
          <div className="relative p-3 sm:p-4 rounded-3xl bg-gradient-to-b from-[#FDF6E8] to-[#F2E5CE] border-2 border-[#C49A43] shadow-[0_12px_40px_rgba(196,154,67,0.2)]">
            {/* Fine Inner Accent Border */}
            <div
              style={{ position: "relative" }}
              className="relative rounded-2xl overflow-hidden border border-[#C49A43]/50 aspect-[4/5] bg-[#EADBCE]"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePhoto}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={couplePhotos[activePhoto].src}
                    alt={couplePhotos[activePhoto].alt}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover object-top"
                  />

                  {/* Subtle Warm Gradient Overlay at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#123D25]/75 via-[#123D25]/35 to-transparent flex items-end justify-center pb-3">
                    <motion.p
                      key={`caption-${activePhoto}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.15 }}
                      className="text-xs sm:text-sm font-serif italic text-[#FFF9ED] drop-shadow-md px-4 text-center"
                    >
                      {couplePhotos[activePhoto].caption}
                    </motion.p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Prev Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prevPhoto();
                }}
                aria-label="Previous photo"
                className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#123D25]/60 hover:bg-[#123D25]/90 text-[#FFF9ED] border border-[#C49A43]/60 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-110 backdrop-blur-sm shadow-md"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  nextPhoto();
                }}
                aria-label="Next photo"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#123D25]/60 hover:bg-[#123D25]/90 text-[#FFF9ED] border border-[#C49A43]/60 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-110 backdrop-blur-sm shadow-md"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Corner Gold Leaf Accents */}
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-[#C49A43] rounded-tl-lg pointer-events-none" />
            <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-[#C49A43] rounded-tr-lg pointer-events-none" />
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-[#C49A43] rounded-bl-lg pointer-events-none" />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-[#C49A43] rounded-br-lg pointer-events-none" />
          </div>

          {/* Photo Gallery Selector Thumbnails */}
          <div className="flex items-center justify-center gap-3 mt-4">
            {couplePhotos.map((photo, index) => (
              <button
                key={index}
                onClick={() => setActivePhoto(index)}
                aria-label={`View photo ${index + 1}`}
                style={{ position: "relative" }}
                className={`w-12 h-14 sm:w-14 sm:h-16 rounded-xl overflow-hidden border-2 transition-all relative ${
                  activePhoto === index
                    ? "border-[#700D20] ring-2 ring-[#C49A43]/60 scale-105 shadow-md"
                    : "border-[#C49A43]/40 opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="60px"
                  className="object-cover object-top"
                />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Names & Family Lineage Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-xl space-y-4"
        >
          {/* Groom Details */}
          <div>
            <h3 className="text-4xl sm:text-5xl font-script text-[#700D20] tracking-wide">
              {weddingData.couple.groom.fullName}
            </h3>
            <p className="text-xs sm:text-sm font-serif italic text-[#76685A] mt-1">
              {weddingData.couple.groom.description}
            </p>
          </div>

          {/* Golden Heart Connector */}
          <div className="flex items-center justify-center gap-3 py-1">
            <span className="w-16 h-px bg-[#C49A43]/40" />
            <span className="p-1.5 rounded-full border border-[#C49A43]/60 bg-[#FFF9ED] text-[#C49A43]">
              <Heart className="w-3.5 h-3.5 fill-[#C49A43]" />
            </span>
            <span className="w-16 h-px bg-[#C49A43]/40" />
          </div>

          {/* Bride Details */}
          <div>
            <h3 className="text-4xl sm:text-5xl font-script text-[#700D20] tracking-wide">
              {weddingData.couple.bride.fullName}
            </h3>
            <div className="mt-2 text-xs sm:text-sm font-serif text-[#2F261F]/90 leading-relaxed px-4">
              <p className="font-medium text-[#123D25]">
                {weddingData.couple.bride.parents}
              </p>
              <p className="text-[#76685A] italic mt-0.5">
                {weddingData.couple.bride.address}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

