"use client";
import { useRouter } from "next/navigation";

interface PopupSelesaiProps {
  show: boolean;
  onMainLagi: () => void;
}

export default function PopupSelesai({ show, onMainLagi }: PopupSelesaiProps) {
  const router = useRouter();

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div
        className="animate-pop-in flex flex-col items-center text-center px-10 py-12 mx-4 w-full max-w-sm"
        style={{
          background: "#FEFDE8",
          borderRadius: 32,
          boxShadow: "0 12px 0 rgba(0,0,0,0.15)",
        }}
      >
        {/* Emoji atas */}
        <div className="flex gap-3 text-5xl mb-4">
          <span className="animate-bounce-gentle" style={{ animationDelay: "0s" }}>🎉</span>
          <span className="animate-bounce-gentle" style={{ animationDelay: "0.2s" }}>⭐</span>
          <span className="animate-bounce-gentle" style={{ animationDelay: "0.4s" }}>🎊</span>
        </div>

        {/* Judul */}
        <h2
          className="text-3xl font-black mb-2"
          style={{ color: "#7B341E" }}
        >
          Hebat, Adik! ⭐
        </h2>

        {/* Kalimat motivasi */}
        <p
          className="text-base font-bold mb-8"
          style={{ color: "#C05621" }}
        >
          Bujang dan Dara bangga dengan adik!<br />Ayo main lagi!
        </p>

        {/* Tombol Main Lagi */}
        <button
          onClick={onMainLagi}
          className="btn-game w-full py-4 rounded-2xl text-white font-black text-lg tracking-wide mb-3"
          style={{
            background: "#2D6A4F",
            boxShadow: "0 6px 0 #1B4332",
            letterSpacing: "0.05em",
          }}
        >
          MAIN LAGI 🎉
        </button>

        {/* Tombol Kembali ke Menu */}
        <button
          onClick={() => router.push("/menu")}
          className="btn-game w-full py-3 rounded-2xl font-bold text-sm"
          style={{
            background: "transparent",
            color: "#9C4221",
            border: "2px solid #C05621",
          }}
        >
          ← Kembali ke Menu
        </button>
      </div>
    </div>
  );
}
