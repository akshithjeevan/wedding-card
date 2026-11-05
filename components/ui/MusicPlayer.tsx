"use client";

import React, { useEffect, useRef, useState } from "react";

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("wedding-music-state", { detail: { isPlaying } })
      );
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0.65;
    audio.preload = "auto";
    audio.src = "/api/audio";

    const handlePlay = () => {
      setIsPlaying(true);
      isPlayingRef.current = true;
      window.dispatchEvent(
        new CustomEvent("wedding-music-state", { detail: { isPlaying: true } })
      );
    };

    const handlePause = () => {
      setIsPlaying(false);
      isPlayingRef.current = false;
      window.dispatchEvent(
        new CustomEvent("wedding-music-state", { detail: { isPlaying: false } })
      );
    };

    const handleError = () => {
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
      const a = audioRef.current;
      if (!a || isPlayingRef.current) return;
      try {
        a.volume = 0.65;
        await a.play();
        setIsPlaying(true);
        isPlayingRef.current = true;
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "NotAllowedError") {
          setIsPlaying(false);
          isPlayingRef.current = false;
          return;
        }
        try {
          if (!a.src.includes("/audio/bg-music.mp3")) {
            a.src = "/audio/bg-music.mp3";
            a.volume = 0.65;
            a.load();
            await a.play();
            setIsPlaying(true);
            isPlayingRef.current = true;
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

    const handleRemoteToggle = async () => {
      const a = audioRef.current;
      if (!a) return;
      if (isPlayingRef.current) {
        a.pause();
        setIsPlaying(false);
        isPlayingRef.current = false;
      } else {
        await startAudio();
      }
    };

    window.addEventListener("wedding-play-music", handleRemotePlay);
    window.addEventListener("wedding-toggle-music", handleRemoteToggle);

    (window as unknown as { __playWeddingMusic?: () => void }).__playWeddingMusic = () => {
      if (!isPlayingRef.current) {
        startAudio();
      }
    };

    return () => {
      window.removeEventListener("wedding-play-music", handleRemotePlay);
      window.removeEventListener("wedding-toggle-music", handleRemoteToggle);
      delete (window as unknown as { __playWeddingMusic?: () => void }).__playWeddingMusic;
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("error", handleError);
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Invisible background audio controller - Controlled exclusively via bottom navbar
  return null;
};
