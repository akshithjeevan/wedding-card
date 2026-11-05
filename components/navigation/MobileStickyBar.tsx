"use client";

import React, { useState, useEffect } from "react";
import { Share2, Download, Calendar, Volume2, VolumeX, Camera, Heart } from "lucide-react";
import { weddingData } from "@/data/wedding";

export const MobileStickyBar: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleMusicState = (e: Event) => {
      const custom = e as CustomEvent<{ isPlaying: boolean }>;
      if (custom.detail !== undefined) {
        setIsPlaying(custom.detail.isPlaying);
      }
    };
    window.addEventListener("wedding-music-state", handleMusicState);
    return () => window.removeEventListener("wedding-music-state", handleMusicState);
  }, []);

  const handleToggleMusic = () => {
    window.dispatchEvent(new CustomEvent("wedding-toggle-music"));
    setIsPlaying((prev) => !prev);
  };

  const handleShareWhatsApp = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = `${weddingData.share.whatsappMessage}\n\nDigital Invitation: ${url}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleOpenDownload = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-download-card"));
    }
  };

  const handleScrollToPhotos = () => {
    document.querySelector("#photos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-3 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
      <div className="w-full max-w-sm bg-[#FFFFFF]/95 backdrop-blur-md rounded-full py-2 px-3 border border-[#E8DFD8] shadow-[0_10px_35px_rgba(45,18,36,0.18)] flex items-center justify-around pointer-events-auto">
        {/* WhatsApp Share */}
        <button
          onClick={handleShareWhatsApp}
          className="flex flex-col items-center gap-0.5 text-[#3D182E] hover:text-[#25D366] transition-colors p-1"
          title="Share on WhatsApp"
        >
          <Share2 className="w-4 h-4 text-[#25D366]" />
          <span className="text-[9px] font-sans font-semibold">Share</span>
        </button>

        {/* Download Card */}
        <button
          onClick={handleOpenDownload}
          className="flex flex-col items-center gap-0.5 text-[#3D182E] hover:text-[#C49A43] transition-colors p-1"
          title="Download Invitation Card"
        >
          <Download className="w-4 h-4 text-[#C49A43]" />
          <span className="text-[9px] font-sans font-semibold">Card</span>
        </button>

        {/* Center Primary Action: Wish / Photo Drop */}
        <button
          onClick={handleScrollToPhotos}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#3D182E] text-[#FFF7EE] shadow-sm hover:scale-105 active:scale-95 transition-all -my-1"
          title="Snap & Share Photos"
        >
          <Camera className="w-3.5 h-3.5 text-[#E5C67C]" />
          <span className="text-[10px] font-serif font-semibold tracking-wider uppercase">
            Snap &amp; Share
          </span>
        </button>

        {/* Ambient Music Toggle */}
        <button
          onClick={handleToggleMusic}
          className="flex flex-col items-center gap-0.5 text-[#3D182E] hover:text-[#704863] transition-colors p-1"
          title={isPlaying ? "Mute music" : "Play music"}
        >
          {isPlaying ? (
            <Volume2 className="w-4 h-4 text-[#3D182E] animate-pulse" />
          ) : (
            <VolumeX className="w-4 h-4 text-[#8C7A87]" />
          )}
          <span className="text-[9px] font-sans font-semibold">Music</span>
        </button>
      </div>
    </div>
  );
};

