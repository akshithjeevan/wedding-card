"use client";

import React, { useEffect, useState } from "react";

type PetalKind = "rose" | "lavender" | "jasmine" | "floret" | "leaf";

interface PetalItem {
  id: number;
  kind: PetalKind;
  left: number; // percentage across width (0 - 100%)
  size: number; // in pixels
  duration: number; // fall duration in seconds
  delay: number; // animation delay (negative so already falling on mount)
  variant: number; // 0, 1, or 2 for trajectory variation
  initialRotate: number;
}

export const FloatingPetals: React.FC = () => {
  const [petals, setPetals] = useState<PetalItem[]>([]);

  useEffect(() => {
    // Generate ~24-28 natural flower pieces matching the mauve, lilac, lavender, and blush wedding palette
    const kinds: PetalKind[] = [
      "rose",
      "lavender",
      "jasmine",
      "floret",
      "rose",
      "lavender",
      "jasmine",
      "leaf",
    ];

    const generated: PetalItem[] = Array.from({ length: 26 }).map((_, i) => {
      const duration = 9 + Math.random() * 8; // 9s to 17s
      // Negative delay ensures petals are already drifting at different heights when page opens
      const delay = -(Math.random() * duration);

      return {
        id: i,
        kind: kinds[i % kinds.length],
        left: Math.random() * 96 + 2, // 2% to 98%
        size: Math.floor(Math.random() * 10 + 16), // 16px to 26px
        duration,
        delay,
        variant: i % 3,
        initialRotate: Math.floor(Math.random() * 360),
      };
    });

    setPetals(generated);
  }, []);

  const renderPetalShape = (kind: PetalKind, size: number) => {
    switch (kind) {
      case "floret":
        // 4-petal delicate loose flower piece with gold center
        return (
          <svg
            viewBox="0 0 26 26"
            width={size}
            height={size}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-[0_2px_4px_rgba(92,42,75,0.18)]"
          >
            <defs>
              <linearGradient id={`floretGrad-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F8EEF6" />
                <stop offset="60%" stopColor="#D8ADC9" />
                <stop offset="100%" stopColor="#9C6288" />
              </linearGradient>
            </defs>
            <ellipse cx="13" cy="6" rx="4.5" ry="5.5" fill={`url(#floretGrad-${size})`} opacity="0.92" />
            <ellipse cx="13" cy="20" rx="4.5" ry="5.5" fill={`url(#floretGrad-${size})`} opacity="0.92" />
            <ellipse cx="6" cy="13" rx="5.5" ry="4.5" fill={`url(#floretGrad-${size})`} opacity="0.92" />
            <ellipse cx="20" cy="13" rx="5.5" ry="4.5" fill={`url(#floretGrad-${size})`} opacity="0.92" />
            <circle cx="13" cy="13" r="2.4" fill="#C59A41" opacity="0.95" />
          </svg>
        );

      case "lavender":
        // Lavender / Lilac teardrop petal
        return (
          <svg
            viewBox="0 0 24 32"
            width={size * 0.8}
            height={size}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-[0_2px_4px_rgba(100,60,120,0.16)]"
          >
            <defs>
              <linearGradient id={`lavGrad-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F6F0FA" />
                <stop offset="50%" stopColor="#CBB2DE" />
                <stop offset="100%" stopColor="#8966A8" />
              </linearGradient>
            </defs>
            <path
              d="M12 2 C18 6, 22 14, 20 22 C18 29, 13 31, 12 31 C11 31, 6 29, 4 22 C2 14, 6 6, 12 2 Z"
              fill={`url(#lavGrad-${size})`}
              opacity="0.9"
            />
            <path
              d="M12 5 Q11 17 12 28"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="0.75"
              strokeLinecap="round"
            />
          </svg>
        );

      case "jasmine":
        // Soft ivory white / blush blossom petal
        return (
          <svg
            viewBox="0 0 22 28"
            width={size * 0.85}
            height={size}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-[0_2px_4px_rgba(80,50,70,0.12)]"
          >
            <defs>
              <linearGradient id={`jasGrad-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="70%" stopColor="#FFF2F6" />
                <stop offset="100%" stopColor="#E5BECD" />
              </linearGradient>
            </defs>
            <path
              d="M11 2 C16 4, 20 11, 20 18 C20 24, 15 27, 11 27 C7 27, 2 24, 2 18 C2 11, 6 4, 11 2 Z"
              fill={`url(#jasGrad-${size})`}
              opacity="0.92"
            />
            <path
              d="M11 5 Q12 16 11 24"
              stroke="rgba(224, 176, 196, 0.6)"
              strokeWidth="0.65"
              strokeLinecap="round"
            />
          </svg>
        );

      case "leaf":
        // Soft eucalyptus sage green leaf snippet
        return (
          <svg
            viewBox="0 0 20 30"
            width={size * 0.7}
            height={size}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-[0_2px_4px_rgba(40,70,50,0.14)]"
          >
            <defs>
              <linearGradient id={`leafGrad-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#DCE8DC" />
                <stop offset="60%" stopColor="#9AB098" />
                <stop offset="100%" stopColor="#6C836B" />
              </linearGradient>
            </defs>
            <path
              d="M10 2 C17 8, 18 20, 10 28 C2 20, 3 8, 10 2 Z"
              fill={`url(#leafGrad-${size})`}
              opacity="0.82"
            />
            <path d="M10 4 L10 26" stroke="rgba(255,255,255,0.45)" strokeWidth="0.65" />
          </svg>
        );

      case "rose":
      default:
        // Mauve / blush rose petal with organic curve and center vein
        return (
          <svg
            viewBox="0 0 30 36"
            width={size * 0.9}
            height={size}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-[0_2px_5px_rgba(90,40,70,0.18)]"
          >
            <defs>
              <linearGradient id={`roseGrad-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F4E6F0" />
                <stop offset="50%" stopColor="#D09FB8" />
                <stop offset="100%" stopColor="#8A4A72" />
              </linearGradient>
            </defs>
            <path
              d="M15 2 C22 2, 28 8, 28 18 C28 27, 20 34, 15 34 C10 34, 2 27, 2 18 C2 8, 8 2, 15 2 Z"
              fill={`url(#roseGrad-${size})`}
              opacity="0.92"
            />
            <path
              d="M15 6 Q16 19 15 30"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
          </svg>
        );
    }
  };

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden flex justify-center select-none"
    >
      <div className="w-full sm:max-w-[480px] h-full relative overflow-hidden pointer-events-none">
        {petals.map((petal) => (
          <div
            key={petal.id}
            className="absolute will-change-transform"
            style={{
              left: `${petal.left}%`,
              top: "-40px",
              animation: `petalFall${petal.variant} ${petal.duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite`,
              animationDelay: `${petal.delay}s`,
            }}
          >
            <div
              style={{
                transform: `rotate(${petal.initialRotate}deg)`,
              }}
            >
              {renderPetalShape(petal.kind, petal.size)}
            </div>
          </div>
        ))}
      </div>

      <style jsx global>{`
        /* Variant 0: Gentle left-to-right breeze with 3D tumble */
        @keyframes petalFall0 {
          0% {
            transform: translateY(-40px) translateX(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
            opacity: 0;
          }
          8% {
            opacity: 0.95;
          }
          30% {
            transform: translateY(30vh) translateX(28px) rotateX(45deg) rotateY(160deg) rotateZ(40deg);
          }
          60% {
            transform: translateY(62vh) translateX(-18px) rotateX(110deg) rotateY(340deg) rotateZ(110deg);
          }
          85% {
            transform: translateY(88vh) translateX(22px) rotateX(160deg) rotateY(500deg) rotateZ(190deg);
            opacity: 0.9;
          }
          100% {
            transform: translateY(106vh) translateX(-10px) rotateX(210deg) rotateY(640deg) rotateZ(270deg);
            opacity: 0;
          }
        }

        /* Variant 1: Swaying right-to-left drift with flip */
        @keyframes petalFall1 {
          0% {
            transform: translateY(-40px) translateX(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.9;
          }
          35% {
            transform: translateY(35vh) translateX(-32px) rotateX(60deg) rotateY(-140deg) rotateZ(-30deg);
          }
          65% {
            transform: translateY(68vh) translateX(25px) rotateX(130deg) rotateY(-320deg) rotateZ(-90deg);
          }
          90% {
            transform: translateY(92vh) translateX(-15px) rotateX(190deg) rotateY(-480deg) rotateZ(-150deg);
            opacity: 0.85;
          }
          100% {
            transform: translateY(106vh) translateX(12px) rotateX(240deg) rotateY(-600deg) rotateZ(-210deg);
            opacity: 0;
          }
        }

        /* Variant 2: Fluttering spiral descent */
        @keyframes petalFall2 {
          0% {
            transform: translateY(-40px) translateX(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
            opacity: 0;
          }
          7% {
            opacity: 0.95;
          }
          25% {
            transform: translateY(24vh) translateX(-15px) rotateX(30deg) rotateY(90deg) rotateZ(60deg);
          }
          50% {
            transform: translateY(52vh) translateX(35px) rotateX(90deg) rotateY(230deg) rotateZ(140deg);
          }
          75% {
            transform: translateY(78vh) translateX(-25px) rotateX(150deg) rotateY(410deg) rotateZ(220deg);
            opacity: 0.9;
          }
          100% {
            transform: translateY(106vh) translateX(18px) rotateX(210deg) rotateY(580deg) rotateZ(310deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
