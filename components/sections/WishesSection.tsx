"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FloralCorner } from "@/components/decorations/FloralCorner";
import { GoldDivider } from "@/components/decorations/GoldDivider";
import { Wish, initialWishes } from "@/data/initialWishes";
import { Heart, Send, Sparkles, MessageSquareHeart, CheckCircle2, Palette } from "lucide-react";
import confetti from "canvas-confetti";

export interface StickyColorTheme {
  id: string;
  name: string;
  emoji: string;
  bgGradient: string;
  dotColor: string;
  border: string;
  pinAccent: string;
  pinHead: string;
  tagClass: string;
  authorColor: string;
  metaColor: string;
  textColor: string;
  heartActiveBg: string;
  heartHover: string;
}

export const STICKY_THEMES: Record<string, StickyColorTheme> = {
  yellow: {
    id: "yellow",
    name: "Sunny Gold",
    emoji: "💛",
    bgGradient: "from-[#FFFDE8] via-[#FEF9C3] to-[#FEF08A]",
    dotColor: "#EAB308",
    border: "border-[#EAB308]/40",
    pinAccent: "#B45309",
    pinHead: "from-[#FBBF24] via-[#F59E0B] to-[#D97706]",
    tagClass: "bg-[#78350F]/10 text-[#78350F] border-[#78350F]/20",
    authorColor: "text-[#78350F]",
    metaColor: "text-[#92400E]",
    textColor: "text-[#451A03]",
    heartActiveBg: "bg-[#78350F] text-[#FFFBEB]",
    heartHover: "hover:bg-[#78350F]/15 text-[#78350F] border-[#78350F]/30",
  },
  rose: {
    id: "rose",
    name: "Blush Rose",
    emoji: "🌸",
    bgGradient: "from-[#FFF1F2] via-[#FFE4E6] to-[#FECDD3]",
    dotColor: "#F43F5E",
    border: "border-[#F43F5E]/40",
    pinAccent: "#9F1239",
    pinHead: "from-[#FDA4AF] via-[#F43F5E] to-[#BE123C]",
    tagClass: "bg-[#881337]/10 text-[#881337] border-[#881337]/20",
    authorColor: "text-[#881337]",
    metaColor: "text-[#9F1239]",
    textColor: "text-[#4C0519]",
    heartActiveBg: "bg-[#881337] text-[#FFF1F2]",
    heartHover: "hover:bg-[#881337]/15 text-[#881337] border-[#881337]/30",
  },
  sage: {
    id: "sage",
    name: "Mint Sage",
    emoji: "🌿",
    bgGradient: "from-[#F0FDF4] via-[#DCFCE7] to-[#BBF7D0]",
    dotColor: "#22C55E",
    border: "border-[#22C55E]/40",
    pinAccent: "#14532D",
    pinHead: "from-[#86EFAC] via-[#22C55E] to-[#15803D]",
    tagClass: "bg-[#14532D]/10 text-[#14532D] border-[#14532D]/20",
    authorColor: "text-[#14532D]",
    metaColor: "text-[#166534]",
    textColor: "text-[#052E16]",
    heartActiveBg: "bg-[#14532D] text-[#F0FDF4]",
    heartHover: "hover:bg-[#14532D]/15 text-[#14532D] border-[#14532D]/30",
  },
  lilac: {
    id: "lilac",
    name: "Soft Lilac",
    emoji: "💜",
    bgGradient: "from-[#FAF5FF] via-[#F3E8FF] to-[#E9D5FF]",
    dotColor: "#A855F7",
    border: "border-[#A855F7]/40",
    pinAccent: "#581C87",
    pinHead: "from-[#D8B4FE] via-[#A855F7] to-[#7E22CE]",
    tagClass: "bg-[#581C87]/10 text-[#581C87] border-[#581C87]/20",
    authorColor: "text-[#581C87]",
    metaColor: "text-[#6B21A8]",
    textColor: "text-[#3B0764]",
    heartActiveBg: "bg-[#581C87] text-[#FAF5FF]",
    heartHover: "hover:bg-[#581C87]/15 text-[#581C87] border-[#581C87]/30",
  },
  peach: {
    id: "peach",
    name: "Warm Peach",
    emoji: "🍑",
    bgGradient: "from-[#FFF7ED] via-[#FFEDD5] to-[#FED7AA]",
    dotColor: "#FB923C",
    border: "border-[#FB923C]/40",
    pinAccent: "#7C2D12",
    pinHead: "from-[#FDBA74] via-[#FB923C] to-[#C2410C]",
    tagClass: "bg-[#7C2D12]/10 text-[#7C2D12] border-[#7C2D12]/20",
    authorColor: "text-[#7C2D12]",
    metaColor: "text-[#9A3412]",
    textColor: "text-[#431407]",
    heartActiveBg: "bg-[#7C2D12] text-[#FFF7ED]",
    heartHover: "hover:bg-[#7C2D12]/15 text-[#7C2D12] border-[#7C2D12]/30",
  },
  sky: {
    id: "sky",
    name: "Powder Blue",
    emoji: "🩵",
    bgGradient: "from-[#F0F9FF] via-[#E0F2FE] to-[#BAE6FD]",
    dotColor: "#38BDF8",
    border: "border-[#38BDF8]/40",
    pinAccent: "#0C4A6E",
    pinHead: "from-[#7DD3FC] via-[#38BDF8] to-[#0284C7]",
    tagClass: "bg-[#0C4A6E]/10 text-[#0C4A6E] border-[#0C4A6E]/20",
    authorColor: "text-[#0C4A6E]",
    metaColor: "text-[#075985]",
    textColor: "text-[#082F49]",
    heartActiveBg: "bg-[#0C4A6E] text-[#F0F9FF]",
    heartHover: "hover:bg-[#0C4A6E]/15 text-[#0C4A6E] border-[#0C4A6E]/30",
  },
};

const COLOR_KEYS = Object.keys(STICKY_THEMES);

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

// Natural subtle rotation angles for sticky note wall
const ROTATIONS = [-1.8, 1.5, -2.2, 1.9, -1.2, 1.7, -2.0, 1.4];

export const WishesSection: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>(initialWishes);
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("Friend of Groom");
  const [blessingTag, setBlessingTag] = useState("✨ Eternal Love");
  const [selectedColor, setSelectedColor] = useState("yellow");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [likedWishIds, setLikedWishIds] = useState<Record<string, boolean>>({});

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
      // Ignore
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
      color: selectedColor,
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
            // Ignore
          }
        }
      } else {
        const fallbackWish: Wish = {
          id: "wish-local-" + Date.now(),
          name: payload.name,
          relationship: payload.relationship,
          blessingTag: payload.blessingTag,
          color: payload.color,
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
        color: payload.color,
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

      // Automatically advance to next sticky note color for fun
      const currentIndex = COLOR_KEYS.indexOf(selectedColor);
      setSelectedColor(COLOR_KEYS[(currentIndex + 1) % COLOR_KEYS.length]);

      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#C49A43", "#E5C67C", "#700D20", "#123D25", "#FFFFFF"],
        });
      } catch {
        // Ignore
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
      return "Special Day";
    }
  };

  // Helper to pick theme safely
  const getTheme = (colorKey?: string, index: number = 0): StickyColorTheme => {
    if (colorKey && STICKY_THEMES[colorKey]) {
      return STICKY_THEMES[colorKey];
    }
    const fallbackKey = COLOR_KEYS[index % COLOR_KEYS.length];
    return STICKY_THEMES[fallbackKey];
  };

  return (
    <section
      id="wishes"
      className="relative py-20 px-4 bg-gradient-to-b from-[#FFF9ED] via-[#F8EFE0] to-[#FFF9ED] overflow-hidden"
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
            Guest Book Sticky Wall
          </h2>
          <GoldDivider width={190} variant="flourish" className="mx-auto mt-2" />
          <p className="text-xs sm:text-sm font-serif italic text-[#76685A] mt-2 max-w-md mx-auto">
            Pin your heartfelt congratulations and prayers on Vishnuraj &amp; Josly&apos;s wedding keepsake board.
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
          {/* Decorative Corner Leaf Accents */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#C49A43] rounded-tl-sm pointer-events-none" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#C49A43] rounded-tr-sm pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#C49A43] rounded-bl-sm pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#C49A43] rounded-br-sm pointer-events-none" />

          <div className="flex items-center gap-2 mb-5">
            <span className="p-2 rounded-full bg-[#123D25] text-[#E5C67C] border border-[#C49A43]">
              <MessageSquareHeart className="w-4 h-4" />
            </span>
            <h3 className="font-playfair text-xl sm:text-2xl font-semibold text-[#123D25]">
              Leave a Sticky Note
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

            {/* Note Color Palette Picker */}
            <div>
              <label className="block text-xs font-serif uppercase tracking-wider text-[#700D20] font-medium mb-1.5 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-[#C49A43]" />
                Choose Note Color
              </label>
              <div className="flex flex-wrap gap-2">
                {COLOR_KEYS.map((key) => {
                  const theme = STICKY_THEMES[key];
                  const isSelected = selectedColor === key;
                  return (
                    <button
                      type="button"
                      key={key}
                      onClick={() => setSelectedColor(key)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-serif transition-all border ${
                        isSelected
                          ? "ring-2 ring-[#700D20] scale-105 shadow-md font-semibold bg-white border-[#700D20]"
                          : "opacity-80 hover:opacity-100 hover:scale-102 bg-white/70 border-gray-300"
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full shadow-xs"
                        style={{ backgroundColor: theme.dotColor }}
                      />
                      <span>{theme.name}</span>
                    </button>
                  );
                })}
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
                  Your Sticky Note Message *
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
                placeholder="Write your prayers, blessings, or sweet memories for Vishnuraj &amp; Josly..."
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
                    <span>Your note has been pinned to the board!</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={isSubmitting || !name.trim() || !message.trim()}
                className="ml-auto inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#700D20] to-[#500A17] text-[#FFF9ED] border border-[#C49A43]/60 text-xs sm:text-sm font-serif tracking-wider shadow-md hover:shadow-lg transition-all duration-300 hover:scale-102 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Pinning Note...</span>
                ) : (
                  <>
                    <span>Pin Note to Board</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Stream Hint */}
        <div className="flex items-center justify-center gap-2 mb-6 text-xs font-serif text-[#76685A] italic text-center px-4">
          <span className="w-8 h-px bg-[#C49A43]/40 hidden sm:inline-block" />
          <span>🌊 Flowing river of blessings • Hover any note to pause &amp; read</span>
          <span className="w-8 h-px bg-[#C49A43]/40 hidden sm:inline-block" />
        </div>

        {/* Live Colorful Sticky Notes Flowing Like Water Left to Right */}
        <div
          className="relative w-full overflow-hidden py-6"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
          }}
        >
          {(() => {
            const loopMultiplier = Math.max(3, Math.ceil(10 / Math.max(1, wishes.length)));
            const singleSet = Array.from({ length: loopMultiplier }, () => wishes).flat();
            const displayList = [...singleSet, ...singleSet];

            return (
              <div className="water-flow-track gap-8 items-center py-6">
                {displayList.map((item, idx) => {
                  const theme = getTheme(item.color, idx);
                  const rotation = ROTATIONS[idx % ROTATIONS.length];

                  return (
                    <motion.div
                      key={`${item.id}-${idx}`}
                      style={{
                        rotate: `${rotation}deg`,
                      }}
                      animate={{
                        y: [0, -8, 2, -6, 0],
                        rotate: [
                          rotation,
                          rotation + 0.8,
                          rotation - 0.6,
                          rotation + 0.5,
                          rotation,
                        ],
                      }}
                      transition={{
                        duration: 4.8 + (idx % 4) * 0.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: (idx % 6) * 0.4,
                      }}
                      whileHover={{
                        scale: 1.05,
                        rotate: 0,
                        y: -12,
                        zIndex: 40,
                        transition: { duration: 0.25, ease: "easeOut" },
                      }}
                      className={`w-[290px] sm:w-[320px] shrink-0 relative p-6 pt-7 rounded-2xl bg-gradient-to-br ${theme.bgGradient} ${theme.border} border shadow-[0_12px_28px_rgba(0,0,0,0.08),0_4px_8px_rgba(0,0,0,0.04)] flex flex-col justify-between transition-shadow duration-300 hover:shadow-[0_20px_45px_rgba(0,0,0,0.18)] select-none group cursor-pointer`}
                    >
                      {/* Realistic Metallic Gold Pushpin at Top Center */}
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none drop-shadow-md">
                        <div
                          className={`w-5 h-5 rounded-full bg-gradient-to-br ${theme.pinHead} shadow-[0_2px_4px_rgba(0,0,0,0.3)] border border-white/60 relative flex items-center justify-center`}
                        >
                          {/* Pushpin Specular Reflection Dot */}
                          <div className="w-1.5 h-1.5 rounded-full bg-white/90 blur-[0.2px] -mt-1 -ml-1" />
                        </div>
                        {/* Pushpin Shadow */}
                        <div className="w-1.5 h-1.5 bg-black/30 -mt-0.5 rounded-full blur-[0.5px]" />
                      </div>

                      {/* Faint Subtle Tape Strip at Top (Vintage Stationery Feel) */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-3 bg-white/35 backdrop-blur-[1px] border-x border-b border-white/40 rounded-b-sm pointer-events-none" />

                      {/* Note Content */}
                      <div>
                        {/* Header: Blessing Tag & Formatted Date */}
                        <div className="flex items-center justify-between mb-3 relative z-10">
                          <span
                            className={`text-[11px] font-serif px-2.5 py-0.5 rounded-full border font-medium ${theme.tagClass}`}
                          >
                            {item.blessingTag || "✨ Blessing"}
                          </span>
                          <span className={`text-[11px] font-serif ${theme.metaColor} opacity-80`}>
                            {formatDate(item.createdAt)}
                          </span>
                        </div>

                        {/* Handwritten Style Blessing Message */}
                        <p
                          className={`text-sm sm:text-[15px] font-serif italic ${theme.textColor} leading-relaxed relative z-10 mb-5 drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]`}
                        >
                          &ldquo;{item.message}&rdquo;
                        </p>
                      </div>

                      {/* Footer: Guest Name & Interactive Heart Reaction */}
                      <div className="pt-3 border-t border-black/10 flex items-center justify-between relative z-10">
                        <div>
                          <h4
                            className={`text-sm font-playfair font-bold ${theme.authorColor} tracking-wide`}
                          >
                            {item.name}
                          </h4>
                          <p className={`text-[11px] font-serif ${theme.metaColor}`}>
                            {item.relationship}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(item.id);
                          }}
                          aria-label={`Like wish from ${item.name}`}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all shadow-xs ${
                            likedWishIds[item.id]
                              ? `${theme.heartActiveBg} scale-105 shadow-sm`
                              : `bg-white/80 ${theme.heartHover} border`
                          }`}
                        >
                          <Heart
                            className={`w-3.5 h-3.5 ${
                              likedWishIds[item.id] ? "fill-current" : ""
                            }`}
                          />
                          <span className="font-sans font-semibold text-[11px]">
                            {item.likes || 1}
                          </span>
                        </button>
                      </div>

                      {/* Soft Realistic Curled Bottom-Right Shadow Accent */}
                      <div className="absolute bottom-0 right-0 w-8 h-8 rounded-br-2xl bg-gradient-to-tl from-black/5 to-transparent pointer-events-none" />
                    </motion.div>
                  );
                })}
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
};
