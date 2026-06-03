"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { hurufVokalData } from "../../components/data";
import PopupSelesai from "../../components/PopupSelesai";

import { useBacksound } from "../../components/BacksoundContext";

// Helper: kalau emoji berupa path gambar (mulai dengan /), render <img>, kalau tidak render teks
function EmojiOrImage({ value, size = 32 }: { value: string; size?: number }) {
  if (value.startsWith("/")) {
    return (
      <img
        src={value}
        alt="emoji"
        width={size}
        height={size}
        style={{ objectFit: "contain" }}
      />
    );
  }
  return <span style={{ fontSize: size }}>{value}</span>;
}

export default function HurufVokalPage() {
  const router = useRouter();
  const [activeHuruf, setActiveHuruf] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sudahDiputar, setSudahDiputar] = useState<Set<string>>(new Set());
  const [selesai, setSelesai] = useState(false);

  const { duck, unduck } = useBacksound();

  const playSound = (huruf: string) => {
    if (isPlaying) return;
    setActiveHuruf(huruf);
    setIsPlaying(true);
    duck();

    const audio = new Audio(`/voices/Huruf ${huruf.toUpperCase()}.mp3`);
    audio.play().catch(() => {
      setIsPlaying(false);
      unduck();
      setTimeout(() => setActiveHuruf(null), 300);
    });

    audio.onended = () => {
      setIsPlaying(false);
      unduck();
      setTimeout(() => setActiveHuruf(null), 300);
      // Tandai huruf ini sudah diputar
      setSudahDiputar((prev) => {
        const next = new Set(prev);
        next.add(huruf);
        // Kalau semua 5 huruf sudah diputar, tampilkan popup selesai
        if (next.size >= hurufVokalData.length) {
          setTimeout(() => setSelesai(true), 400);
        }
        return next;
      });
    };

    audio.onerror = () => {
      setIsPlaying(false);
      setTimeout(() => setActiveHuruf(null), 300);
    };
  };

  const handleMainLagi = () => {
    setSudahDiputar(new Set());
    setSelesai(false);
    setActiveHuruf(null);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden"
      style={{
        background: "url('/pictures/background.png') center/cover no-repeat",
      }}>
      {/* Overlay */}
      <div className="absolute inset-0" style={{ background: "rgba(102,126,234,0.7)" }} />
      {/* Dekorasi */}
      <div className="absolute inset-0 pointer-events-none">
        {["🔤", "📝", "✏️", "📚", "🎨"].map((icon, i) => (
          <span
            key={i}
            className="absolute text-3xl animate-float"
            style={{
              left: `${5 + i * 20}%`,
              top: `${3 + (i % 3) * 10}%`,
              animationDelay: `${i * 0.5}s`,
              opacity: 0.4,
            }}>
            {icon}
          </span>
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-6">
        <div className="text-5xl mb-2 animate-bounce-gentle">🔤</div>
        <h1 className="text-3xl font-black text-white">Huruf Vokal</h1>
        <p className="text-purple-200 mt-1 font-semibold text-sm">
          Klik huruf untuk dengar bunyinya!
        </p>
      </div>

      {/* Tombol Huruf */}
      <div className="relative z-10 flex flex-wrap justify-center gap-4 mb-8 max-w-sm">
        {hurufVokalData.map((item) => (
          <button
            key={item.huruf}
            onClick={() => playSound(item.huruf)}
            className="btn-game card-game w-24 h-24 flex flex-col items-center justify-center gap-1 text-white font-black"
            style={{
              background:
                activeHuruf === item.huruf
                  ? `linear-gradient(135deg, ${item.warnaGelap}, ${item.warna})`
                  : `linear-gradient(135deg, ${item.warna}, ${item.warnaGelap})`,
              boxShadow:
                activeHuruf === item.huruf
                  ? `0 2px 0 ${item.warnaGelap}, 0 0 20px ${item.warna}`
                  : `0 6px 0 ${item.warnaGelap}`,
              transform: activeHuruf === item.huruf ? "translateY(4px)" : "",
              outline: sudahDiputar.has(item.huruf) ? "3px solid white" : "none",
            }}>
            <span className="text-4xl">{item.huruf}</span>
            <EmojiOrImage value={item.emoji} size={item.emoji.startsWith('/') ? 52 : 28} />
          </button>
        ))}
      </div>

      {/* Info aktif */}
      <div className="relative z-10 h-20 flex flex-col items-center justify-center">
        {activeHuruf ? (
          (() => {
            const item = hurufVokalData.find((h) => h.huruf === activeHuruf);
            return (
              <div
                className="animate-pop-in card-game px-8 py-4 text-center"
                style={{ background: "white" }}>
                <div
                  className="flex items-center justify-center gap-2 text-4xl font-black"
                  style={{ color: item?.warna }}>
                  <span>
                    {activeHuruf} — {item?.contoh}
                  </span>
                  <EmojiOrImage value={item?.emoji ?? ""} size={(item?.emoji ?? '').startsWith('/') ? 56 : 36} />
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  🔊 Sedang berbunyi...
                </div>
              </div>
            );
          })()
        ) : (
          <div className="text-white text-center opacity-70 text-sm font-semibold">
            👆 Tekan salah satu huruf vokal di atas!
          </div>
        )}
      </div>

      {/* Tombol Kembali */}
      <button
        onClick={() => !isPlaying && router.push("/menu")}
        disabled={isPlaying}
        className="btn-game mt-4 relative z-10 px-6 py-3 rounded-full font-bold text-white text-sm"
        style={{
          background: isPlaying ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.2)",
          opacity: isPlaying ? 0.5 : 1,
          cursor: isPlaying ? "not-allowed" : "pointer",
        }}>
        ← Kembali ke Menu
      </button>

      {/* Popup Selesai */}
      <PopupSelesai show={selesai} onMainLagi={handleMainLagi} />
    </div>
  );
}
