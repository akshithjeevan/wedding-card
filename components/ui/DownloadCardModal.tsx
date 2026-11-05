"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Download,
  Printer,
  Share2,
  FileText,
  Sparkles,
  Check,
  Eye,
} from "lucide-react";
import { weddingData } from "@/data/wedding";

interface DownloadCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadCardModal: React.FC<DownloadCardModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [downloadedImage, setDownloadedImage] = useState(false);

  const cardImagePath = "/images/wedding-invitation-card.jpg";

  // 1-Click High-Res Image Download
  const handleDownloadImage = () => {
    const link = document.createElement("a");
    link.href = cardImagePath;
    link.download = "Vishnuraj-T-and-Josly-Merin-Wedding-Invitation.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadedImage(true);
    setTimeout(() => setDownloadedImage(false), 3000);
  };

  // 1-Click Printable / PDF dialog
  const handlePrintPDF = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      // Fallback: trigger normal download if popup blocked
      handleDownloadImage();
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Vishnuraj T. &amp; Josly Merin - Wedding Invitation</title>
          <style>
            @page {
              size: A4 portrait;
              margin: 8mm;
            }
            * { box-sizing: border-box; }
            html, body {
              margin: 0;
              padding: 0;
              width: 100%;
              height: 100%;
              background: #ffffff;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .card-wrapper {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 100%;
              height: 100%;
            }
            img {
              max-width: 96%;
              max-height: 96vh;
              width: auto;
              height: auto;
              display: block;
              margin: auto;
              object-fit: contain;
            }
            @media print {
              html, body {
                background: transparent;
                height: 100%;
              }
              img {
                max-height: 98vh;
              }
            }
          </style>
        </head>
        <body>
          <div class="card-wrapper">
            <img 
              src="${cardImagePath}" 
              alt="Vishnuraj &amp; Josly Wedding Invitation" 
              onload="setTimeout(function(){ window.focus(); window.print(); }, 250);" 
            />
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Share via WhatsApp
  const handleShareWhatsApp = () => {
    const text = `${weddingData.share.whatsappMessage}\n\nDigital Invitation: ${
      typeof window !== "undefined" ? window.location.href : ""
    }`;
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/65 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
            className="relative w-full max-w-lg bg-[#FFFDF9] rounded-3xl border-2 border-[#C49A43]/60 shadow-[0_20px_60px_rgba(0,0,0,0.3)] overflow-hidden z-10 my-auto"
          >
            {/* Top Gold Ribbon Accent */}
            <div className="h-2 bg-gradient-to-r from-[#C49A43] via-[#E5C67C] to-[#C49A43]" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#123D25]/10 hover:bg-[#123D25]/20 text-[#123D25] flex items-center justify-center transition-colors cursor-pointer z-20"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Body */}
            <div className="p-5 sm:p-7 flex flex-col items-center text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#123D25]/10 border border-[#C49A43]/40 text-[#123D25] text-[11px] uppercase tracking-[0.2em] font-serif font-semibold mb-2">
                <Sparkles className="w-3 h-3 text-[#C49A43]" />
                <span>Official Invitation Card</span>
              </div>

              <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-[#123D25]">
                Download Invitation
              </h3>
              <p className="text-xs sm:text-sm font-serif text-[#76685A] mt-1 max-w-sm">
                Save the high-resolution invitation card for printing or sharing on WhatsApp status &amp; social media.
              </p>

              {/* Card Preview Frame */}
              <div className="relative mt-4 mb-5 max-w-[260px] sm:max-w-[280px] rounded-2xl overflow-hidden border-2 border-[#C49A43]/50 shadow-[0_10px_25px_rgba(18,61,37,0.15)] group bg-[#FAF3E8]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cardImagePath}
                  alt="Vishnuraj & Josly Wedding Invitation Card"
                  className="w-full h-auto object-contain block transition-transform duration-300 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-3">
                  <span className="text-[11px] font-sans text-white font-medium bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-xs flex items-center gap-1">
                    <Eye className="w-3 h-3" /> Ready for Print &amp; Status
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full flex flex-col gap-2.5">
                {/* 1. Download High-Res Image Button */}
                <button
                  onClick={handleDownloadImage}
                  className="w-full py-3.5 px-5 rounded-full bg-gradient-to-r from-[#123D25] via-[#1a4e32] to-[#123D25] text-[#FFF9ED] font-serif font-semibold text-sm tracking-wide border border-[#C49A43] shadow-[0_6px_20px_rgba(18,61,37,0.3)] hover:scale-[1.02] hover:shadow-[0_8px_25px_rgba(18,61,37,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {downloadedImage ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Card Saved to Downloads!</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-[#E5C67C]" />
                      <span>Download HD Card (Image)</span>
                    </>
                  )}
                </button>

                {/* 2. Print / Save as PDF Button */}
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={handlePrintPDF}
                    className="py-2.5 px-3 rounded-full bg-[#FFFDF9] text-[#123D25] font-serif text-xs font-semibold border border-[#C49A43]/60 shadow-sm hover:bg-[#F6ECE0] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5 text-[#C49A43]" />
                    <span>Print / PDF</span>
                  </button>

                  <button
                    onClick={handleShareWhatsApp}
                    className="py-2.5 px-3 rounded-full bg-[#FFFDF9] text-[#123D25] font-serif text-xs font-semibold border border-[#C49A43]/60 shadow-sm hover:bg-[#F6ECE0] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* Helpful Hint */}
              <p className="text-[11px] font-serif text-[#76685A] mt-4">
                Tip: Use <strong>Print / PDF</strong> to save as a standard A4 sheet ready for home printing.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
