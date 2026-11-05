"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone, Users, Heart } from "lucide-react";
import { weddingData } from "@/data/wedding";

export const MobileFamilySection: React.FC = () => {
  return (
    <section id="family" className="w-full py-8 px-4 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-sm flex flex-col items-center text-center"
      >
        <span className="font-serif text-xs uppercase tracking-[0.3em] text-[#704863] font-semibold">
          Family &amp; Greetings
        </span>
        <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-[#3D182E] mt-1 mb-5">
          With Best Wishes
        </h3>

        {/* Card */}
        <div className="w-full bg-[#FFFFFF] rounded-2xl p-5 border border-[#E8DFD8] shadow-[0_4px_20px_rgba(61,24,46,0.06)] relative text-center">
          {/* Hosts */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-sans uppercase tracking-widest text-[#C49A43] font-semibold mb-1">
              Hosts &amp; Parents
            </span>
            <h4 className="font-serif font-bold text-lg text-[#3D182E]">
              {weddingData.family.hosts}
            </h4>
            <p className="text-xs font-serif text-[#704863] mt-0.5">
              {weddingData.family.address}
            </p>
          </div>

          {/* Contact Numbers: STRICTLY A SINGLE ROW ON MOBILE */}
          <div className="mt-5 pt-4 border-t border-[#EFE6E0]">
            <span className="text-[10px] font-sans uppercase tracking-widest text-[#8C7A87] font-semibold block mb-3">
              Contact &amp; Blessings
            </span>

            <div className="flex flex-row items-center justify-center gap-1.5 w-full">
              {weddingData.family.phoneNumbers.map((phone, idx) => (
                <a
                  key={idx}
                  href={`tel:${phone.raw}`}
                  className="flex-1 min-w-0 flex items-center justify-center gap-1 px-1.5 py-2 rounded-full bg-[#FAF4F0] border border-[#D9C9C0] shadow-2xs hover:bg-[#3D182E] hover:text-[#FFF7EE] hover:scale-102 active:scale-96 transition-all text-[#3D182E] group"
                >
                  <div className="w-4 h-4 rounded-full bg-[#3D182E] text-[#E5C67C] flex items-center justify-center shrink-0 group-hover:bg-[#C49A43] group-hover:text-[#3D182E] transition-colors">
                    <Phone className="w-2.5 h-2.5" />
                  </div>
                  <span className="font-sans text-[11px] font-semibold tracking-tight whitespace-nowrap">
                    {phone.display}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Best Regards */}
          <div className="mt-5 pt-4 border-t border-[#EFE6E0]">
            <span className="text-[10px] font-sans uppercase tracking-widest text-[#C49A43] font-semibold block mb-1.5">
              With Best Regards
            </span>
            <p className="font-serif text-xs text-[#3D182E] font-medium leading-relaxed">
              {weddingData.regards.join("  •  ")}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
