"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Download,
  Printer,
  Smartphone,
  FileText,
  Sparkles,
  Check,
  Share2,
} from "lucide-react";
import { generateInvitationCard, CardFormat } from "@/lib/invitationCanvas";
import { weddingData } from "@/data/wedding";

interface InvitationCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InvitationCardModal: React.FC<InvitationCardModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [format, setFormat] = useState<CardFormat>("status");
  const [cardImage, setCardImage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Generate card preview whenever modal opens or format changes
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setLoading(true);

    generateInvitationCard(format)
      .then((dataUrl) => {
        if (isMounted) {
          setCardImage(dataUrl);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Card generation error:", err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, format]);

  // Handle PNG Image Download
  const handleDownloadImage = () => {
    if (!cardImage) return;

    const link = document.createElement("a");
    link.href = cardImage;
    const formatName = format === "status" ? "WhatsApp-Status" : "Print-Card";
    link.download = `Vishnuraj-Josly-Wedding-Invitation-${formatName}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  // Handle Print / Save as PDF
  const handlePrintPDF = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* 1. Modal Overlay & Card Generator */}
      <AnimatePresence>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#082012]/80 backdrop-blur-md transition-opacity"
          />

          {/* Modal Card Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-4xl max-h-[92vh] flex flex-col bg-gradient-to-b from-[#FFFDF9] via-[#FAF3E8] to-[#FFFDF9] rounded-3xl border-2 border-[#C49A43] shadow-[0_25px_60px_rgba(0,0,0,0.45)] overflow-hidden"
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#C49A43]/30 flex items-center justify-between bg-[#FFF9ED]/80 backdrop-blur-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#123D25] text-[#E5C67C] border border-[#C49A43] flex items-center justify-center shadow-sm">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-playfair font-bold text-[#123D25]">
                    Download Wedding Invitation
                  </h3>
                  <p className="text-xs font-serif text-[#76685A]">
                    High-resolution card for printing &amp; WhatsApp status
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-[#FFFDF9] text-[#700D20] border border-[#C49A43]/50 flex items-center justify-center hover:bg-[#700D20] hover:text-white transition-colors cursor-pointer shadow-sm"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Two-column layout on desktop */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Left Column: Live Card Preview */}
              <div className="md:col-span-7 flex flex-col items-center justify-center">
                <div className="relative max-h-[58vh] sm:max-h-[62vh] rounded-2xl overflow-hidden border-2 border-[#C49A43]/60 shadow-[0_12px_30px_rgba(18,61,37,0.2)] bg-[#FFFDF8] flex items-center justify-center">
                  {loading ? (
                    <div className="w-64 h-96 flex flex-col items-center justify-center gap-3 text-[#123D25]">
                      <div className="w-8 h-8 border-3 border-[#C49A43] border-t-transparent rounded-full animate-spin" />
                      <span className="text-xs font-serif text-[#76685A]">
                        Rendering high-res card...
                      </span>
                    </div>
                  ) : cardImage ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={cardImage}
                      alt="Wedding Invitation Card Preview"
                      className="max-h-[58vh] sm:max-h-[62vh] w-auto object-contain select-none shadow-sm"
                    />
                  ) : (
                    <div className="w-64 h-96 flex items-center justify-center text-xs font-serif text-[#76685A]">
                      Failed to load preview
                    </div>
                  )}
                </div>
                <span className="text-[11px] font-serif text-[#76685A] mt-2.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C49A43]" />
                  <span>High-definition Retina preview ({format === "status" ? "1080 × 1920" : "1200 × 1680"} px)</span>
                </span>
              </div>

              {/* Right Column: Format Selector & Download Options */}
              <div className="md:col-span-5 flex flex-col gap-5">
                {/* Format Options */}
                <div>
                  <label className="text-xs uppercase tracking-wider font-sans font-bold text-[#C49A43] block mb-2">
                    Select Card Format
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {/* Format 1: WhatsApp Status / Mobile */}
                    <button
                      type="button"
                      onClick={() => setFormat("status")}
                      className={`p-3.5 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                        format === "status"
                          ? "bg-[#123D25] text-[#FFF9ED] border-[#C49A43] shadow-md scale-[1.02]"
                          : "bg-[#FFFDF9] text-[#2F261F] border-[#C49A43]/40 hover:bg-[#F8EFE0]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Smartphone
                          className={`w-4 h-4 ${
                            format === "status" ? "text-[#E5C67C]" : "text-[#700D20]"
                          }`}
                        />
                        <span className="text-xs font-bold font-serif">WhatsApp Status</span>
                      </div>
                      <span
                        className={`text-[10px] ${
                          format === "status" ? "text-[#E5C67C]/90" : "text-[#76685A]"
                        }`}
                      >
                        9:16 Vertical Story
                      </span>
                    </button>

                    {/* Format 2: Printable Card / A5 */}
                    <button
                      type="button"
                      onClick={() => setFormat("print")}
                      className={`p-3.5 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                        format === "print"
                          ? "bg-[#123D25] text-[#FFF9ED] border-[#C49A43] shadow-md scale-[1.02]"
                          : "bg-[#FFFDF9] text-[#2F261F] border-[#C49A43]/40 hover:bg-[#F8EFE0]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <FileText
                          className={`w-4 h-4 ${
                            format === "print" ? "text-[#E5C67C]" : "text-[#700D20]"
                          }`}
                        />
                        <span className="text-xs font-bold font-serif">Print / A5 Card</span>
                      </div>
                      <span
                        className={`text-[10px] ${
                          format === "print" ? "text-[#E5C67C]/90" : "text-[#76685A]"
                        }`}
                      >
                        5:7 Standard Ratio
                      </span>
                    </button>
                  </div>
                </div>

                {/* Card Features List */}
                <div className="bg-[#FFF9ED] p-3.5 rounded-xl border border-[#C49A43]/30 text-xs font-serif text-[#665749] space-y-1.5">
                  <div className="flex items-center gap-2 text-[#123D25] font-semibold">
                    <Check className="w-3.5 h-3.5 text-[#C49A43]" />
                    <span>Kerala Traditional Gold Kasavu Frame</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#123D25] font-semibold">
                    <Check className="w-3.5 h-3.5 text-[#C49A43]" />
                    <span>Complete Muhurtham, Date &amp; Venue info</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#123D25] font-semibold">
                    <Check className="w-3.5 h-3.5 text-[#C49A43]" />
                    <span>Ready for printing or 1-tap WhatsApp sharing</span>
                  </div>
                </div>

                {/* 1-Click Action Buttons */}
                <div className="flex flex-col gap-3 pt-2">
                  {/* Button 1: Download High-Res PNG Image */}
                  <button
                    onClick={handleDownloadImage}
                    disabled={loading || !cardImage}
                    className="w-full py-3.5 px-5 rounded-full bg-gradient-to-r from-[#123D25] via-[#1C5A37] to-[#123D25] text-[#FFF9ED] font-serif font-bold text-sm tracking-wide border border-[#C49A43] shadow-[0_6px_20px_rgba(18,61,37,0.3)] hover:scale-[1.02] hover:shadow-[0_8px_25px_rgba(18,61,37,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {downloadSuccess ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-200">Downloaded to Your Device!</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 text-[#E5C67C]" />
                        <span>Download High-Res Image (PNG)</span>
                      </>
                    )}
                  </button>

                  {/* Button 2: Print / Save as PDF */}
                  <button
                    onClick={handlePrintPDF}
                    className="w-full py-3 px-5 rounded-full bg-[#FFFDF9] text-[#123D25] font-serif font-semibold text-xs tracking-wider border-2 border-[#C49A43]/70 shadow-sm hover:bg-[#F6ECE0] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Printer className="w-4 h-4 text-[#700D20]" />
                    <span>Print or Save as PDF (Vector)</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>

      {/* 2. Hidden Vector DOM Printable Portal (for browser window.print() / Save as PDF) */}
      <div id="printable-invitation-card-portal" className="hidden print:block">
        <div className="w-[148mm] min-h-[210mm] mx-auto p-8 bg-[#FFFDF8] border-4 border-[#C49A43] rounded-2xl relative text-center flex flex-col justify-between">
          {/* Inner gold frame */}
          <div className="absolute inset-2 border border-[#C49A43]/60 rounded-xl pointer-events-none" />

          {/* Top Monogram */}
          <div className="pt-4 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border-2 border-[#C49A43] bg-[#FFFDF8] flex items-center justify-center text-[#700D20] font-serif text-2xl font-bold mb-2">
              {weddingData.couple.monogram}
            </div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#C49A43] font-serif font-semibold">
              WEDDING INVITATION
            </span>
            <div className="w-32 h-0.5 bg-[#C49A43]/50 mx-auto my-2" />
            <p className="text-xs font-serif italic text-[#665749]">
              {weddingData.couple.invitationMessage}
            </p>
          </div>

          {/* Couple Names */}
          <div className="py-4">
            <h1 className="text-4xl font-serif text-[#700D20] font-bold">
              {weddingData.couple.groom.fullName}
            </h1>
            <p className="text-xs font-serif italic text-[#665749] mt-0.5">
              {weddingData.couple.groom.description}
            </p>

            <div className="text-sm font-serif italic text-[#C49A43] my-2">— with —</div>

            <h1 className="text-4xl font-serif text-[#700D20] font-bold">
              {weddingData.couple.bride.fullName}
            </h1>
            <p className="text-xs font-serif italic text-[#665749] mt-0.5">
              {weddingData.couple.bride.parents}
            </p>
            <p className="text-[11px] font-serif text-[#76685A]">
              {weddingData.couple.bride.address}
            </p>
          </div>

          {/* Date & Muhurtham Box */}
          <div className="p-4 rounded-xl border border-[#C49A43]/50 bg-[#FFF9ED] mx-4">
            <h2 className="text-base font-serif font-bold text-[#123D25]">
              {weddingData.schedule.dayOfWeek}, {weddingData.schedule.dateDisplay}
            </h2>
            <p className="text-xs font-serif text-[#C49A43] italic">
              ({weddingData.schedule.malayalamDate})
            </p>
            <p className="text-sm font-serif font-bold text-[#700D20] mt-1">
              Muhurtham: {weddingData.schedule.timeDisplay}
            </p>
            <div className="mt-2 pt-2 border-t border-[#C49A43]/30">
              <p className="text-xs font-serif font-bold text-[#123D25]">
                {weddingData.venue.name}
              </p>
              <p className="text-[11px] font-serif text-[#665749]">
                {weddingData.venue.fullAddress}
              </p>
            </div>
          </div>

          {/* Host & Regards */}
          <div className="pb-4 text-[11px] font-serif text-[#665749] space-y-1">
            <p className="text-xs font-bold text-[#123D25]">
              Cordially Invited By: {weddingData.family.hosts}
            </p>
            <p>{weddingData.family.address}</p>
            <p className="font-sans font-semibold text-[#700D20]">
              Ph: {weddingData.family.phoneNumbers.map((p) => p.display).join(" • ")}
            </p>
            <p className="text-[10px] italic text-[#76685A] pt-1">
              With Best Compliments: {weddingData.regards.join(" • ")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
