"use client";

import React from "react";

interface VJMonogramProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

export const VJMonogram: React.FC<VJMonogramProps> = ({
  className = "",
  size = 110,
  glow = false,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {glow && (
        <div
          className="absolute inset-0 rounded-full blur-md opacity-40 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(229,198,124,0.8) 0%, rgba(196,154,67,0.2) 70%, transparent 100%)",
          }}
        />
      )}
      <svg
        viewBox="0 0 160 160"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-500 hover:scale-105"
      >
        <defs>
          <linearGradient id="vjGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E5C67C" />
            <stop offset="35%" stopColor="#C49A43" />
            <stop offset="70%" stopColor="#E5C67C" />
            <stop offset="100%" stopColor="#8C6721" />
          </linearGradient>
          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer dotted gold ring */}
        <circle
          cx="80"
          cy="80"
          r="74"
          stroke="url(#vjGoldGrad)"
          strokeWidth="1.2"
          strokeDasharray="2 3"
          opacity="0.8"
        />

        {/* Outer continuous thin gold ring */}
        <circle
          cx="80"
          cy="80"
          r="70"
          stroke="url(#vjGoldGrad)"
          strokeWidth="1.5"
        />

        {/* Inner thin accent ring */}
        <circle
          cx="80"
          cy="80"
          r="63"
          stroke="url(#vjGoldGrad)"
          strokeWidth="0.8"
          opacity="0.7"
        />

        {/* Laurel wreath leaf branches - Left side */}
        <g stroke="url(#vjGoldGrad)" strokeWidth="1.2" fill="none" opacity="0.9">
          <path d="M 80 148 C 42 144 22 118 22 80 C 22 45 40 20 78 12" />
          {/* Leaves along left arc */}
          <path d="M 30 110 C 24 106 20 114 26 118 C 30 116 32 112 30 110 Z" fill="url(#vjGoldGrad)" />
          <path d="M 23 92 C 16 90 14 98 20 102 C 24 99 25 94 23 92 Z" fill="url(#vjGoldGrad)" />
          <path d="M 22 74 C 15 72 15 80 21 82 C 24 80 25 76 22 74 Z" fill="url(#vjGoldGrad)" />
          <path d="M 26 56 C 20 52 23 44 28 48 C 30 52 29 55 26 56 Z" fill="url(#vjGoldGrad)" />
          <path d="M 36 38 C 32 32 37 26 42 30 C 43 35 40 38 36 38 Z" fill="url(#vjGoldGrad)" />
          <path d="M 52 23 C 49 17 56 13 60 17 C 59 22 56 24 52 23 Z" fill="url(#vjGoldGrad)" />
          <path d="M 70 14 C 69 8 77 6 79 11 C 77 15 73 16 70 14 Z" fill="url(#vjGoldGrad)" />
        </g>

        {/* Laurel wreath leaf branches - Right side */}
        <g stroke="url(#vjGoldGrad)" strokeWidth="1.2" fill="none" opacity="0.9">
          <path d="M 80 148 C 118 144 138 118 138 80 C 138 45 120 20 82 12" />
          {/* Leaves along right arc */}
          <path d="M 130 110 C 136 106 140 114 134 118 C 130 116 128 112 130 110 Z" fill="url(#vjGoldGrad)" />
          <path d="M 137 92 C 144 90 146 98 140 102 C 136 99 135 94 137 92 Z" fill="url(#vjGoldGrad)" />
          <path d="M 138 74 C 145 72 145 80 139 82 C 136 80 135 76 138 74 Z" fill="url(#vjGoldGrad)" />
          <path d="M 134 56 C 140 52 137 44 132 48 C 130 52 131 55 134 56 Z" fill="url(#vjGoldGrad)" />
          <path d="M 124 38 C 128 32 123 26 118 30 C 117 35 120 38 124 38 Z" fill="url(#vjGoldGrad)" />
          <path d="M 108 23 C 111 17 104 13 100 17 C 101 22 104 24 108 23 Z" fill="url(#vjGoldGrad)" />
          <path d="M 90 14 C 91 8 83 6 81 11 C 83 15 87 16 90 14 Z" fill="url(#vjGoldGrad)" />
        </g>

        {/* Tiny top and bottom gold ribbon knots */}
        <circle cx="80" cy="148" r="2.5" fill="url(#vjGoldGrad)" />
        <circle cx="80" cy="12" r="2.5" fill="url(#vjGoldGrad)" />

        {/* Center Intertwined V & J Monogram */}
        <text
          x="79"
          y="93"
          textAnchor="middle"
          fill="url(#vjGoldGrad)"
          fontFamily="'Great Vibes', cursive, 'Playfair Display', serif"
          fontSize="48"
          fontWeight="bold"
          fontStyle="italic"
          letterSpacing="1"
          style={{ textShadow: "0 2px 4px rgba(140, 103, 33, 0.25)" }}
        >
          VJ
        </text>
      </svg>
    </div>
  );
};

