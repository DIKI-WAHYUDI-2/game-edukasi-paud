"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBacksound } from "../components/BacksoundContext";
import { useTTS } from "../components/useTTS";

function MotiefBackground() {
  return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="motif" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <circle cx="40" cy="40" r="6" fill="none" stroke="#C8A84B" strokeWidth="1.2" opacity="0.5" />
          <circle cx="40" cy="40" r="3" fill="#C8A84B" opacity="0.3" />
          <ellipse cx="40" cy="28" rx="3" ry="7" fill="none" stroke="#C8A84B" strokeWidth="1" opacity="0.4" />
          <ellipse cx="40" cy="52" rx="3" ry="7" fill="none" stroke="#C8A84B" strokeWidth="1" opacity="0.4" />
          <ellipse cx="28" cy="40" rx="7" ry="3" fill="none" stroke="#C8A84B" strokeWidth="1" opacity="0.4" />
          <ellipse cx="52" cy="40" rx="7" ry="3" fill="none" stroke="#C8A84B" strokeWidth="1" opacity="0.4" />
          <ellipse cx="31" cy="31" rx="2.5" ry="6" transform="rotate(-45 31 31)" fill="none" stroke="#C8A84B" strokeWidth="0.8" opacity="0.3" />
          <ellipse cx="49" cy="31" rx="2.5" ry="6" transform="rotate(45 49 31)" fill="none" stroke="#C8A84B" strokeWidth="0.8" opacity="0.3" />
          <ellipse cx="31" cy="49" rx="2.5" ry="6" transform="rotate(45 31 49)" fill="none" stroke="#C8A84B" strokeWidth="0.8" opacity="0.3" />
          <ellipse cx="49" cy="49" rx="2.5" ry="6" transform="rotate(-45 49 49)" fill="none" stroke="#C8A84B" strokeWidth="0.8" opacity="0.3" />
          <polygon points="0,4 1.5,0 3,4 0,2 3,2" fill="#C8A84B" opacity="0.25" />
          <polygon points="77,4 78.5,0 80,4 77,2 80,2" fill="#C8A84B" opacity="0.25" />
          <polygon points="0,76 1.5,80 3,76 0,78 3,78" fill="#C8A84B" opacity="0.25" />
          <polygon points="77,76 78.5,80 80,76 77,78 80,78" fill="#C8A84B" opacity="0.25" />
          <line x1="0" y1="40" x2="21" y2="40" stroke="#C8A84B" strokeWidth="0.5" opacity="0.2" />
          <line x1="59" y1="40" x2="80" y2="40" stroke="#C8A84B" strokeWidth="0.5" opacity="0.2" />
          <line x1="40" y1="0" x2="40" y2="21" stroke="#C8A84B" strokeWidth="0.5" opacity="0.2" />
          <line x1="40" y1="59" x2="40" y2="80" stroke="#C8A84B" strokeWidth="0.5" opacity="0.2" />
        </pattern>
        <linearGradient id="overlay" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5F0DC" stopOpacity="0.92" />
          <stop offset="50%" stopColor="#EDE8CA" stopOpacity="0.88" />
          <stop offset="100%" stopColor="#F5F0DC" stopOpacity="0.92" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="#F5F0DC" />
      <rect width="100%" height="100%" fill="url(#motif)" />
      <rect width="100%" height="100%" fill="url(#overlay)" />
    </svg>
  );
}

export default function HomePage() {
  const router = useRouter();
  const { play } = useBacksound();
  const { speak } = useTTS();
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleMulai = async () => {
    setIsSpeaking(true);
    // 1. Putar sambutan
    await new Promise<void>((resolve) => {
      const sambutan = new Audio("/voices/sambutan-home.mp3");
      sambutan.onended = () => resolve();
      sambutan.onerror = () => resolve();
      sambutan.play().catch(() => resolve());
    });
    // 2. Jeda sebentar
    await new Promise((r) => setTimeout(r, 400));
    // 3. Putar "mulai bermain"
    await new Promise<void>((resolve) => {
      const mulai = new Audio("/voices/mulai-bermain.mp3");
      mulai.onended = () => resolve();
      mulai.onerror = () => resolve();
      mulai.play().catch(() => resolve());
    });
    // 4. Pindah ke menu
    play();
    router.push("/menu");
  };

  useEffect(() => {
    // Autoplay diblokir browser sebelum ada interaksi — dibiarkan kosong
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <MotiefBackground />

      {/* Border atas */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <div style={{ height: 12, background: "#2D6A4F", opacity: 0.85 }} />
        <div style={{ height: 4, background: "#C8A84B", opacity: 0.7 }} />
      </div>
      {/* Border bawah */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div style={{ height: 4, background: "#C8A84B", opacity: 0.7 }} />
        <div style={{ height: 12, background: "#2D6A4F", opacity: 0.85 }} />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 w-full" style={{ maxWidth: 520 }}>

        {/* Ilustrasi rumah + karakter */}
        <div className="flex items-end justify-center mb-3">
          <img
            src="/pictures/rumah dan orang.png"
            alt="Rumah Melayu dengan Bujang dan Dara"
            className="animate-bounce-gentle"
            style={{
              width: "min(360px, 72vw)",
              objectFit: "contain",
              filter: "drop-shadow(0 6px 16px rgba(0,0,0,0.2))",
              animationDelay: "0s",
            }}
          />
        </div>

        {/* Judul */}
        <h1
          className="font-black leading-tight mb-2"
          style={{
            color: "#7B2D00",
            fontSize: "clamp(1rem, 3vw, 1.6rem)",
            textTransform: "uppercase",
            letterSpacing: "0.02em",
            textShadow: "0 2px 4px rgba(0,0,0,0.08)",
          }}
        >
          Yuk, Kenali Huruf Vokal dan Bagian Tubuh Kita!
        </h1>

        {/* Subjudul */}
        <p className="text-sm font-semibold mb-5" style={{ color: "#555", letterSpacing: "0.01em" }}>
          Petualangan Bujang &amp; Dara &mdash; Nuansa Melayu Riau Siak
        </p>

        {/* Tombol Mulai */}
        <button
          onClick={handleMulai}
          disabled={isSpeaking}
          className="btn-game px-10 py-4 rounded-2xl text-white font-black text-lg shadow-lg flex items-center justify-center gap-2"
          style={{
            background: isSpeaking ? "#aaa" : "#2D6A4F",
            boxShadow: isSpeaking ? "0 6px 0 #888" : "0 6px 0 #1B4332",
            letterSpacing: "0.08em",
            minWidth: 240,
          }}
        >
          MULAI BERMAIN!
          <span className="flex items-center" style={{ marginLeft: 4 }}>
            <span className="animate-arrow-blink" style={{ animationDelay: "0s",    fontSize: 20, color: "#FFD700" }}>▶</span>
            <span className="animate-arrow-blink" style={{ animationDelay: "0.25s", fontSize: 20, color: "#FFD700" }}>▶</span>
            <span className="animate-arrow-blink" style={{ animationDelay: "0.5s",  fontSize: 20, color: "#FFD700" }}>▶</span>
          </span>
        </button>

        <p className="mt-4 text-xs font-semibold" style={{ color: "#8B6914" }}>
          Game Edukasi PAUD &bull; Budaya Melayu Riau
        </p>
      </div>
    </div>
  );
}
