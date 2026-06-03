"use client";
import { createContext, useContext, useEffect, useRef, useCallback } from "react";

interface BacksoundContextType {
  play: () => void;
  duck: () => void;
  unduck: () => void;
}

const BacksoundContext = createContext<BacksoundContextType>({
  play: () => {},
  duck: () => {},
  unduck: () => {},
});

export function BacksoundProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPlayingRef = useRef(false);

  const NORMAL_VOLUME = 0.3;
  const DUCK_VOLUME = 0.07;
  const FADE_STEP = 0.015;
  const FADE_INTERVAL = 40;

  const clearFade = () => {
    if (fadeRef.current) {
      clearInterval(fadeRef.current);
      fadeRef.current = null;
    }
  };

  const fadeTo = useCallback((target: number) => {
    clearFade();
    const audio = audioRef.current;
    if (!audio) return;

    fadeRef.current = setInterval(() => {
      const current = audio.volume;
      const diff = target - current;
      if (Math.abs(diff) <= FADE_STEP) {
        audio.volume = Math.max(0, Math.min(1, target));
        clearFade();
      } else {
        audio.volume = Math.max(0, Math.min(1, current + (diff > 0 ? FADE_STEP : -FADE_STEP)));
      }
    }, FADE_INTERVAL);
  }, []);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || isPlayingRef.current) return;
    audio.volume = NORMAL_VOLUME;
    audio.play().then(() => {
      isPlayingRef.current = true;
    }).catch(() => {});
  }, []);

  const duck = useCallback(() => fadeTo(DUCK_VOLUME), [fadeTo]);
  const unduck = useCallback(() => fadeTo(NORMAL_VOLUME), [fadeTo]);

  useEffect(() => {
    const audio = new Audio("/voices/backsound melayu.m4a");
    audio.loop = true;
    audio.volume = NORMAL_VOLUME;
    audioRef.current = audio;

    return () => {
      clearFade();
      audio.pause();
      audio.src = "";
    };
  }, []);

  return (
    <BacksoundContext.Provider value={{ play, duck, unduck }}>
      {children}
    </BacksoundContext.Provider>
  );
}

export function useBacksound() {
  return useContext(BacksoundContext);
}
