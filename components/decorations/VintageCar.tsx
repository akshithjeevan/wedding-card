"use client";

import React from "react";

interface VintageCarProps {
  className?: string;
  size?: number;
}

export const VintageCar: React.FC<VintageCarProps> = ({
  className = "",
  size = 64,
}) => {
  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size * 0.6 }}
    >
      <svg
        viewBox="0 0 100 60"
        width={size}
        height={size * 0.6}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        <defs>
          <linearGradient id="carBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E5C38" />
            <stop offset="60%" stopColor="#123D25" />
            <stop offset="100%" stopColor="#082012" />
          </linearGradient>
          <linearGradient id="carRoofGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF9ED" />
            <stop offset="100%" stopColor="#E5D8BE" />
          </linearGradient>
          <linearGradient id="carGoldTrim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E5C67C" />
            <stop offset="50%" stopColor="#C49A43" />
            <stop offset="100%" stopColor="#8C6721" />
          </linearGradient>
        </defs>

        {/* Vintage Car Upper Cabin Roof */}
        <path
          d="M 28 26 C 30 15 40 10 55 10 C 70 10 76 18 80 26 Z"
          fill="url(#carRoofGrad)"
          stroke="#C49A43"
          strokeWidth="1.2"
        />

        {/* Windows */}
        <path
          d="M 33 24 C 34 16 42 13 52 13 L 52 24 Z"
          fill="#D6E4DE"
          stroke="#123D25"
          strokeWidth="0.8"
        />
        <path
          d="M 56 24 L 56 13 C 66 13 71 18 75 24 Z"
          fill="#D6E4DE"
          stroke="#123D25"
          strokeWidth="0.8"
        />

        {/* Main Chassis Body */}
        <path
          d="M 6 36 C 6 30 12 28 25 26 L 82 26 C 92 27 96 32 96 38 C 96 43 92 46 88 46 L 78 46 C 77 40 70 36 64 36 C 58 36 51 40 50 46 L 36 46 C 35 40 28 36 22 36 C 16 36 9 40 8 46 L 6 44 Z"
          fill="url(#carBodyGrad)"
          stroke="url(#carGoldTrim)"
          strokeWidth="1.2"
        />

        {/* Gold Accent Side Moulding */}
        <line x1="12" y1="33" x2="90" y2="33" stroke="url(#carGoldTrim)" strokeWidth="1.2" />

        {/* Front & Rear Bumpers */}
        <rect x="2" y="40" width="5" height="4" rx="1.5" fill="url(#carGoldTrim)" />
        <rect x="94" y="38" width="5" height="4" rx="1.5" fill="url(#carGoldTrim)" />

        {/* Headlight */}
        <circle cx="94" cy="32" r="3" fill="#FFF7CC" stroke="#C49A43" strokeWidth="1" />

        {/* Wheels */}
        {/* Left Wheel */}
        <g transform="translate(22, 44)">
          <circle cx="0" cy="0" r="8" fill="#1C1814" stroke="#524335" strokeWidth="1" />
          <circle cx="0" cy="0" r="5" fill="#E5C67C" stroke="#C49A43" strokeWidth="0.8" />
          <circle cx="0" cy="0" r="2" fill="#524335" />
        </g>

        {/* Right Wheel */}
        <g transform="translate(64, 44)">
          <circle cx="0" cy="0" r="8" fill="#1C1814" stroke="#524335" strokeWidth="1" />
          <circle cx="0" cy="0" r="5" fill="#E5C67C" stroke="#C49A43" strokeWidth="0.8" />
          <circle cx="0" cy="0" r="2" fill="#524335" />
        </g>
      </svg>
    </div>
  );
};

