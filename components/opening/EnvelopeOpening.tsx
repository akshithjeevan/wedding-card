"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VJMonogram } from "@/components/decorations/VJMonogram";
import { WaxSeal } from "@/components/decorations/WaxSeal";
import { FloralCorner } from "@/components/decorations/FloralCorner";
import { GoldDivider } from "@/components/decorations/GoldDivider";
import confetti from "canvas-confetti";

interface EnvelopeOpeningProps {
  onOpenComplete?: () => void;
  onOpenStart?: () => void;
}

export const EnvelopeOpening: React.FC<EnvelopeOpeningProps> = ({
  onOpenComplete,
  onOpenStart,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const handleOpen = () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);

    // Prime / start audio on user gesture so browser unlocks it
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("wedding-play-music"));
      const win = window as unknown as { __playWeddingMusic?: () => void };
      if (typeof win.__playWeddingMusic === "function") {
        win.__playWeddingMusic();
      }
    }

    setTimeout(() => {
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.5 },
        colors: ["#C49A43", "#E5C67C", "#700D20", "#FFFFFF"],
      });
    }, 600);

    setTimeout(() => {
      setIsOpen(true);
    }, 800);

    setTimeout(() => {
      setIsDismissed(true);
      // Ensure music is playing at full volume when the main invitation page appears
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("wedding-play-music"));
        const win = window as unknown as { __playWeddingMusic?: () => void };
        if (typeof win.__playWeddingMusic === "function") {
          win.__playWeddingMusic();
        }
      }
      if (onOpenComplete) onOpenComplete();
    }, 2800);
  };

  const handleSkip = () => {
    setIsDismissed(true);
    // Ensure music is playing when the main invitation page appears
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("wedding-play-music"));
      const win = window as unknown as { __playWeddingMusic?: () => void };
      if (typeof win.__playWeddingMusic === "function") {
        win.__playWeddingMusic();
      }
    }
    if (onOpenComplete) onOpenComplete();
  };

  if (isDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center min-h-screen bg-[#FFF9ED] paper-texture overflow-hidden px-4"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#FFF9ED",
        }}
      >
        {/* Four Corner Floral Arrangements */}
        <FloralCorner position="top-left" size={170} />
        <FloralCorner position="top-right" size={170} />
        <FloralCorner position="bottom-left" size={170} />
        <FloralCorner position="bottom-right" size={170} />

        {/* Ambient Warm Golden Glow */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none opacity-40"
          style={{
            position: "absolute",
            width: "500px",
            height: "500px",
            borderRadius: "9999px",
            filter: "blur(48px)",
            pointerEvents: "none",
            opacity: 0.4,
            background:
              "radial-gradient(circle, rgba(229,198,124,0.45) 0%, rgba(196,154,67,0.15) 60%, transparent 80%)",
          }}
        />

        {/* Center Intro Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center z-10 mb-6 sm:mb-8"
          style={{ position: "relative", zIndex: 10, textAlign: "center" }}
        >
          <VJMonogram size={95} glow className="mx-auto mb-2" />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-[#123D25] tracking-wide font-normal">
            You Are Cordially Invited
          </h2>
          <p className="text-xs sm:text-sm font-serif italic text-[#700D20] mt-1 tracking-wider">
            A Celebration of Love
          </p>
          <GoldDivider width={160} variant="diamond" className="mx-auto mt-2" />
        </motion.div>

        {/* 3D Realistic Envelope Container */}
        <div
          className="relative w-full max-w-[340px] sm:max-w-[420px] h-[240px] sm:h-[290px] z-10"
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "380px",
            height: "260px",
            perspective: "1200px",
            zIndex: 10,
          }}
        >
          {/* Back Pocket */}
          <div
            className="absolute inset-0 rounded-2xl bg-[#F5EBD8] border-2 border-[#C49A43]/50 shadow-2xl overflow-hidden"
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "16px",
              backgroundColor: "#F5EBD8",
              border: "2px solid rgba(196, 154, 67, 0.5)",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: "8px",
                border: "1px solid rgba(196, 154, 67, 0.3)",
                borderRadius: "12px",
              }}
            />
          </div>

          {/* Invitation Card that slides OUT */}
          <motion.div
            initial={{ y: 20, scale: 0.95 }}
            animate={
              isOpen
                ? {
                    y: -140,
                    scale: 1.05,
                    boxShadow: "0 25px 50px -12px rgba(112, 13, 32, 0.25)",
                  }
                : { y: 20, scale: 0.95 }
            }
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              left: "16px",
              right: "16px",
              top: "16px",
              height: "220px",
              backgroundColor: "#FFF9ED",
              borderRadius: "12px",
              border: "1px solid #C49A43",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              zIndex: 20,
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: "8px",
                border: "1px solid rgba(196, 154, 67, 0.4)",
                borderRadius: "8px",
                pointerEvents: "none",
              }}
            />

            <div style={{ position: "relative", zIndex: 10 }}>
              <span className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.25em] text-[#C49A43]">
                Wedding of
              </span>
              <h3 className="text-2xl sm:text-3xl font-script text-[#700D20] mt-1">
                Vishnuraj &amp; Josly
              </h3>
              <p className="text-[11px] sm:text-xs font-serif text-[#123D25] mt-1">
                Saturday, 21 November 2026
              </p>
              <p className="text-[10px] sm:text-[11px] font-sans text-[#76685A] mt-0.5">
                Chiramel Auditorium, Vaikom
              </p>
            </div>
          </motion.div>

          {/* Front Pocket Solid Base - ensures no white card seams show through */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "60%",
              backgroundColor: "#EFE3CD",
              borderBottomLeftRadius: "14px",
              borderBottomRightRadius: "14px",
              zIndex: 26,
              pointerEvents: "none",
            }}
          />

          {/* Left Envelope Flap Pocket */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 28,
              pointerEvents: "none",
              clipPath: "polygon(0 0, 50% 50%, 0 100%)",
              backgroundColor: "#E6D7BF",
              borderLeft: "1px solid rgba(196, 154, 67, 0.3)",
            }}
          />

          {/* Right Envelope Flap Pocket */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 28,
              pointerEvents: "none",
              clipPath: "polygon(100% 0, 50% 50%, 100% 100%)",
              backgroundColor: "#E6D7BF",
              borderRight: "1px solid rgba(196, 154, 67, 0.3)",
            }}
          />

          {/* Bottom Flap Pocket */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 29,
              pointerEvents: "none",
              clipPath: "polygon(0 100%, 50% 50%, 100% 100%)",
              backgroundColor: "#EFE3CD",
              borderBottom: "2px solid #C49A43",
              boxShadow: "0 -4px 15px rgba(0,0,0,0.06)",
            }}
          />

          {/* Deep Green Silk Ribbon */}
          <motion.div
            animate={isOpen ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              left: 0,
              right: 0,
              height: "44px",
              backgroundColor: "#123D25",
              borderTop: "1.5px solid #C49A43",
              borderBottom: "1.5px solid #C49A43",
              zIndex: 32,
              pointerEvents: "none",
              boxShadow: "0 4px 12px rgba(18, 61, 37, 0.25)",
            }}
          />

          {/* Top Flap - folds down seamlessly when closed, flips to the backside (zIndex: 10) when opened */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={isOpening || isOpen ? { rotateX: 180 } : { rotateX: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            style={{
              position: "absolute",
              inset: 0,
              height: "100%",
              backgroundColor: "#E8DCBF",
              borderTop: "2px solid #C49A43",
              transformOrigin: "top center",
              transformStyle: "preserve-3d",
              clipPath: "polygon(0 0, 100% 0, 50% 51%)",
              zIndex: isOpen ? 10 : 30,
              boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
            }}
          />

          {/* Round Gold Wax Seal - shifted left to visually center with VJ monogram and fold seam */}
          <motion.div
            initial={{ scale: 1, opacity: 1 }}
            animate={
              isOpening || isOpen
                ? { scale: 1.4, opacity: 0, rotate: 20 }
                : { scale: 1, opacity: 1, rotate: 0 }
            }
            transition={{ duration: 0.6 }}
            style={{
              position: "absolute",
              top: "calc(50% - 35px)",
              left: "calc(50% - 36px)",
              transform: "translate(-50%, -50%)",
              zIndex: 50,
              cursor: "pointer",
            }}
            onClick={handleOpen}
          >
            <WaxSeal size={76} interactive />
          </motion.div>
        </div>

        {/* Action Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            position: "relative",
            zIndex: 20,
            marginTop: "32px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleOpen}
            disabled={isOpening}
            style={{
              padding: "14px 32px",
              borderRadius: "9999px",
              backgroundColor: "#123D25",
              color: "#FFF9ED",
              border: "1px solid #C49A43",
              boxShadow: "0 8px 25px rgba(18,61,37,0.3)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "15px",
              fontFamily: "Lora, Georgia, serif",
            }}
          >
            <span>Open Invitation</span>
            <span style={{ color: "#E5C67C" }}>→</span>
          </motion.button>

          <button
            onClick={handleSkip}
            style={{
              background: "transparent",
              border: "none",
              color: "#76685A",
              fontSize: "12px",
              cursor: "pointer",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
            }}
          >
            Skip Animation
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
