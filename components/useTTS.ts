import { useRef, useState } from "react";
import { useBacksound } from "./BacksoundContext";

const audioMap: Record<string, string> = {
  // Anggota tubuh
  "Tenggorokan": "/sounds/tenggorokan.mp3",
  "Bokong": "/sounds/bokong.mp3",
  "Otot": "/sounds/otot.mp3",
  "Otak": "/sounds/otak.mp3",
  "Kepala": "/sounds/kepala.mp3",
  "Tangan": "/sounds/tangan.mp3",
  "Mata": "/sounds/mata.mp3",
  "Kaki": "/sounds/kaki.mp3",
  // Suku kata
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
  // Feedback
  "Hebat! Jawabanmu benar!": "/sounds/benar.mp3",
  "Coba lagi ya!": "/sounds/salah.mp3",
  // Kata utuh
  "jadi... Tenggorokan": "/sounds/jadi-tenggorokan.mp3",
  "jadi... Bokong": "/sounds/jadi-bokong.mp3",
  "jadi... Otot": "/sounds/jadi-otot.mp3",
  "jadi... Otak": "/sounds/jadi-otak.mp3",
  "jadi... Kepala": "/sounds/jadi-kepala.mp3",
  "jadi... Tangan": "/sounds/jadi-tangan.mp3",
  "jadi... Mata": "/sounds/jadi-mata.mp3",
  "jadi... Kaki": "/sounds/jadi-kaki.mp3",
  // Navigasi
  "Mulai bermain!": "/voices/mulai-bermain.mp3",
  "Pilih permainan!": "/voices/pilih-permainan.mp3",
  "Ayo, kenali huruf-huruf vokal!": "/voices/ayo-huruf-vokal.mp3",
  "Ayo, kenali anggota tubuh!": "/voices/ayo-anggota-tubuh.mp3",
  "Ayo, belajar mengeja kata!": "/voices/ayo-mengeja-kata.mp3",
  "Ayo, belajar tebak huruf yang hilang!": "/voices/ayo-tebak-huruf.mp3",
};

export function useTTS() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { duck, unduck } = useBacksound();

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.onended = null;
      audioRef.current.onerror = null;
      audioRef.current = null;
    }
    setIsPlaying(false);
    unduck();
  };

  const speak = (text: string): Promise<void> => {
    return new Promise((resolve) => {
      stop();

      const audioPath = audioMap[text];
      if (!audioPath) {
        console.warn(`Audio tidak ditemukan: "${text}"`);
        resolve();
        return;
      }

      const audio = new Audio(audioPath);
      audioRef.current = audio;

      const done = () => {
        setIsPlaying(false);
        unduck();
        resolve();
      };

      audio.onended = done;
      // onerror: resolve tetap dipanggil supaya tidak hang selamanya
      audio.onerror = () => {
        console.warn(`Gagal load audio: ${audioPath}`);
        done();
      };

      duck();
      setIsPlaying(true);

      audio.play().catch((err) => {
        // Autoplay diblokir atau file tidak ada — selesaikan tanpa error
        console.warn(`audio.play() gagal: ${err?.message}`);
        done();
      });
    });
  };

  const speakSequence = async (texts: string[], delayMs = 300) => {
    for (const text of texts) {
      await speak(text);
      if (delayMs > 0) await new Promise((r) => setTimeout(r, delayMs));
    }
  };

  return { speak, speakSequence, stop, isPlaying };
}
