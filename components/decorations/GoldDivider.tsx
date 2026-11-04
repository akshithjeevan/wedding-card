"use client";

import React from "react";

interface GoldDividerProps {
  className?: string;
  width?: number | string;
  variant?: "flourish" | "diamond" | "minimal";
}

export const GoldDivider: React.FC<GoldDividerProps> = ({
  className = "",
  width = 280,
  variant = "flourish",
}) => {
  return (
    <div
      className={`flex items-center justify-center my-4 select-none pointer-events-none ${className}`}
      style={{ width: typeof width === "number" ? `${width}px` : width }}
    >
      <svg
        viewBox="0 0 300 24"
        width="100%"
        height="24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="goldDivGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C49A43" stopOpacity="0" />
            <stop offset="25%" stopColor="#C49A43" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#E5C67C" />
            <stop offset="75%" stopColor="#C49A43" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#C49A43" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Left tapering horizontal rule */}
        <line
          x1="10"
          y1="12"
          x2="125"
          y2="12"
          stroke="url(#goldDivGrad)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* Right tapering horizontal rule */}
        <line
          x1="175"
          y1="12"
          x2="290"
          y2="12"
          stroke="url(#goldDivGrad)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {variant === "flourish" && (
          <g transform="translate(150, 12)">
            {/* Center diamond & tiny scroll */}
            <circle cx="0" cy="0" r="3.5" fill="#C49A43" />
            <circle cx="0" cy="0" r="1.8" fill="#FFF9ED" />

            {/* Left flourish scroll */}
            <path
              d="M -6 0 C -12 -5 -18 2 -10 4 C -6 5 -4 2 -4 0"
              stroke="#C49A43"
              strokeWidth="1"
              fill="none"
            />
            {/* Right flourish scroll */}
            <path
              d="M 6 0 C 12 -5 18 2 10 4 C 6 5 4 2 4 0"
              stroke="#C49A43"
              strokeWidth="1"
              fill="none"
            />

            {/* Small accent dots */}
            <circle cx="-16" cy="0" r="1.5" fill="#C49A43" />
            <circle cx="16" cy="0" r="1.5" fill="#C49A43" />
          </g>
        )}

        {variant === "diamond" && (
          <g transform="translate(150, 12)">
            <polygon points="0,-4 4,0 0,4 -4,0" fill="#C49A43" />
            <circle cx="-10" cy="0" r="1.5" fill="#C49A43" />
            <circle cx="10" cy="0" r="1.5" fill="#C49A43" />
          </g>
        )}

        {variant === "minimal" && (
          <g transform="translate(150, 12)">
            <circle cx="0" cy="0" r="2.5" fill="#C49A43" />
          </g>
        )}
      </svg>
    </div>
  );
};

