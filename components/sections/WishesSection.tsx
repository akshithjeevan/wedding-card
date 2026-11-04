"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FloralCorner } from "@/components/decorations/FloralCorner";
import { GoldDivider } from "@/components/decorations/GoldDivider";
import { Wish, initialWishes } from "@/data/initialWishes";
import { Heart, Send, Sparkles, MessageSquareHeart, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

const BLESSING_TAGS = [
  "✨ Eternal Love",
  "🕊️ Divine Grace",
  "🌸 Joy & Laughter",
  "💫 Together Forever",
  "🙏 Auspicious Blessings",
];

const RELATIONSHIPS = [
  "Friend of Groom",
  "Bride's Family",
  "Groom's Family",
  "College Friend",
  "Colleague",
  "Well Wisher",
];

export const WishesSection: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>(initialWishes);
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("Friend of Groom");
  const [blessingTag, setBlessingTag] = useState("✨ Eternal Love");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [likedWishIds, setLikedWishIds] = useState<Record<string, boolean>>({});

  // Fetch live wishes on mount
  useEffect(() => {
    const fetchWishes = async () => {
      try {
        const res = await fetch("/api/wishes");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.wishes) && data.wishes.length > 0) {
            setWishes(data.wishes);
          }
        }
      } catch {
        // Fallback to local storage if API fails
        try {
          const local = localStorage.getItem("wedding_wishes_backup");
          if (local) {
            setWishes(JSON.parse(local));
          }
        } catch {
          // Keep initial wishes
        }
      }
    };

    fetchWishes();

    try {
      const storedLikes = localStorage.getItem("wedding_liked_wishes");
      if (storedLikes) {
        setLikedWishIds(JSON.parse(storedLikes));
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || isSubmitting) return;

    setIsSubmitting(true);

    const payload = {
      name: name.trim(),
      relationship,
      blessingTag,
      message: message.trim(),
    };

    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.wish) {
          const updated = [data.wish, ...wishes];
          setWishes(updated);
          try {
            localStorage.setItem("wedding_wishes_backup", JSON.stringify(updated));
          } catch {
            // Ignore storage errors
          }
        }
      } else {
        // Fallback local create if network issue
        const fallbackWish: Wish = {
          id: "wish-local-" + Date.now(),
          name: payload.name,
          relationship: payload.relationship,
          blessingTag: payload.blessingTag,
          message: payload.message,
          createdAt: new Date().toISOString(),
          likes: 1,
        };
        const updated = [fallbackWish, ...wishes];
        setWishes(updated);
      }
    } catch {
      const fallbackWish: Wish = {
        id: "wish-local-" + Date.now(),
        name: payload.name,
        relationship: payload.relationship,
        blessingTag: payload.blessingTag,
        message: payload.message,
        createdAt: new Date().toISOString(),
        likes: 1,
      };
      const updated = [fallbackWish, ...wishes];
      setWishes(updated);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      setName("");
      setMessage("");

      // Confetti burst on sending blessing
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#C49A43", "#E5C67C", "#700D20", "#123D25", "#FFFFFF"],
        });
      } catch {
        // Ignore confetti errors
      }

      setTimeout(() => setSubmitted(false), 4500);
    }
  };

  const handleLike = async (id: string) => {
    if (likedWishIds[id]) return;

    const newLiked = { ...likedWishIds, [id]: true };
    setLikedWishIds(newLiked);
    try {
      localStorage.setItem("wedding_liked_wishes", JSON.stringify(newLiked));
    } catch {
      // Ignore
    }

    setWishes((prev) =>
      prev.map((w) => (w.id === id ? { ...w, likes: (w.likes || 0) + 1 } : w))
    );

    try {
      await fetch("/api/wishes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    } catch {
      // Ignore
    }
  };

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "Special Occasion";
    }
  };

  return (
    <section
      id="wishes"
      className="relative py-20 px-4 bg-gradient-to-b from-[#FFF9ED] via-[#FBF4E6] to-[#FFF9ED] overflow-hidden"
    >
      <FloralCorner position="top-left" size={170} />
      <FloralCorner position="bottom-right" size={170} />

      <div className="max-w-5xl mx-auto relative z-20">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-[#C49A43] font-serif font-medium flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Wishes &amp; Blessings
            <Sparkles className="w-3.5 h-3.5" />
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-semibold text-[#123D25] mt-1">
            Guest Book
          </h2>
          <GoldDivider width={190} variant="flourish" className="mx-auto mt-2" />
          <p className="text-xs sm:text-sm font-serif italic text-[#76685A] mt-2 max-w-md mx-auto">
            Leave your warm congratulations, prayers, and words of love for Vishnuraj &amp; Josly as they embark on this sacred journey.
          </p>
        </motion.div>

        {/* Wish Submission Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto mb-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#FFFDF8] to-[#FAF2E2] border-2 border-[#C49A43]/60 shadow-[0_15px_45px_rgba(196,154,67,0.15)] relative"
        >
          {/* Subtle Decorative Corner Accent Leaf */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#C49A43] rounded-tl-sm pointer-events-none" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#C49A43] rounded-tr-sm pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#C49A43] rounded-bl-sm pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#C49A43] rounded-br-sm pointer-events-none" />

          <div className="flex items-center gap-2 mb-5">
            <span className="p-2 rounded-full bg-[#123D25] text-[#E5C67C] border border-[#C49A43]">
              <MessageSquareHeart className="w-4 h-4" />
            </span>
            <h3 className="font-playfair text-xl sm:text-2xl font-semibold text-[#123D25]">
              Write a Blessing
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Guest Name & Relationship */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-serif uppercase tracking-wider text-[#700D20] font-medium mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul &amp; Anjali"
                  maxLength={60}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FFFDF9] border border-[#C49A43]/50 focus:border-[#700D20] focus:ring-1 focus:ring-[#700D20] text-sm text-[#2F261F] placeholder-[#A49483] outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-serif uppercase tracking-wider text-[#700D20] font-medium mb-1.5">
                  Your Connection
                </label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FFFDF9] border border-[#C49A43]/50 focus:border-[#700D20] focus:ring-1 focus:ring-[#700D20] text-sm text-[#2F261F] outline-none transition-all cursor-pointer"
                >
                  {RELATIONSHIPS.map((rel) => (
                    <option key={rel} value={rel}>
                      {rel}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Blessing Tag Selector */}
            <div>
              <label className="block text-xs font-serif uppercase tracking-wider text-[#700D20] font-medium mb-1.5">
                Blessing Theme
              </label>
              <div className="flex flex-wrap gap-2">
                {BLESSING_TAGS.map((tag) => (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => setBlessingTag(tag)}
                    className={`px-3 py-1 rounded-full text-xs font-serif transition-all border ${
                      blessingTag === tag
                        ? "bg-[#123D25] text-[#E5C67C] border-[#C49A43] shadow-sm scale-102"
                        : "bg-[#FFF9ED] text-[#76685A] border-[#C49A43]/30 hover:border-[#C49A43]"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Body */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-serif uppercase tracking-wider text-[#700D20] font-medium">
                  Your Message for the Couple *
                </label>
                <span className="text-[11px] text-[#A49483]">
                  {message.length}/500
                </span>
              </div>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={500}
                placeholder="Share your prayers, memories, or wishes for Vishnuraj &amp; Josly..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#FFFDF9] border border-[#C49A43]/50 focus:border-[#700D20] focus:ring-1 focus:ring-[#700D20] text-sm text-[#2F261F] placeholder-[#A49483] outline-none transition-all resize-none leading-relaxed"
              />
            </div>

            {/* Submit Button & Confirmation */}
            <div className="flex items-center justify-between pt-2">
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-1.5 text-xs font-serif text-[#123D25] font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#123D25]" />
                    <span>Your blessing has been posted!</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={isSubmitting || !name.trim() || !message.trim()}
                className="ml-auto inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#700D20] to-[#500A17] text-[#FFF9ED] border border-[#C49A43]/60 text-xs sm:text-sm font-serif tracking-wider shadow-md hover:shadow-lg transition-all duration-300 hover:scale-102 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Send Blessings</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Live Wishes Cards Wall */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {wishes.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="relative p-5 sm:p-6 rounded-2xl bg-[#FFFDF7] border border-[#C49A43]/40 shadow-[0_8px_25px_rgba(196,154,67,0.1)] flex flex-col justify-between hover:border-[#C49A43] hover:shadow-[0_12px_32px_rgba(196,154,67,0.2)] transition-all duration-300 group"
              >
                {/* Gold Inner Hairline Border */}
                <div className="absolute inset-1.5 border border-[#C49A43]/20 rounded-xl pointer-events-none" />

                <div>
                  {/* Top Header: Tag & Date */}
                  <div className="flex items-center justify-between mb-3 relative z-10">
                    <span className="text-[11px] font-serif px-2.5 py-0.5 rounded-full bg-[#123D25]/10 text-[#123D25] border border-[#123D25]/20 font-medium">
                      {item.blessingTag || "✨ Blessing"}
                    </span>
                    <span className="text-[11px] font-serif text-[#A49483]">
                      {formatDate(item.createdAt)}
                    </span>
                  </div>

                  {/* Blessing Quote */}
                  <p className="text-xs sm:text-sm font-serif italic text-[#2F261F] leading-relaxed relative z-10 mb-4">
                    &ldquo;{item.message}&rdquo;
                  </p>
                </div>

                {/* Bottom Footer: Author & Heart Like Counter */}
                <div className="pt-3 border-t border-[#C49A43]/25 flex items-center justify-between relative z-10">
                  <div>
                    <h4 className="text-xs sm:text-sm font-playfair font-semibold text-[#700D20]">
                      {item.name}
                    </h4>
                    <p className="text-[10px] sm:text-[11px] font-serif text-[#76685A]">
                      {item.relationship}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleLike(item.id)}
                    aria-label={`Like wish from ${item.name}`}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition-all ${
                      likedWishIds[item.id]
                        ? "bg-[#700D20] text-[#FFF9ED] scale-105"
                        : "bg-[#FFF9ED] text-[#700D20] border border-[#C49A43]/40 hover:border-[#700D20] hover:bg-[#700D20]/10"
                    }`}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        likedWishIds[item.id] ? "fill-current" : ""
                      }`}
                    />
                    <span className="font-sans font-medium text-[11px]">
                      {item.likes || 1}
                    </span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
