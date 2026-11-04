"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    // Create HTMLAudioElement client-side to avoid SSR issues
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0.6;
    audio.preload = "auto";

    // Primary route: /api/audio (served dynamically directly from disk)
    // Fallback: /audio/bg-music.mp3
    audio.src = "/api/audio";

    const handlePlay = () => {
      setIsPlaying(true);
      isPlayingRef.current = true;
    };
    const handlePause = () => {
      setIsPlaying(false);
      isPlayingRef.current = false;
    };
    const handleError = () => {
      console.warn("API audio load failed, switching to static fallback...");
      if (!audio.src.includes("/audio/bg-music.mp3")) {
        audio.src = "/audio/bg-music.mp3";
        audio.load();
      }
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("error", handleError);

    audioRef.current = audio;

    const startAudio = async () => {
      const audio = audioRef.current;
      if (!audio || isPlayingRef.current) return;

      setHasInteracted(true);
      try {
        audio.volume = 0.65;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
          isPlayingRef.current = true;
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "NotAllowedError") {
          // Expected browser policy: autoplay without gesture is blocked until user interacts
          setIsPlaying(false);
          isPlayingRef.current = false;
          return;
        }

        // Try static fallback if API streaming failed
        try {
          if (!audio.src.includes("/audio/bg-music.mp3")) {
            audio.src = "/audio/bg-music.mp3";
            audio.volume = 0.65;
            audio.load();
            const fallbackPromise = audio.play();
            if (fallbackPromise !== undefined) {
              await fallbackPromise;
              setIsPlaying(true);
              isPlayingRef.current = true;
            }
          }
        } catch {
          setIsPlaying(false);
          isPlayingRef.current = false;
        }
      }
    };

    const handleRemotePlay = () => {
      if (!isPlayingRef.current) {
        startAudio();
      }
    };

    window.addEventListener("wedding-play-music", handleRemotePlay);
    (window as unknown as { __playWeddingMusic?: () => void }).__playWeddingMusic = () => {
      if (!isPlayingRef.current) {
        startAudio();
      }
    };

    return () => {
      window.removeEventListener("wedding-play-music", handleRemotePlay);
      delete (window as unknown as { __playWeddingMusic?: () => void }).__playWeddingMusic;
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("error", handleError);
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggleMusic = async () => {
    setHasInteracted(true);
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "NotAllowedError") {
          setIsPlaying(false);
          return;
        }
        try {
          audio.src = "/audio/bg-music.mp3";
          audio.load();
          await audio.play();
          setIsPlaying(true);
        } catch {
          setIsPlaying(false);
        }
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
      {!hasInteracted && (
        <span className="hidden sm:inline-block px-3 py-1 text-xs rounded-full bg-[#123D25] text-[#E5C67C] border border-[#C49A43] shadow-lg animate-pulse font-medium">
          Play Wedding Music ♫
        </span>
      )}

      <div className="relative flex items-center justify-center">
        {/* Orbit Ring with Golden Bead (Turntable / Celestial Orbit aesthetic) */}
        <div
          className={`absolute -inset-2 pointer-events-none transition-opacity duration-500 ${
            isPlaying ? "opacity-100" : "opacity-0"
          }`}
        >
          <svg
            viewBox="0 0 68 68"
            className="w-full h-full animate-[spin_12s_linear_infinite]"
          >
            {/* Outer thin gold continuous track */}
            <circle
              cx="34"
              cy="34"
              r="30"
              fill="none"
              stroke="#C49A43"
              strokeWidth="1.2"
              opacity="0.85"
            />
            {/* Golden orbiting bead at 12 o'clock */}
            <circle
              cx="34"
              cy="4"
              r="2.8"
              fill="#E5C67C"
              stroke="#C49A43"
              strokeWidth="0.8"
            />
          </svg>
        </div>

        <button
          onClick={toggleMusic}
          aria-label={isPlaying ? "Mute Background Music" : "Play Wedding Music"}
          className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 shadow-xl ${
            isPlaying
              ? "bg-[#123D25] text-[#E5C67C] border-[#C49A43] scale-105"
              : "bg-[#FFF9ED] text-[#700D20] border-[#C49A43] hover:scale-105"
          }`}
        >
          {isPlaying ? (
            <Volume2 className="w-5 h-5 animate-pulse" />
          ) : (
            <VolumeX className="w-5 h-5 opacity-70" />
          )}
        </button>
      </div>
    </div>
  );
};

