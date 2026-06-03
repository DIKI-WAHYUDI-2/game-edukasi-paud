"use client";
import { useRouter } from "next/navigation";

// Motif songket Melayu Riau sebagai SVG background
function MotiefBackground() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Pola dasar motif Melayu - bunga & geometrik */}
        <pattern id="motif" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          {/* Bunga tengah */}
          <circle cx="40" cy="40" r="6" fill="none" stroke="#C8A84B" strokeWidth="1.2" opacity="0.5" />
          <circle cx="40" cy="40" r="3" fill="#C8A84B" opacity="0.3" />
          {/* Kelopak 4 arah */}
          <ellipse cx="40" cy="28" rx="3" ry="7" fill="none" stroke="#C8A84B" strokeWidth="1" opacity="0.4" />
          <ellipse cx="40" cy="52" rx="3" ry="7" fill="none" stroke="#C8A84B" strokeWidth="1" opacity="0.4" />
          <ellipse cx="28" cy="40" rx="7" ry="3" fill="none" stroke="#C8A84B" strokeWidth="1" opacity="0.4" />
          <ellipse cx="52" cy="40" rx="7" ry="3" fill="none" stroke="#C8A84B" strokeWidth="1" opacity="0.4" />
          {/* Kelopak diagonal */}
          <ellipse cx="31" cy="31" rx="2.5" ry="6" transform="rotate(-45 31 31)" fill="none" stroke="#C8A84B" strokeWidth="0.8" opacity="0.3" />
          <ellipse cx="49" cy="31" rx="2.5" ry="6" transform="rotate(45 49 31)" fill="none" stroke="#C8A84B" strokeWidth="0.8" opacity="0.3" />
          <ellipse cx="31" cy="49" rx="2.5" ry="6" transform="rotate(45 31 49)" fill="none" stroke="#C8A84B" strokeWidth="0.8" opacity="0.3" />
          <ellipse cx="49" cy="49" rx="2.5" ry="6" transform="rotate(-45 49 49)" fill="none" stroke="#C8A84B" strokeWidth="0.8" opacity="0.3" />
          {/* Sudut - bintang kecil */}
          <polygon points="0,4 1.5,0 3,4 0,2 3,2" fill="#C8A84B" opacity="0.25" />
          <polygon points="77,4 78.5,0 80,4 77,2 80,2" fill="#C8A84B" opacity="0.25" />
          <polygon points="0,76 1.5,80 3,76 0,78 3,78" fill="#C8A84B" opacity="0.25" />
          <polygon points="77,76 78.5,80 80,76 77,78 80,78" fill="#C8A84B" opacity="0.25" />
          {/* Garis penghubung */}
          <line x1="0" y1="40" x2="21" y2="40" stroke="#C8A84B" strokeWidth="0.5" opacity="0.2" />
          <line x1="59" y1="40" x2="80" y2="40" stroke="#C8A84B" strokeWidth="0.5" opacity="0.2" />
          <line x1="40" y1="0" x2="40" y2="21" stroke="#C8A84B" strokeWidth="0.5" opacity="0.2" />
          <line x1="40" y1="59" x2="40" y2="80" stroke="#C8A84B" strokeWidth="0.5" opacity="0.2" />
        </pattern>

        {/* Gradient overlay */}
        <linearGradient id="overlay" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5F0DC" stopOpacity="0.92" />
          <stop offset="50%" stopColor="#EDE8CA" stopOpacity="0.88" />
          <stop offset="100%" stopColor="#F5F0DC" stopOpacity="0.92" />
        </linearGradient>
      </defs>

      {/* Background dasar warna krem */}
      <rect width="100%" height="100%" fill="#F5F0DC" />
      {/* Lapisan motif */}
      <rect width="100%" height="100%" fill="url(#motif)" />
      {/* Overlay agar tidak terlalu ramai */}
      <rect width="100%" height="100%" fill="url(#overlay)" />

      {/* Border motif atas */}
      <rect x="0" y="0" width="100%" height="12" fill="#2D6A4F" opacity="0.85" />
      <rect x="0" y="12" width="100%" height="4" fill="#C8A84B" opacity="0.7" />
      {/* Border motif bawah */}
      <rect x="0" y="calc(100% - 12px)" width="100%" height="12" fill="#2D6A4F" opacity="0.85" />
      <rect x="0" y="calc(100% - 16px)" width="100%" height="4" fill="#C8A84B" opacity="0.7" />
    </svg>
  );
}

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background motif Melayu */}
      <MotiefBackground />

      {/* Border atas & bawah via div (lebih reliable dari SVG calc) */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <div style={{ height: 12, background: "#2D6A4F", opacity: 0.85 }} />
        <div style={{ height: 4, background: "#C8A84B", opacity: 0.7 }} />
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div style={{ height: 4, background: "#C8A84B", opacity: 0.7 }} />
        <div style={{ height: 12, background: "#2D6A4F", opacity: 0.85 }} />
      </div>

      {/* Konten utama */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-16 max-w-lg w-full">

        {/* Ikon gedung & karakter */}
        <div className="text-5xl mb-6" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))" }}>
          🏛️
        </div>
        <div className="flex gap-2 justify-center mb-6 text-5xl">
          <span className="animate-bounce-gentle" style={{ animationDelay: "0s" }}>👦🏻</span>
          <span className="animate-bounce-gentle" style={{ animationDelay: "0.3s" }}>👧🏻</span>
        </div>

        {/* Judul besar */}
        <h1
          className="font-black leading-tight mb-3"
          style={{
            color: "#7B2D00",
            fontSize: "clamp(1.8rem, 6vw, 2.8rem)",
            textTransform: "uppercase",
            letterSpacing: "0.02em",
            textShadow: "0 2px 4px rgba(0,0,0,0.08)",
          }}
        >
          Yuk, Kenali Huruf Vokal dan Bagian Tubuh Kita!
        </h1>

        {/* Subjudul */}
        <p
          className="text-base font-semibold mb-10"
          style={{ color: "#555", letterSpacing: "0.01em" }}
        >
          Petualangan Bujang &amp; Dara — Nuansa Melayu Riau Siak
        </p>

        {/* Tombol Mulai */}
        <button
          onClick={() => router.push("/menu")}
          className="btn-game px-12 py-5 rounded-2xl text-white font-black text-xl tracking-widest shadow-lg"
          style={{
            background: "#2D6A4F",
            boxShadow: "0 6px 0 #1B4332",
            letterSpacing: "0.08em",
            minWidth: 260,
          }}
        >
          MULAI BERMAIN! 🎮
        </button>

        {/* Footer kecil */}
        <p
          className="mt-10 text-sm font-semibold"
          style={{ color: "#8B6914" }}
        >
          Game Edukasi PAUD • Budaya Melayu Riau
        </p>
      </div>
    </div>
  );
}
