"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, ExternalLink } from "lucide-react";
import { GoldDivider } from "@/components/decorations/GoldDivider";
import { FloralCorner } from "@/components/decorations/FloralCorner";
import { weddingData } from "@/data/wedding";

export const VenueSection: React.FC = () => {
  return (
    <section
      id="venue"
      className="relative py-20 px-4 overflow-hidden bg-[#FFF9ED]"
    >
      <FloralCorner position="top-left" size={180} />
      <FloralCorner position="bottom-right" size={180} />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-[#C49A43] font-serif font-medium">
            Location & Map
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-semibold text-[#123D25] mt-1">
            Find Your Way
          </h2>
          <p className="text-xs sm:text-sm font-serif italic text-[#76685A] mt-1">
            We look forward to welcoming you.
          </p>
          <GoldDivider width={180} variant="flourish" className="mx-auto mt-2" />
        </motion.div>

        {/* Map Container with Gold Border */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full rounded-3xl overflow-hidden border-2 border-[#C49A43] bg-[#F5EBD8] shadow-[0_12px_35px_rgba(196,154,67,0.18)] mb-8"
        >
          {/* Embedded Google Map */}
          <div className="relative w-full h-[320px] sm:h-[400px]">
            <iframe
              title="Chiramel Auditorium Location Map"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                "Chiramel Auditorium, Irumbuzhikkara, Udayanapuram, Vaikom, Kerala"
              )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>

          {/* Venue Info Footer below Map */}
          <div className="p-5 sm:p-6 bg-gradient-to-r from-[#FFFDF8] via-[#F8EFE0] to-[#FFFDF8] flex flex-col sm:flex-row items-center justify-between gap-4 text-left border-t border-[#C49A43]/40">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-full bg-[#123D25] text-[#E5C67C] shrink-0 mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-[#700D20]">
                  {weddingData.venue.name}
                </h3>
                <p className="text-xs sm:text-sm font-serif text-[#2F261F]/80">
                  {weddingData.venue.fullAddress}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <a
                href={weddingData.venue.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#123D25] text-[#FFF9ED] text-xs font-serif tracking-wider border border-[#C49A43] hover:bg-[#0C321B] transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-[#E5C67C]" />
                <span>Directions</span>
              </a>

              <a
                href={weddingData.venue.googleMapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-[#FFF9ED] text-[#700D20] text-xs font-serif tracking-wider border border-[#C49A43]/60 hover:bg-[#F5EBD8] transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open Maps</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

