"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
  Heart,
} from "lucide-react";
import { weddingData } from "@/data/wedding";

export const PhotoDropSection: React.FC = () => {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedTag, setCopiedTag] = useState(false);

  const { photoDrop } = weddingData;

  useEffect(() => {
    QRCode.toDataURL(photoDrop.driveUrl, {
      width: 480,
      margin: 1.5,
      color: {
        dark: "#3D182E",
        light: "#FFFFFF",
      },
      errorCorrectionLevel: "H",
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error("QR Code error:", err));
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
      description: "Candid smiles, stage rituals, laughter, selfies & celebration clips.",
    },
    {
      icon: QrIcon,
      num: "02",
      title: "Scan or Tap Upload",
      description: "Point your phone camera or tap below to open Google Drive directly.",
    },
    {
      icon: UploadCloud,
      num: "03",
      title: "Drop Raw Photos",
      description: "Upload in full original quality without messaging compression.",
    },
  ];

  return (
    <section id="photos" className="w-full py-8 px-4 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-sm flex flex-col items-center text-center"
      >
        <span className="font-serif text-xs uppercase tracking-[0.3em] text-[#704863] font-semibold">
          Guest Photo Drop
        </span>
        <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-[#3D182E] mt-1 mb-2">
          Snap &amp; Share
        </h3>
        <p className="text-xs font-serif italic text-[#704863] mb-5">
          Be our wedding photographer for the day!
        </p>

        {/* QR Code Presentation Card */}
        <div className="w-full bg-[#FFFFFF] rounded-2xl p-5 border border-[#E8DFD8] shadow-[0_4px_20px_rgba(61,24,46,0.06)] relative flex flex-col items-center">
          <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#C49A43] uppercase mb-1">
            Scan With Phone Camera
          </span>
          <h4 className="font-playfair text-lg font-bold text-[#3D182E] mb-3">
            Google Drive Photo Drop
          </h4>

          {/* QR Frame */}
          <div className="relative p-2.5 rounded-xl bg-white border border-[#E0D3CA] shadow-inner mb-3">
            {qrDataUrl ? (
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrDataUrl}
                  alt="Scan to upload wedding photos to Google Drive"
                  className="w-48 h-48 rounded-lg object-contain"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-[#FFFDF9] border border-[#C49A43] shadow-md flex items-center justify-center">
                    <span className="font-script text-sm text-[#3D182E] font-bold">
                      {weddingData.couple.monogram}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-48 h-48 flex items-center justify-center text-xs font-serif text-[#8C7A87]">
                Generating QR Code...
              </div>
            )}
          </div>

          <p className="text-[11px] font-serif text-[#704863] mb-4">
            Point your camera at the QR or tap below:
          </p>

          {/* Upload Button */}
          <a
            href={photoDrop.driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-5 rounded-full bg-[#3D182E] hover:bg-[#2A0E1F] text-[#FFF9F3] text-xs font-serif font-semibold tracking-wide border border-[#C49A43] shadow-[0_4px_14px_rgba(61,24,46,0.2)] hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <UploadCloud className="w-4 h-4 text-[#E5C67C] group-hover:animate-bounce" />
            <span>Open &amp; Upload to Google Drive</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#E5C67C]/80" />
          </a>

          {/* Secondary Buttons: Copy Link & Download QR */}
          <div className="grid grid-cols-2 gap-2 w-full mt-2.5">
            <button
              onClick={handleCopyLink}
              className="py-2 px-3 rounded-full bg-[#FAF4F0] text-[#3D182E] font-serif text-xs font-semibold border border-[#D9C9C0] hover:bg-[#EFE5DE] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
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
              className="py-2 px-3 rounded-full bg-[#FAF4F0] text-[#3D182E] font-serif text-xs font-semibold border border-[#D9C9C0] hover:bg-[#EFE5DE] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#C49A43]" />
              <span>Save QR</span>
            </button>
          </div>

          {/* 3 Step Guidance */}
          <div className="w-full mt-5 pt-4 border-t border-[#EFE6E0] space-y-3 text-left">
            {steps.map((st, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#FAF4F0] text-[#704863] border border-[#D9C9C0] text-[10px] font-sans font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <h5 className="font-serif font-bold text-xs text-[#3D182E]">
                    {st.title}
                  </h5>
                  <p className="text-[11px] font-serif text-[#8C7A87] leading-relaxed">
                    {st.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Hashtag box */}
          <div className="w-full mt-4 pt-3 border-t border-[#EFE6E0] flex items-center justify-between">
            <span className="text-[11px] font-serif text-[#704863]">
              Tag your stories:
            </span>
            <button
              onClick={handleCopyTag}
              className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#3D182E] bg-[#FAF4F0] px-2 py-0.5 rounded-md border border-[#D9C9C0] cursor-pointer"
            >
              <span>{photoDrop.hashtag}</span>
              {copiedTag ? (
                <Check className="w-3 h-3 text-emerald-600" />
              ) : (
                <Copy className="w-3 h-3 text-[#C49A43]" />
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
