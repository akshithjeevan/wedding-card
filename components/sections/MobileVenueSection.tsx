"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, ExternalLink } from "lucide-react";
import { weddingData } from "@/data/wedding";

export const MobileVenueSection: React.FC = () => {
  return (
    <section id="venue" className="w-full py-8 px-4 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-sm flex flex-col items-center text-center"
      >
        <span className="font-serif text-xs uppercase tracking-[0.3em] text-[#704863] font-semibold">
          Location &amp; Map
        </span>
        <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-[#3D182E] mt-1 mb-5">
          Wedding Venue
        </h3>

        {/* Venue Card */}
        <div className="w-full bg-[#FFFFFF] rounded-2xl p-5 border border-[#E8DFD8] shadow-[0_4px_20px_rgba(61,24,46,0.06)] relative overflow-hidden">
          {/* Clickable Google Maps Frame - Tapping anywhere redirects to Auditorium Location */}
          <a
            href={weddingData.venue.googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Click to open Chiramel Auditorium in Google Maps"
            className="group relative block w-full h-48 rounded-xl overflow-hidden border border-[#E0D3CA] shadow-inner mb-4 bg-[#EDE5DF] cursor-pointer"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3931.2827725916053!2d76.39343717592476!3d9.82658147600868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b087968e7ec89f9%3A0xe67db5cf8ea78f8b!2sChirammal%20Auditorium!5e0!3m2!1sen!2sin!4v1741130000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Chiramel Auditorium Google Map"
              className="w-full h-full grayscale-[15%] contrast-[1.05] pointer-events-none transition-transform duration-300 group-hover:scale-105"
            />

            {/* Tap to open map overlay badge */}
            <div className="absolute top-2.5 right-2.5 px-3 py-1.5 rounded-full bg-[#3D182E]/90 text-white text-[11px] font-sans font-semibold tracking-wide flex items-center gap-1.5 shadow-md group-hover:bg-[#3D182E] transition-colors">
              <span>Tap for Directions</span>
              <ExternalLink className="w-3 h-3 text-[#E5C67C]" />
            </div>

            {/* Subtle bottom indicator */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#3D182E]/80 via-[#3D182E]/30 to-transparent py-1.5 px-3 flex items-center justify-between text-white text-[11px] font-sans">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#E5C67C]" />
                <span className="font-medium">Chiramel Auditorium, Vaikom</span>
              </span>
              <span className="text-[10px] text-white/80 underline font-medium">Click Map ↗</span>
            </div>
          </a>

          {/* Venue Info */}
          <div className="flex flex-col items-center">
            <div className="w-9 h-9 rounded-full bg-[#FAF4F0] text-[#704863] border border-[#C49A43]/50 flex items-center justify-center mb-2">
              <MapPin className="w-4 h-4 text-[#3D182E]" />
            </div>

            <h4 className="font-serif font-bold text-lg text-[#3D182E]">
              {weddingData.venue.name}
            </h4>
            <p className="text-xs font-serif text-[#704863] mt-0.5">
              {weddingData.venue.addressLine1}
            </p>
            <p className="text-xs font-serif text-[#8C7A87]">
              {weddingData.venue.addressLine2}
            </p>

            {/* Direct Google Maps Directions Button */}
            <a
              href={weddingData.venue.googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full py-3 px-5 rounded-full bg-[#3D182E] hover:bg-[#2A0E1F] text-[#FFF9F3] text-xs font-serif font-semibold tracking-wide border border-[#C49A43] shadow-[0_4px_14px_rgba(61,24,46,0.2)] hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <Navigation className="w-4 h-4 text-[#E5C67C] group-hover:rotate-12 transition-transform" />
              <span>Get Google Maps Directions</span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

