import { useRef, useState } from "react";

const audioMap: Record<string, string> = {
  "Tenggorokan": "/sounds/tenggorokan.mp3",
  "Bokong": "/sounds/bokong.mp3",
  "Otot": "/sounds/otot.mp3",
  "Otak": "/sounds/otak.mp3",
  "Kepala": "/sounds/kepala.mp3",
  "Tangan": "/sounds/tangan.mp3",
  "Mata": "/sounds/mata.mp3",
  "Kaki": "/sounds/kaki.mp3",
  "teng": "/sounds/teng.mp3",
  "go": "/sounds/go.mp3",
  "ro": "/sounds/ro.mp3",
  "kan": "/sounds/kan.mp3",
  "bo": "/sounds/bo.mp3",
  "kong": "/sounds/kong.mp3",
  "o": "/sounds/o.mp3",
  "tot": "/sounds/tot.mp3",
  "tak": "/sounds/tak.mp3",
  "ke": "/sounds/ke.mp3",
  "pa": "/sounds/pa.mp3",
  "la": "/sounds/la.mp3",
  "ngan": "/sounds/ngan.mp3",
  "ta": "/sounds/ta.mp3",
  "ma": "/sounds/ma.mp3",
  "ki": "/sounds/ki.mp3",
  "ka": "/sounds/ka.mp3",
  "Hebat! Jawabanmu benar!": "/sounds/benar.mp3",
  "Coba lagi ya!": "/sounds/salah.mp3",
  "jadi... Tenggorokan": "/sounds/jadi-tenggorokan.mp3",
  "jadi... Bokong": "/sounds/jadi-bokong.mp3",
  "jadi... Otot": "/sounds/jadi-otot.mp3",
  "jadi... Otak": "/sounds/jadi-otak.mp3",
  "jadi... Kepala": "/sounds/jadi-kepala.mp3",
  "jadi... Tangan": "/sounds/jadi-tangan.mp3",
  "jadi... Mata": "/sounds/jadi-mata.mp3",
  "jadi... Kaki": "/sounds/jadi-kaki.mp3",
};

function getAudio(text: string): HTMLAudioElement | null {
  const audioPath = audioMap[text];
  if (!audioPath) {
    console.warn(`Audio tidak ditemukan untuk: "${text}"`);
    return null;
  }
  const audio = new Audio(audioPath);
  return audio;
}

export function useTTS() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Stop audio yang sedang berjalan dan reset isPlaying
  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.onended = null;
      audioRef.current.onerror = null;
      audioRef.current = null;
    }
    setIsPlaying(false);
  };

  const speak = async (text: string) => {
    // Selalu stop dulu audio sebelumnya, lalu langsung play — tidak cek isPlaying
    stop();

    const audio = getAudio(text);
    if (!audio) return;

    setIsPlaying(true);
    audioRef.current = audio;
    audio.onended = () => setIsPlaying(false);
    audio.onerror = () => setIsPlaying(false);

    try {
      await audio.play();
    } catch (err) {
      console.error("Audio play error:", err);
      setIsPlaying(false);
    }
  };

  const speakSequence = async (texts: string[], delayMs = 500) => {
    stop();
    setIsPlaying(true);

    for (let i = 0; i < texts.length; i++) {
      const audio = getAudio(texts[i]);
      if (!audio) continue;

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.onended = null;
        audioRef.current.onerror = null;
      }
      audioRef.current = audio;

      await new Promise<void>((resolve) => {
        audio.onended = () => resolve();
        audio.onerror = () => resolve();
        audio.play().catch(() => resolve());
      });

      if (i < texts.length - 1) {
        await new Promise((r) => setTimeout(r, delayMs));
      }
    }

    setIsPlaying(false);
  };

  return { speak, speakSequence, stop, isPlaying };
}
