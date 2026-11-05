"use client";

import React, { useState } from "react";
import { EnvelopeOpening } from "@/components/opening/EnvelopeOpening";
import { FloatingPetals } from "@/components/decorations/FloatingPetals";
import { Navbar } from "@/components/navigation/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { CoupleSection } from "@/components/sections/CoupleSection";
import { CountdownSection } from "@/components/sections/CountdownSection";
import { WeddingDetails } from "@/components/sections/WeddingDetails";
import { VenueSection } from "@/components/sections/VenueSection";
import { SadhyaSection } from "@/components/sections/SadhyaSection";
import { FamilySection } from "@/components/sections/FamilySection";
import { WishesSection } from "@/components/sections/WishesSection";
import { PhotoDropSection } from "@/components/sections/PhotoDropSection";
import { RegardsSection } from "@/components/sections/RegardsSection";
import { DepartureSection } from "@/components/sections/DepartureSection";
import { ShareSection } from "@/components/sections/ShareSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { MusicPlayer } from "@/components/ui/MusicPlayer";
import { DownloadCardModal } from "@/components/ui/DownloadCardModal";

export default function Home() {
  const [showEnvelope, setShowEnvelope] = useState(true);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  React.useEffect(() => {
    const handleOpenModal = () => setShowDownloadModal(true);
    window.addEventListener("open-download-card", handleOpenModal);
    return () => window.removeEventListener("open-download-card", handleOpenModal);
  }, []);

  const handleEnvelopeComplete = () => {
    setShowEnvelope(false);
    // When the main invitation page appears, trigger music
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("wedding-play-music"));
      const win = window as unknown as { __playWeddingMusic?: () => void };
      if (typeof win.__playWeddingMusic === "function") {
        win.__playWeddingMusic();
      }
    }
  };

  return (
    <main className="relative min-h-screen bg-[#FFF9ED] text-[#2F261F] selection:bg-[#E5C67C] selection:text-[#123D25]">
      {/* Opening 3D Envelope Experience */}
      {showEnvelope && (
        <EnvelopeOpening onOpenComplete={handleEnvelopeComplete} />
      )}

      {/* Ambient Floating Jasmine & Gold Petals */}
      <FloatingPetals />

      {/* Sticky Top Navigation */}
      <Navbar onReopenEnvelope={() => setShowEnvelope(true)} />

      {/* Floating Ambient Wedding Music Player */}
      <MusicPlayer />

      {/* 1-Click Printable / PDF Invitation Card Modal */}
      <DownloadCardModal
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
      />

      {/* Main Single-Scroll Experience */}
      <div className="relative">
        <HeroSection />
        <CoupleSection />
        <CountdownSection />
        <WeddingDetails />
        <VenueSection />
        <SadhyaSection />
        <FamilySection />
        <WishesSection />
        <PhotoDropSection />
        <RegardsSection />
        <DepartureSection />
        <ShareSection />
        <FooterSection />
      </div>
    </main>
  );
}
