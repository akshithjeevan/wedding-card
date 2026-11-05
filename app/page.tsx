"use client";

import React, { useState, useEffect } from "react";
import { EnvelopeOpening } from "@/components/opening/EnvelopeOpening";
import { MobileInvitationHero } from "@/components/sections/MobileInvitationHero";
import { WeddingProgramTimeline } from "@/components/sections/WeddingProgramTimeline";
import { SaveTheDateCalendar } from "@/components/sections/SaveTheDateCalendar";
import { BigDayCountdown } from "@/components/sections/BigDayCountdown";
import { MobilePhotoCollage } from "@/components/sections/MobilePhotoCollage";
import { MobileVenueSection } from "@/components/sections/MobileVenueSection";
import { MobileFamilySection } from "@/components/sections/MobileFamilySection";
import { WishesSection } from "@/components/sections/WishesSection";
import { PhotoDropSection } from "@/components/sections/PhotoDropSection";
import { MobileThankYouSection } from "@/components/sections/MobileThankYouSection";
import { MobileStickyBar } from "@/components/navigation/MobileStickyBar";
import { MusicPlayer } from "@/components/ui/MusicPlayer";
import { DownloadCardModal } from "@/components/ui/DownloadCardModal";
import { FloatingPetals } from "@/components/decorations/FloatingPetals";

export default function Home() {
  const [showEnvelope, setShowEnvelope] = useState(true);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  useEffect(() => {
    const handleOpenModal = () => setShowDownloadModal(true);
    window.addEventListener("open-download-card", handleOpenModal);
    return () => window.removeEventListener("open-download-card", handleOpenModal);
  }, []);

  const handleEnvelopeComplete = () => {
    setShowEnvelope(false);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("wedding-play-music"));
      const win = window as unknown as { __playWeddingMusic?: () => void };
      if (typeof win.__playWeddingMusic === "function") {
        win.__playWeddingMusic();
      }
    }
  };

  return (
    <main className="min-h-screen bg-[#EDE5DE] sm:py-8 flex flex-col items-center selection:bg-[#E5C67C] selection:text-[#3D182E] relative">
      {/* Opening 3D Envelope Experience */}
      {showEnvelope && (
        <EnvelopeOpening onOpenComplete={handleEnvelopeComplete} />
      )}

      {/* Floating Ambient Wedding Music Player */}
      <MusicPlayer />

      {/* 1-Click Printable / PDF Invitation Card Modal */}
      <DownloadCardModal
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
      />

      {/* Romantic Falling Flower Petals Animation */}
      <FloatingPetals />

      {/* Mobile-First Centered Card Frame */}
      {/* On Mobile (95% of users): 100% full width, edge-to-edge native card feel */}
      {/* On Desktop: Centered phone mockup frame matching the reference images */}
      <div className="w-full sm:max-w-[430px] md:max-w-[450px] min-h-screen bg-[#FFFFFF] sm:rounded-[36px] sm:shadow-[0_25px_70px_rgba(45,18,36,0.18)] sm:border-[6px] sm:border-[#3D182E]/10 overflow-hidden relative flex flex-col pb-16">
        <MobileInvitationHero />
        <MobilePhotoCollage />
        <WeddingProgramTimeline />
        <SaveTheDateCalendar />
        <BigDayCountdown />
        <MobileVenueSection />
        <MobileFamilySection />
        <WishesSection />
        <PhotoDropSection />
        <MobileThankYouSection />
      </div>

      {/* Floating Bottom Quick Action Bar for Mobile */}
      <MobileStickyBar />
    </main>
  );
}
