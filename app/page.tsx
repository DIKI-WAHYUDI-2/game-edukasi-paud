"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBacksound } from "../components/BacksoundContext";
import { useTTS } from "../components/useTTS";

function MotiefBackground() {
  return (
    <>
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          background: "url('/pictures/background.png') center/cover no-repeat",
        }}
      />
      {/* Overlay putih transparan */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(255,255,255,0.55)" }}
      />
    </>
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

      <div
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 w-full"
        style={{ maxWidth: 520 }}>
        {/* Ilustrasi rumah + karakter */}
        <div className="flex items-end justify-center mb-3">
          <img
            src="/pictures/rumah dan orang.png"
            alt="Rumah Melayu dengan Bujang dan Dara"
            className="animate-bounce-gentle"
            style={{
              width: "120vw",
              maxWidth: "620px",
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
          }}>
          Yuk, Kenali Huruf Vokal dan Bagian Tubuh Kita!
        </h1>

        {/* Subjudul */}
        <p
          className="text-sm font-semibold mb-5"
          style={{ color: "#555", letterSpacing: "0.01em" }}>
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
          }}>
          MULAI BERMAIN!
          <span className="flex items-center" style={{ marginLeft: 4 }}>
            <span
              className="animate-arrow-blink"
              style={{ animationDelay: "0s", fontSize: 20, color: "#FFD700" }}>
              ▶
            </span>
            <span
              className="animate-arrow-blink"
              style={{
                animationDelay: "0.25s",
                fontSize: 20,
                color: "#FFD700",
              }}>
              ▶
            </span>
            <span
              className="animate-arrow-blink"
              style={{
                animationDelay: "0.5s",
                fontSize: 20,
                color: "#FFD700",
              }}>
              ▶
            </span>
          </span>
        </button>

        <p className="mt-4 text-xs font-semibold" style={{ color: "#8B6914" }}>
          Game Edukasi PAUD &bull; Budaya Melayu Riau
        </p>
      </div>
    </div>
  );
}
