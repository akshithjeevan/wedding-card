"use client";

import React from "react";

interface FloralCornerProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
  size?: number;
}

export const FloralCorner: React.FC<FloralCornerProps> = ({
  position = "top-left",
  className = "",
  size = 200,
}) => {
  // Determine transforms based on corner position
  const getTransform = () => {
    switch (position) {
      case "top-right":
        return "scaleX(-1)";
      case "bottom-left":
        return "scaleY(-1)";
      case "bottom-right":
        return "scale(-1, -1)";
      default:
        return "none";
    }
  };

  return (
    <div
      className={`pointer-events-none select-none transition-opacity duration-700 ${className}`}
      style={{
        position: "absolute",
        width: `${size}px`,
        height: `${size}px`,
        transform: getTransform(),
        zIndex: 10,
        ...(position === "top-left" ? { top: 0, left: 0 } : {}),
        ...(position === "top-right" ? { top: 0, right: 0 } : {}),
        ...(position === "bottom-left" ? { bottom: 0, left: 0 } : {}),
        ...(position === "bottom-right" ? { bottom: 0, right: 0 } : {}),
      }}
    >
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        <defs>
          <linearGradient id="leafDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E4D32" />
            <stop offset="50%" stopColor="#123D25" />
            <stop offset="100%" stopColor="#082012" />
          </linearGradient>

          <linearGradient id="leafLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3F7A54" />
            <stop offset="60%" stopColor="#255839" />
            <stop offset="100%" stopColor="#123D25" />
          </linearGradient>

          <linearGradient id="petalWhite" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#F9F6EE" />
            <stop offset="100%" stopColor="#EADBCE" />
          </linearGradient>

          <radialGradient id="flowerCenter" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E5C67C" />
            <stop offset="60%" stopColor="#C49A43" />
            <stop offset="100%" stopColor="#8C6721" />
          </radialGradient>
        </defs>

        {/* --- BACKGROUND LEAVES --- */}
        <path
          d="M 5 5 Q 70 20 145 65 Q 110 85 55 50 Z"
          fill="url(#leafDark)"
          opacity="0.95"
        />
        <path
          d="M 5 5 Q 70 20 145 65"
          stroke="#427A58"
          strokeWidth="1"
          opacity="0.6"
        />

        <path
          d="M 5 5 Q 20 70 65 145 Q 85 110 50 55 Z"
          fill="url(#leafDark)"
          opacity="0.95"
        />

        <path
          d="M 35 25 Q 95 30 115 15 Q 105 50 60 45 Z"
          fill="url(#leafLight)"
        />
        <path
          d="M 25 35 Q 30 95 15 115 Q 50 105 45 60 Z"
          fill="url(#leafLight)"
        />

        <path
          d="M 70 60 Q 120 80 135 75 Q 115 100 80 80 Z"
          fill="url(#leafLight)"
          opacity="0.9"
        />

        {/* --- MAIN WHITE LILY / JASMINE --- */}
        <path
          d="M 45 45 C 55 20 90 25 95 40 C 85 55 60 55 45 45 Z"
          fill="url(#petalWhite)"
          stroke="#E0D2C3"
          strokeWidth="0.5"
        />
        <path
          d="M 45 45 C 70 55 75 90 60 95 C 45 85 45 60 45 45 Z"
          fill="url(#petalWhite)"
          stroke="#E0D2C3"
          strokeWidth="0.5"
        />
        <path
          d="M 45 45 C 35 70 15 80 10 65 C 20 50 35 48 45 45 Z"
          fill="url(#petalWhite)"
          stroke="#E0D2C3"
          strokeWidth="0.5"
        />
        <path
          d="M 45 45 C 25 35 15 15 30 10 C 45 20 43 35 45 45 Z"
          fill="url(#petalWhite)"
          stroke="#E0D2C3"
          strokeWidth="0.5"
        />
        <path
          d="M 45 45 C 40 18 62 10 70 22 C 65 35 55 42 45 45 Z"
          fill="url(#petalWhite)"
          stroke="#E0D2C3"
          strokeWidth="0.5"
        />

        {/* Golden pistils / stamen center */}
        <circle cx="45" cy="45" r="7.5" fill="url(#flowerCenter)" />
        <circle cx="43" cy="43" r="2.5" fill="#FFE5A3" />
        <circle cx="40" cy="40" r="1.2" fill="#8C6721" />
        <circle cx="49" cy="42" r="1.2" fill="#8C6721" />
        <circle cx="47" cy="49" r="1.2" fill="#8C6721" />
        <circle cx="41" cy="48" r="1.2" fill="#8C6721" />

        {/* --- SECONDARY SMALL FLOWER (JASMINE BLOSSOM) --- */}
        <g transform="translate(65, 55) scale(0.65)">
          <path d="M 30 30 C 40 10 60 15 65 28 C 55 40 40 40 30 30 Z" fill="url(#petalWhite)" />
          <path d="M 30 30 C 50 38 52 62 40 68 C 30 60 30 42 30 30 Z" fill="url(#petalWhite)" />
          <path d="M 30 30 C 22 48 8 52 5 42 C 12 32 22 32 30 30 Z" fill="url(#petalWhite)" />
          <path d="M 30 30 C 18 22 10 8 20 5 C 30 12 30 22 30 30 Z" fill="url(#petalWhite)" />
          <circle cx="30" cy="30" r="5" fill="url(#flowerCenter)" />
        </g>

        {/* Decorative gold dots */}
        <circle cx="120" cy="45" r="1.5" fill="#C49A43" opacity="0.7" />
        <circle cx="48" cy="120" r="1.5" fill="#C49A43" opacity="0.7" />
        <circle cx="100" cy="95" r="1" fill="#E5C67C" opacity="0.8" />
      </svg>
    </div>
  );
};
