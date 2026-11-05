"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QRCode from "qrcode";
import {
  Camera,
  UploadCloud,
  QrCode as QrIcon,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  Download,
  Smartphone,
  Image as ImageIcon,
  Heart,
} from "lucide-react";
import { GoldDivider } from "@/components/decorations/GoldDivider";
import { FloralCorner } from "@/components/decorations/FloralCorner";
import { weddingData } from "@/data/wedding";

export const PhotoDropSection: React.FC = () => {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedTag, setCopiedTag] = useState(false);

  const { photoDrop } = weddingData;

  // Generate crisp QR code on mount
  useEffect(() => {
    QRCode.toDataURL(photoDrop.driveUrl, {
      width: 480,
      margin: 1.5,
      color: {
        dark: "#123D25",
        light: "#FFFDF9",
      },
      errorCorrectionLevel: "H",
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error("QR Code generation error:", err));
  }, [photoDrop.driveUrl]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(photoDrop.driveUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleCopyTag = async () => {
    try {
      await navigator.clipboard.writeText(photoDrop.hashtag);
      setCopiedTag(true);
      setTimeout(() => setCopiedTag(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleDownloadQR = () => {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = `Vishnuraj-Josly-Wedding-PhotoDrop-QR.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const steps = [
    {
      icon: Camera,
      num: "01",
      title: "Snap the Moments",
      description:
        "Capture candid smiles, stage rituals, laughter, selfies, and lively celebration clips throughout the day.",
    },
    {
      icon: QrIcon,
      num: "02",
      title: "Scan or Tap Upload",
      description:
        "Point your phone camera at the QR code, or tap the button to jump straight into our shared Google Drive folder.",
    },
    {
      icon: UploadCloud,
      num: "03",
      title: "Drop Raw Photos",
      description:
        "Upload directly from your photo gallery in full original resolution without messaging compression.",
    },
  ];

  return (
    <section
      id="photos"
      className="relative py-20 px-4 overflow-hidden bg-gradient-to-b from-[#FFF9ED] via-[#F8EFE2] to-[#FFF9ED]"
    >
      <FloralCorner position="top-left" size={170} />
      <FloralCorner position="bottom-right" size={170} />

      <div className="max-w-5xl mx-auto flex flex-col items-center relative z-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#123D25]/10 border border-[#C49A43]/40 text-[#123D25] text-xs uppercase tracking-[0.25em] font-serif font-semibold mb-3">
            <Camera className="w-3.5 h-3.5 text-[#C49A43]" />
            <span>Guest Photo Drop</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-semibold text-[#123D25]">
            Snap &amp; Share
          </h2>

          <GoldDivider width={190} variant="flourish" className="mx-auto mt-2" />

          <p className="text-base sm:text-lg font-serif italic text-[#700D20] mt-3 font-medium">
            Be our wedding photographer for the day!
          </p>

          <p className="text-sm sm:text-base font-serif text-[#76685A] mt-2 leading-relaxed">
            {photoDrop.tagline}
          </p>
        </motion.div>

        {/* Main Interactive Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          {/* Left Column: 3-Step Guide */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex flex-col gap-4"
          >
            <div className="bg-[#FFFDF9]/85 backdrop-blur-sm rounded-2xl p-6 sm:p-7 border border-[#C49A43]/40 shadow-[0_8px_30px_rgba(196,154,67,0.12)]">
              <h3 className="font-playfair text-xl sm:text-2xl text-[#123D25] font-semibold mb-5 flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-[#C49A43]" />
                How It Works
              </h3>

              <div className="space-y-5">
                {steps.map((step, idx) => {
                  const StepIcon = step.icon;
                  return (
                    <div key={idx} className="flex items-start gap-4 group">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#123D25] to-[#0A2617] text-[#E5C67C] flex items-center justify-center shrink-0 border border-[#C49A43]/40 shadow-sm group-hover:scale-105 transition-transform">
                        <StepIcon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-sans font-bold text-[#C49A43] tracking-widest uppercase">
                            Step {step.num}
                          </span>
                        </div>
                        <h4 className="font-serif font-bold text-base text-[#700D20] mt-0.5">
                          {step.title}
                        </h4>
                        <p className="text-xs sm:text-sm font-serif text-[#665749] mt-1 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Hashtag Callout Pill */}
              <div className="mt-6 pt-5 border-t border-[#C49A43]/25 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#700D20] fill-[#700D20]" />
                  <span className="text-xs font-serif text-[#76685A]">
                    Instagram &amp; Social tag:
                  </span>
                  <span className="text-xs font-mono font-bold text-[#123D25] bg-[#E5C67C]/25 px-2.5 py-1 rounded-md border border-[#C49A43]/30">
                    {photoDrop.hashtag}
                  </span>
                </div>
                <button
                  onClick={handleCopyTag}
                  className="inline-flex items-center gap-1.5 text-xs font-serif text-[#700D20] hover:text-[#123D25] font-semibold transition-colors cursor-pointer"
                >
                  {copiedTag ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#C49A43]" />
                      <span>Copy Tag</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Column: QR Code & Direct Actions Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex justify-center"
          >
            <div className="w-full max-w-md bg-gradient-to-b from-[#FFFDF9] via-[#FAF3E8] to-[#FFFDF9] rounded-3xl p-6 sm:p-8 border-2 border-[#C49A43]/50 shadow-[0_16px_40px_rgba(18,61,37,0.14)] flex flex-col items-center text-center relative overflow-hidden">
              {/* Decorative top ribbon */}
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#C49A43] via-[#E5C67C] to-[#C49A43]" />

              <div className="w-10 h-10 rounded-full bg-[#123D25] text-[#E5C67C] border border-[#C49A43] flex items-center justify-center mb-3 shadow-sm">
                <Camera className="w-5 h-5" />
              </div>

              <span className="text-[11px] font-sans font-bold tracking-[0.25em] text-[#C49A43] uppercase mb-1">
                Scan With Phone Camera
              </span>

              <h3 className="font-playfair text-xl sm:text-2xl font-bold text-[#123D25] mb-4">
                Google Drive Photo Drop
              </h3>

              {/* QR Code Presentation Frame */}
              <div className="relative p-3.5 rounded-2xl bg-white border-2 border-[#C49A43]/60 shadow-inner group">
                {qrDataUrl ? (
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={qrDataUrl}
                      alt="Scan to upload wedding photos to Google Drive"
                      className="w-52 h-52 sm:w-60 sm:h-60 rounded-lg object-contain"
                    />

                    {/* Central Monogram Overlay inside QR */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-12 h-12 rounded-full bg-[#FFFDF9] border-2 border-[#C49A43] shadow-md flex items-center justify-center">
                        <span className="font-script text-base text-[#700D20] font-bold">
                          {weddingData.couple.monogram}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center text-sm font-serif text-[#76685A]">
                    Generating QR Code...
                  </div>
                )}
              </div>

              <p className="text-xs font-serif text-[#76685A] mt-3 mb-5 max-w-xs leading-relaxed">
                Open your phone camera &amp; point at the screen, or use the direct buttons below:
              </p>

              {/* Action Buttons */}
              <div className="w-full flex flex-col gap-2.5">
                {/* 1. Direct Upload Button */}
                <a
                  href={photoDrop.driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#123D25] via-[#1a4e32] to-[#123D25] text-[#FFF9ED] font-serif font-semibold text-sm tracking-wide border border-[#C49A43] shadow-[0_6px_20px_rgba(18,61,37,0.3)] hover:scale-[1.02] hover:shadow-[0_8px_25px_rgba(18,61,37,0.4)] transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <UploadCloud className="w-4 h-4 text-[#E5C67C] group-hover:animate-bounce" />
                  <span>Open &amp; Upload to Google Drive</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#E5C67C]/80" />
                </a>

                {/* 2. Secondary Action Row: Copy Link & Download QR */}
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={handleCopyLink}
                    className="py-2.5 px-3 rounded-full bg-[#FFFDF9] text-[#123D25] font-serif text-xs font-semibold border border-[#C49A43]/50 shadow-sm hover:bg-[#F6ECE0] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#C49A43]" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleDownloadQR}
                    className="py-2.5 px-3 rounded-full bg-[#FFFDF9] text-[#123D25] font-serif text-xs font-semibold border border-[#C49A43]/50 shadow-sm hover:bg-[#F6ECE0] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#C49A43]" />
                    <span>Download QR</span>
                  </button>
                </div>
              </div>

              {/* Compatibility footnote */}
              <div className="mt-4 flex items-center gap-1.5 text-[11px] font-serif text-[#76685A]">
                <Smartphone className="w-3.5 h-3.5 text-[#C49A43]" />
                <span>Compatible with iOS, Android &amp; PC</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

