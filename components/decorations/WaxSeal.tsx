"use client";

import React from "react";

interface WaxSealProps {
  className?: string;
  size?: number;
  onClick?: () => void;
  interactive?: boolean;
}

export const WaxSeal: React.FC<WaxSealProps> = ({
  className = "",
  size = 72,
  onClick,
  interactive = false,
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center select-none ${
        interactive ? "cursor-pointer group hover:scale-105 active:scale-95" : ""
      } transition-transform duration-300 ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer ambient glow */}
      <div
        className="absolute inset-0 rounded-full blur-md opacity-50 group-hover:opacity-80 transition-opacity"
        style={{
          background:
            "radial-gradient(circle, rgba(229,198,124,0.6) 0%, rgba(196,154,67,0.3) 60%, transparent 100%)",
        }}
      />

      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl"
      >
        <defs>
          <radialGradient id="waxGoldBody" cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#FFF2B8" />
            <stop offset="25%" stopColor="#E5C67C" />
            <stop offset="60%" stopColor="#C49A43" />
            <stop offset="85%" stopColor="#8C6721" />
            <stop offset="100%" stopColor="#5E4311" />
          </radialGradient>

          <radialGradient id="waxInnerRecess" cx="48%" cy="46%" r="48%">
            <stop offset="0%" stopColor="#D9AC4E" />
            <stop offset="55%" stopColor="#B3862A" />
            <stop offset="100%" stopColor="#705014" />
          </radialGradient>

          <filter id="waxStampBevel" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="1" dy="1" stdDeviation="0.8" floodColor="#FFFFFF" floodOpacity="0.4" />
            <feDropShadow dx="-1" dy="-1" stdDeviation="0.8" floodColor="#3A2705" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* Organic irregular wax edge profile */}
        <path
          d="M 50 4 
             C 62 3 73 8 83 17 
             C 91 25 96 36 96 48 
             C 97 60 92 73 84 82 
             C 74 92 61 97 49 96 
             C 36 96 24 90 16 81 
             C 7 72 3 59 4 47 
             C 4 35 11 23 20 15 
             C 29 8 40 4 50 4 Z"
          fill="url(#waxGoldBody)"
          stroke="#705014"
          strokeWidth="1.2"
        />

        {/* Inner stamped impression rim */}
        <circle
          cx="50"
          cy="50"
          r="38"
          fill="url(#waxInnerRecess)"
          stroke="#E5C67C"
          strokeWidth="1"
          opacity="0.9"
        />

        {/* Delicate beaded inner border */}
        <circle
          cx="50"
          cy="50"
          r="34"
          stroke="#E5C67C"
          strokeWidth="1"
          strokeDasharray="2 2"
          opacity="0.85"
        />

        {/* Embossed VJ Initials */}
        <g filter="url(#waxStampBevel)">
          <text
            x="40"
            y="59"
            textAnchor="middle"
            fill="#FFF8DE"
            fontFamily="'Great Vibes', cursive, 'Playfair Display', serif"
            fontSize="30"
            fontWeight="bold"
            fontStyle="italic"
            letterSpacing="0.5"
            opacity="0.95"
          >
            VJ
          </text>
        </g>
      </svg>
    </div>
  );
};

