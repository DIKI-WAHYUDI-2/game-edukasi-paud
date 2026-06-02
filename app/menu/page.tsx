"use client";
import { useRouter } from "next/navigation";

const menus = [
  {
    label: "Huruf Vokal",
    emoji: "🔤",
    route: "/huruf-vokal",
    warna: "#FF6B6B",
    warnaGelap: "#C0392B",
    desc: "Kenalan dengan A, I, U, E, O!",
  },
  {
    label: "Anggota Tubuh",
    emoji: "🧠",
    route: "/anggota-tubuh",
    warna: "#4ECDC4",
    warnaGelap: "#16A085",
    desc: "Mengenal bagian-bagian tubuh",
  },
  {
    label: "Mengeja Kata",
    emoji: "📖",
    route: "/mengeja-kata",
    warna: "#F9A825",
    warnaGelap: "#E65100",
    desc: "Belajar mengeja suku kata",
  },
  {
    label: "Tebak Huruf A & O",
    emoji: "🎯",
    route: "/tebak-huruf",
    warna: "#AB47BC",
    warnaGelap: "#6A1B9A",
    desc: "Tebak huruf yang hilang!",
  },
];

export default function MenuPage() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-8"
      style={{
        background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      }}
    >
      {/* Dekorasi */}
      <div className="absolute inset-0 pointer-events-none">
        {["🌈", "☁️", "⭐", "☀️", "🌙"].map((icon, i) => (
          <span
            key={i}
            className="absolute text-3xl animate-float"
            style={{
              left: `${5 + i * 20}%`,
              top: `${3 + (i % 2) * 8}%`,
              animationDelay: `${i * 0.5}s`,
              opacity: 0.5,
            }}
          >
            {icon}
          </span>
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-8">
        <div className="text-5xl mb-2">🎮</div>
        <h1 className="text-3xl font-black" style={{ color: "#7B341E" }}>
          Pilih Permainan
        </h1>
        <p className="text-sm mt-1 font-semibold" style={{ color: "#9C4221" }}>
          Mau belajar apa hari ini?
        </p>
      </div>

      {/* Menu Grid */}
      <div className="relative z-10 grid grid-cols-2 gap-4 w-full max-w-md">
        {menus.map((menu, i) => (
          <button
            key={i}
            onClick={() => router.push(menu.route)}
            className="btn-game card-game p-5 flex flex-col items-center gap-2 text-white"
            style={{
              background: `linear-gradient(135deg, ${menu.warna}, ${menu.warnaGelap})`,
              boxShadow: `0 6px 0 ${menu.warnaGelap}`,
              animationDelay: `${i * 0.1}s`,
            }}
          >
            <span className="text-5xl animate-bounce-gentle" style={{ animationDelay: `${i * 0.3}s` }}>
              {menu.emoji}
            </span>
            <span className="font-black text-sm text-center leading-tight">
              {menu.label}
            </span>
            <span className="text-xs opacity-80 text-center leading-tight">
              {menu.desc}
            </span>
          </button>
        ))}
      </div>

      {/* Tombol Kembali */}
      <button
        onClick={() => router.push("/")}
        className="btn-game mt-6 relative z-10 px-6 py-3 rounded-full font-bold text-white text-sm"
        style={{ background: "rgba(0,0,0,0.2)" }}
      >
        ← Kembali
      </button>
    </div>
  );
}
