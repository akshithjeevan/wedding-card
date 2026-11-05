"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Share2, Calendar, Link2, Phone, Check, Download, FileText } from "lucide-react";
import { GoldDivider } from "@/components/decorations/GoldDivider";
import { weddingData } from "@/data/wedding";

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
    },
    {
      name: "Add to Calendar",
      icon: Calendar,
      href: gcalUrl,
      description: "Google Calendar",
    },
    {
      name: copied ? "Copied!" : "Copy Link",
      icon: copied ? Check : Link2,
      onClick: handleCopyLink,
      description: "Share website URL",
      active: copied,
    },
    {
      name: "Call Family",
      icon: Phone,
      onClick: handleCallFamily,
      description: "Direct dial",
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

        {/* Circular Gold Icon Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full max-w-lg">
          {actions.map((item, idx) => {
            const Icon = item.icon;
            const content = (
              <div className="flex flex-col items-center group cursor-pointer select-none">
                <motion.div
                  whileHover={{ scale: 1.08, y: -4 }}
                  whileTap={{ scale: 0.94, y: 2 }}
                  transition={{ type: "spring", stiffness: 450, damping: 20 }}
                  className={`skeuomorphic-btn w-14 h-14 rounded-full border-2 flex items-center justify-center overflow-hidden ${
                    item.active
                      ? "bg-[#123D25] text-[#E5C67C] border-[#E5C67C] scale-105 shadow-[inset_0_2px_3px_rgba(255,255,255,0.6),inset_0_-3px_4px_rgba(0,0,0,0.5)]"
                      : "bg-[#FFFDF8] text-[#700D20] border-[#C49A43]/70"
                  }`}
                >
                  {/* High-Gloss Specular Highlight Dome (Skeuomorphic Glass/Metallic) */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/45 via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-200 pointer-events-none" />

                  <Icon className="w-5 h-5 transition-transform duration-200 relative z-10" />
                </motion.div>
                <span className="text-xs font-serif font-semibold text-[#123D25] mt-2.5 group-hover:text-[#700D20] group-active:text-[#700D20] transition-colors">
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
                className="no-underline"
              >
                {content}
              </a>
            ) : (
              <button
                key={idx}
                onClick={item.onClick}
                className="bg-transparent border-0 p-0"
              >
                {content}
              </button>
            );
          })}
        </div>

        {/* 1-Click Printable / PDF Invitation Download Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-lg mt-10 p-5 rounded-2xl bg-gradient-to-r from-[#FFFDF8] via-[#FAF3E8] to-[#FFFDF8] border-2 border-[#C49A43]/50 shadow-[0_8px_25px_rgba(18,61,37,0.08)] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#123D25] text-[#E5C67C] border border-[#C49A43] flex items-center justify-center shrink-0 shadow-sm">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-playfair font-bold text-base text-[#123D25]">
                Printable &amp; Digital Card
              </h4>
              <p className="text-xs font-serif text-[#76685A]">
                Download high-res card or print as PDF for WhatsApp status &amp; framing
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("open-download-card"));
              }
            }}
            className="shrink-0 px-5 py-2.5 rounded-full bg-[#123D25] text-[#FFF9ED] font-serif text-xs font-semibold tracking-wide border border-[#C49A43] shadow-md hover:bg-[#0C321B] hover:scale-105 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-[#E5C67C]" />
            <span>Download Card</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

