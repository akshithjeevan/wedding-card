"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Share2, Calendar, Link2, Phone, Check } from "lucide-react";
import { GoldDivider } from "@/components/decorations/GoldDivider";
import { weddingData } from "@/data/wedding";

interface SkeuomorphicTheme {
  id: string;
  gradient: string;
  glow: string;
  bezel: string;
  iconColor: string;
  iconShadow: string;
  textHoverColor: string;
}

const SKEUOMORPHIC_THEMES: Record<string, SkeuomorphicTheme> = {
  whatsapp: {
    id: "whatsapp",
    // Deep emerald jewel dome with 3D metallic gold trim
    gradient: "radial-gradient(circle at 35% 28%, #2A8550 0%, #15472B 55%, #082614 100%)",
    glow: "radial-gradient(circle, rgba(42, 133, 80, 0.45) 0%, rgba(18, 61, 37, 0.15) 60%, transparent 100%)",
    bezel: "linear-gradient(135deg, #FFF1B8 0%, #E5C67C 30%, #C49A43 70%, #704E10 100%)",
    iconColor: "#FFF2CC",
    iconShadow:
      "drop-shadow(0 2px 3px rgba(0, 0, 0, 0.8)) drop-shadow(0 -0.5px 0.5px rgba(255, 245, 180, 0.6))",
    textHoverColor: "group-hover:text-[#123D25]",
  },
  calendar: {
    id: "calendar",
    // Royal ruby / burgundy jewel dome with gold trim
    gradient: "radial-gradient(circle at 35% 28%, #A81D38 0%, #700D20 55%, #3D0510 100%)",
    glow: "radial-gradient(circle, rgba(168, 29, 56, 0.45) 0%, rgba(112, 13, 32, 0.15) 60%, transparent 100%)",
    bezel: "linear-gradient(135deg, #FFF1B8 0%, #E5C67C 30%, #C49A43 70%, #704E10 100%)",
    iconColor: "#FFF2CC",
    iconShadow:
      "drop-shadow(0 2px 3px rgba(0, 0, 0, 0.8)) drop-shadow(0 -0.5px 0.5px rgba(255, 245, 180, 0.6))",
    textHoverColor: "group-hover:text-[#700D20]",
  },
  copylink: {
    id: "copylink",
    // Minted solid gold medallion with engraved bronze icon
    gradient: "radial-gradient(circle at 35% 28%, #FFF5D0 0%, #E5C67C 35%, #C49A43 70%, #7A5714 100%)",
    glow: "radial-gradient(circle, rgba(229, 198, 124, 0.55) 0%, rgba(196, 154, 67, 0.2) 60%, transparent 100%)",
    bezel: "linear-gradient(135deg, #FFFFFF 0%, #E5C67C 30%, #9E7420 70%, #52380A 100%)",
    iconColor: "#4A2B03",
    iconShadow:
      "drop-shadow(0 1px 1px rgba(255, 255, 255, 0.9)) drop-shadow(0 -1px 1px rgba(0, 0, 0, 0.7))",
    textHoverColor: "group-hover:text-[#9E7420]",
  },
  call: {
    id: "call",
    // Deep forest green enamel with brass trim
    gradient: "radial-gradient(circle at 35% 28%, #1E663B 0%, #0F3B20 55%, #051A0D 100%)",
    glow: "radial-gradient(circle, rgba(30, 102, 59, 0.45) 0%, rgba(15, 59, 32, 0.15) 60%, transparent 100%)",
    bezel: "linear-gradient(135deg, #FFF1B8 0%, #E5C67C 30%, #C49A43 70%, #704E10 100%)",
    iconColor: "#FFF2CC",
    iconShadow:
      "drop-shadow(0 2px 3px rgba(0, 0, 0, 0.8)) drop-shadow(0 -0.5px 0.5px rgba(255, 245, 180, 0.6))",
    textHoverColor: "group-hover:text-[#0F3B20]",
  },
};

export const ShareSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleShareWhatsApp = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = `${weddingData.share.whatsappMessage}\n\nDigital Invitation: ${url}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleCallFamily = () => {
    const primaryPhone = weddingData.family.phoneNumbers[0].raw;
    window.location.href = `tel:${primaryPhone}`;
  };

  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    weddingData.share.calendar.title
  )}&dates=${weddingData.share.calendar.startTime}/${
    weddingData.share.calendar.endTime
  }&details=${encodeURIComponent(
    weddingData.share.calendar.description
  )}&location=${encodeURIComponent(weddingData.share.calendar.location)}`;

  const actions = [
    {
      name: "WhatsApp",
      icon: Share2,
      onClick: handleShareWhatsApp,
      description: "Send on WhatsApp",
      theme: SKEUOMORPHIC_THEMES.whatsapp,
    },
    {
      name: "Add to Calendar",
      icon: Calendar,
      href: gcalUrl,
      description: "Google Calendar",
      theme: SKEUOMORPHIC_THEMES.calendar,
    },
    {
      name: copied ? "Copied!" : "Copy Link",
      icon: copied ? Check : Link2,
      onClick: handleCopyLink,
      description: "Share website URL",
      active: copied,
      theme: SKEUOMORPHIC_THEMES.copylink,
    },
    {
      name: "Call Family",
      icon: Phone,
      onClick: handleCallFamily,
      description: "Direct dial",
      theme: SKEUOMORPHIC_THEMES.call,
    },
  ];

  return (
    <section id="share" className="relative py-16 px-4 bg-[#FFF9ED] text-center">
      <div className="max-w-2xl mx-auto flex flex-col items-center relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-[#C49A43] font-serif font-medium">
            Spread The Joy
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-playfair font-semibold text-[#123D25] mt-1">
            Share the Invitation
          </h2>
          <GoldDivider width={160} variant="diamond" className="mx-auto mt-2" />
        </motion.div>

        {/* Skeuomorphic Circular 3D Icon Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 w-full max-w-lg">
          {actions.map((item, idx) => {
            const Icon = item.icon;
            const theme = item.theme;

            const buttonElement = (
              <div className="flex flex-col items-center group cursor-pointer">
                {/* 3D Skeuomorphic Button Container */}
                <motion.div
                  whileHover={{ scale: 1.1, y: -4 }}
                  whileTap={{ scale: 0.94, y: 2 }}
                  transition={{ type: "spring", stiffness: 450, damping: 22 }}
                  className="relative w-16 h-16 sm:w-16 sm:h-16 rounded-full flex items-center justify-center select-none"
                >
                  {/* Ambient Halo Glow on Hover */}
                  <div
                    className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md pointer-events-none"
                    style={{ background: theme.glow }}
                  />

                  {/* Outer 3D Metallic Gold Bezel */}
                  <div
                    className="absolute inset-0 rounded-full p-[2.5px] transition-all duration-300"
                    style={{
                      background: theme.bezel,
                      boxShadow:
                        "0 6px 14px -2px rgba(0, 0, 0, 0.12), inset 0 1.5px 2px rgba(255, 255, 255, 0.9), inset 0 -2px 3px rgba(0, 0, 0, 0.35)",
                    }}
                  >
                    {/* Inner Dome Face Container */}
                    <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                      {/* Resting Ivory Porcelain Surface */}
                      <div
                        className={`absolute inset-0 transition-opacity duration-300 ${
                          item.active ? "opacity-0" : "group-hover:opacity-0"
                        }`}
                        style={{
                          background:
                            "radial-gradient(circle at 35% 30%, #FFFDF8 0%, #F8EFE0 65%, #EADBCE 100%)",
                          boxShadow:
                            "inset 0 2px 3px rgba(255, 255, 255, 0.9), inset 0 -2px 3px rgba(196, 154, 67, 0.25)",
                        }}
                      />

                      {/* Skeuomorphic 3D Convex Dome on Hover (or Active) */}
                      <div
                        className={`absolute inset-0 transition-opacity duration-300 ${
                          item.active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        }`}
                        style={{
                          background: theme.gradient,
                          boxShadow:
                            "inset 0 3px 6px rgba(255, 255, 255, 0.45), inset 0 -4px 7px rgba(0, 0, 0, 0.55), 0 2px 4px rgba(0, 0, 0, 0.25)",
                        }}
                      />

                      {/* Top Specular Curved Glass Lens Reflection */}
                      <div
                        className={`absolute top-0 inset-x-1.5 h-1/2 rounded-t-full bg-gradient-to-b from-white/50 via-white/10 to-transparent pointer-events-none transition-opacity duration-300 ${
                          item.active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        }`}
                      />

                      {/* Fine Inner Stamped Hairline Ring */}
                      <div className="absolute inset-1.5 rounded-full border border-dashed border-[#C49A43]/40 group-hover:border-[#E5C67C]/50 transition-colors pointer-events-none" />

                      {/* Embossed / Debossed 3D Icon */}
                      <div className="relative z-10 transition-transform duration-300 group-hover:scale-105">
                        <Icon
                          className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 ${
                            item.active ? "text-[#FFF2CC]" : "text-[#700D20] group-hover:text-[#FFF2CC]"
                          }`}
                          style={{
                            color: item.active ? theme.iconColor : undefined,
                            filter: item.active
                              ? theme.iconShadow
                              : undefined,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Button Label & Sub-caption */}
                <span
                  className={`text-xs font-serif font-semibold text-[#123D25] mt-2.5 transition-colors ${theme.textHoverColor}`}
                >
                  {item.name}
                </span>
                <span className="text-[10px] font-sans text-[#76685A]">
                  {item.description}
                </span>
              </div>
            );

            return item.href ? (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline block"
              >
                {buttonElement}
              </a>
            ) : (
              <button
                key={idx}
                onClick={item.onClick}
                className="bg-transparent border-0 p-0 cursor-pointer block"
              >
                {buttonElement}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
