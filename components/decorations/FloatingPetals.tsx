"use client";

import React, { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  rotate: number;
  opacity: number;
  color: string;
}

export const FloatingPetals: React.FC = () => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // Generate an array of gentle floating petals and gold speckles
    const colors = [
      "rgba(255, 255, 255, 0.85)", // White Jasmine petal
      "rgba(247, 238, 221, 0.75)", // Cream petal
      "rgba(229, 198, 124, 0.65)", // Champagne gold sparkle
      "rgba(196, 154, 67, 0.5)",  // Gold dust
    ];

    const initialPetals: Petal[] = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 12 + 8,
      duration: Math.random() * 8 + 10,
      delay: Math.random() * 8,
      rotate: Math.random() * 360,
      opacity: Math.random() * 0.4 + 0.35,
      color: colors[i % colors.length],
    }));

    setPetals(initialPetals);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-20 select-none"
    >
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute rounded-[50%_0_50%_50%]"
          style={{
            left: `${petal.left}%`,
            top: "-5%",
            width: `${petal.size}px`,
            height: `${petal.size * 0.8}px`,
            backgroundColor: petal.color,
            boxShadow: "0 2px 6px rgba(196, 154, 67, 0.15)",
            animation: `floatPetal ${petal.duration}s linear infinite`,
            animationDelay: `${petal.delay}s`,
            opacity: petal.opacity,
            transform: `rotate(${petal.rotate}deg)`,
          }}
        />
      ))}

      <style jsx global>{`
        @keyframes floatPetal {
          0% {
            transform: translateY(0vh) translateX(0px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          50% {
            transform: translateY(50vh) translateX(40px) rotate(180deg);
            opacity: 0.6;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(105vh) translateX(-20px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

