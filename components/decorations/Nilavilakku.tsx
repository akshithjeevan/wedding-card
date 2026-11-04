"use client";

import React from "react";

interface NilavilakkuProps {
  className?: string;
  size?: number;
  showFabric?: boolean;
}

export const Nilavilakku: React.FC<NilavilakkuProps> = ({
  className = "",
  size = 180,
  showFabric = true,
}) => {
  return (
    <div
      className={`relative inline-block select-none pointer-events-none ${className}`}
      style={{ width: size, height: size * 1.5 }}
    >
      <svg
        viewBox="0 0 200 300"
        width={size}
        height={size * 1.5}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-lg"
      >
        <defs>
          {/* Rich Brass Metallic Gradients */}
          <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8C6721" />
            <stop offset="25%" stopColor="#E5C67C" />
            <stop offset="50%" stopColor="#FFF4D0" />
            <stop offset="75%" stopColor="#C49A43" />
            <stop offset="100%" stopColor="#6E4F14" />
          </linearGradient>

          <linearGradient id="brassDark" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5A3E0C" />
            <stop offset="50%" stopColor="#A8822B" />
            <stop offset="100%" stopColor="#4A330A" />
          </linearGradient>

          {/* Flame Glow Radial */}
          <radialGradient id="flameInner" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#FFF3A1" />
            <stop offset="70%" stopColor="#FF9800" />
            <stop offset="100%" stopColor="#E65100" stopOpacity="0" />
          </radialGradient>

          {/* Kasavu Cloth Gold Border Gradient */}
          <linearGradient id="kasavuGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B8860B" />
            <stop offset="30%" stopColor="#FFD700" />
            <stop offset="60%" stopColor="#E5C67C" />
            <stop offset="100%" stopColor="#996515" />
          </linearGradient>

          {/* Fabric Shadow */}
          <linearGradient id="clothIvory" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#F7EEDD" />
            <stop offset="100%" stopColor="#E5D6BD" />
          </linearGradient>
        </defs>

        {/* --- KASAVU DRAPED FABRIC AT BASE (Optional / Kerala Tradition) --- */}
        {showFabric && (
          <g id="kasavuFabric" opacity="0.95">
            {/* Folded cream fabric pleats */}
            <path
              d="M 15 285 C 40 260 70 270 95 280 C 130 295 175 270 195 288 C 170 300 120 305 90 300 C 50 302 20 295 15 285 Z"
              fill="url(#clothIvory)"
              stroke="#D8C7A5"
              strokeWidth="0.8"
            />
            {/* Kasavu Gold Woven Border 1 */}
            <path
              d="M 22 284 C 45 264 72 272 95 281 C 130 294 170 273 190 286"
              stroke="url(#kasavuGold)"
              strokeWidth="4.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 24 286 C 46 267 73 274 96 283 C 131 296 168 276 188 288"
              stroke="#8C6721"
              strokeWidth="1.2"
              strokeDasharray="2 2"
              fill="none"
            />
            {/* Additional lower fold */}
            <path
              d="M 30 292 C 55 278 80 285 110 290 C 145 296 165 288 180 294"
              stroke="url(#kasavuGold)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        )}

        {/* --- BASE OF THE NILAVILAKKU --- */}
        {/* Lowest plate rim */}
        <ellipse cx="100" cy="275" rx="42" ry="10" fill="url(#brassDark)" />
        <ellipse cx="100" cy="272" rx="40" ry="9" fill="url(#brassGrad)" />
        <ellipse cx="100" cy="268" rx="36" ry="8" fill="url(#brassDark)" />
        <ellipse cx="100" cy="265" rx="34" ry="7" fill="url(#brassGrad)" />

        {/* Bell-shaped lower base */}
        <path
          d="M 72 265 C 75 245 88 238 92 232 L 108 232 C 112 238 125 245 128 265 Z"
          fill="url(#brassGrad)"
          stroke="#5A3E0C"
          strokeWidth="0.5"
        />

        {/* Lower decorative ring */}
        <ellipse cx="100" cy="232" rx="16" ry="4" fill="url(#brassDark)" />
        <ellipse cx="100" cy="230" rx="15" ry="3.5" fill="url(#brassGrad)" />

        {/* --- LOWER RIBBED STEM --- */}
        <path
          d="M 94 230 C 93 210 93 195 90 185 L 110 185 C 107 195 107 210 106 230 Z"
          fill="url(#brassGrad)"
        />

        {/* Center decorative bead/bulge */}
        <ellipse cx="100" cy="185" rx="14" ry="7" fill="url(#brassDark)" />
        <ellipse cx="100" cy="183" rx="13" ry="6" fill="url(#brassGrad)" />
        <circle cx="100" cy="183" r="3" fill="#FFF4D0" opacity="0.6" />

        {/* Upper stem segment */}
        <path
          d="M 92 181 C 93 160 92 145 88 135 L 112 135 C 108 145 107 160 108 181 Z"
          fill="url(#brassGrad)"
        />

        {/* Upper support collar */}
        <ellipse cx="100" cy="135" rx="18" ry="5" fill="url(#brassDark)" />
        <ellipse cx="100" cy="133" rx="17" ry="4.5" fill="url(#brassGrad)" />

        {/* --- MAIN OIL DISH (THATTU) --- */}
        {/* Wide saucer to hold oil and wicks */}
        <path
          d="M 52 130 C 58 142 142 142 148 130 L 144 125 C 135 122 65 122 56 125 Z"
          fill="url(#brassDark)"
        />
        <ellipse cx="100" cy="126" rx="46" ry="11" fill="url(#brassGrad)" />
        <ellipse cx="100" cy="124" rx="42" ry="9" fill="#5A3E0C" />
        <ellipse cx="100" cy="124" rx="39" ry="8" fill="url(#brassDark)" />
        {/* Golden Oil pool reflection */}
        <ellipse cx="100" cy="124" rx="36" ry="6.5" fill="#B38016" opacity="0.8" />

        {/* --- UPPER TIER STEM & CROWN (MAKUDA) --- */}
        <path
          d="M 94 122 L 95 100 L 105 100 L 106 122 Z"
          fill="url(#brassGrad)"
        />
        {/* Small upper dish */}
        <ellipse cx="100" cy="100" rx="14" ry="4" fill="url(#brassDark)" />
        <ellipse cx="100" cy="98" rx="13" ry="3.5" fill="url(#brassGrad)" />

        {/* Sacred Bird / Ornamental Finial on top */}
        <path
          d="M 97 97 C 95 85 96 80 100 74 C 104 80 105 85 103 97 Z"
          fill="url(#brassGrad)"
        />
        <circle cx="100" cy="72" r="4" fill="url(#brassGrad)" />
        <path d="M 100 68 L 100 60" stroke="url(#brassGrad)" strokeWidth="2.5" strokeLinecap="round" />

        {/* --- RADIATING GLOWING WICK FLAMES --- */}
        {/* Center Main Flame */}
        <g id="centerFlame">
          <ellipse cx="100" cy="62" rx="12" ry="18" fill="url(#flameInner)" opacity="0.4" />
          <path
            d="M 100 48 C 96 56 94 62 96 66 C 98 70 102 70 104 66 C 106 62 104 56 100 48 Z"
            fill="#FFB300"
          />
          <path
            d="M 100 52 C 98 57 97 61 98 64 C 99 66 101 66 102 64 C 103 61 102 57 100 52 Z"
            fill="#FFF9C4"
          />
        </g>

        {/* Left Thattu Flame */}
        <g id="leftFlame" transform="translate(-36, 60)">
          <ellipse cx="94" cy="62" rx="8" ry="12" fill="url(#flameInner)" opacity="0.45" />
          <path
            d="M 94 52 C 91 58 90 62 91 65 C 92 68 95 68 96 65 C 97 62 96 58 94 52 Z"
            fill="#FFB300"
          />
          <path
            d="M 94 55 C 92 59 92 62 93 64 C 94 65 95 65 95 64 C 96 62 95 59 94 55 Z"
            fill="#FFF9C4"
          />
        </g>

        {/* Right Thattu Flame */}
        <g id="rightFlame" transform="translate(36, 60)">
          <ellipse cx="106" cy="62" rx="8" ry="12" fill="url(#flameInner)" opacity="0.45" />
          <path
            d="M 106 52 C 103 58 102 62 103 65 C 104 68 107 68 108 65 C 109 62 108 58 106 52 Z"
            fill="#FFB300"
          />
          <path
            d="M 106 55 C 104 59 104 62 105 64 C 106 65 107 65 107 64 C 108 62 107 59 106 55 Z"
            fill="#FFF9C4"
          />
        </g>
      </svg>
    </div>
  );
};

