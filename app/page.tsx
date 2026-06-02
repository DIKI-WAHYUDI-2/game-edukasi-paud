"use client";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 50%, #ffecd2 100%)",
      }}
    >
      {/* Dekorasi bintang & lingkaran */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {["⭐", "🌟", "✨", "💫", "⭐", "🌟", "✨"].map((star, i) => (
          <span
            key={i}
            className="absolute text-2xl animate-float"
            style={{
              left: `${10 + i * 13}%`,
              top: `${8 + (i % 3) * 15}%`,
              animationDelay: `${i * 0.4}s`,
              opacity: 0.7,
            }}
          >
            {star}
          </span>
        ))}
        {["🌸", "🌺", "🌼", "🌻"].map((flower, i) => (
          <span
            key={i}
            className="absolute text-3xl animate-bounce-gentle"
            style={{
              right: `${5 + i * 10}%`,
              bottom: `${10 + (i % 2) * 20}%`,
              animationDelay: `${i * 0.6}s`,
              opacity: 0.6,
            }}
          >
            {flower}
          </span>
        ))}
      </div>

      {/* Card Utama */}
      <div
        className="card-game animate-slide-up flex flex-col items-center p-10 mx-4 max-w-md w-full relative z-10"
        style={{ background: "white" }}
      >
        {/* Karakter utama */}
        <div className="text-8xl mb-2 animate-bounce-gentle">🧒</div>

        {/* Judul */}
        <div className="text-center mb-2">
          <h1
            className="text-3xl font-black leading-tight"
            style={{ color: "#2D6A4F" }}
          >
            Game PAUD
          </h1>
          <h2
            className="text-xl font-bold mt-1"
            style={{ color: "#52B788" }}
          >
            Literasi Melayu Riau
          </h2>
          <div
            className="mt-2 px-4 py-1 rounded-full inline-block text-white font-bold text-sm"
            style={{ background: "#F9A825" }}
          >
            🏝️ Anggota Tubuh
          </div>
        </div>

        {/* Dekorasi emojis */}
        <div className="flex gap-3 my-4 text-3xl">
          {["🧠", "💪", "👁️", "🦵", "🤚"].map((ch, i) => (
            <span
              key={i}
              className="animate-float"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              {ch}
            </span>
          ))}
        </div>

        {/* Deskripsi */}
        <p className="text-center text-gray-500 text-sm mb-6 px-2">
          Belajar mengenal anggota tubuh dalam bahasa Indonesia dan Melayu Riau
          dengan cara yang seru dan menyenangkan! 🎉
        </p>

        {/* Tombol Mulai */}
        <button
          onClick={() => router.push("/menu")}
          className="btn-game w-full py-4 rounded-2xl text-white text-2xl font-black shadow-lg"
          style={{
            background: "linear-gradient(135deg, #52B788, #2D6A4F)",
            boxShadow: "0 6px 0 #1B4332",
          }}
        >
          🎮 Mulai Bermain!
        </button>

        <p className="mt-4 text-xs text-gray-400">
          Untuk anak usia 4–6 tahun
        </p>
      </div>
    </div>
  );
}
