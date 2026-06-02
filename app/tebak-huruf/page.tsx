"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { anggotaTubuhData } from "../../components/data";

type PopupType = "benar" | "salah" | null;

export default function TebakHurufPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnim, setShowAnim] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [popup, setPopup] = useState<PopupType>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [sudahDijawab, setSudahDijawab] = useState(false);

  const current = anggotaTubuhData[currentIndex];
  const isLast = currentIndex === anggotaTubuhData.length - 1;

  // Reset state tiap ganti slide
  useEffect(() => {
    setSudahDijawab(false);
    setPopup(null);
    setShowConfetti(false);
    setIsShaking(false);
  }, [currentIndex]);

  const playSound = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    const u = new SpeechSynthesisUtterance(current.nama);
    u.lang = "id-ID";
    u.rate = 0.7;
    u.pitch = 1.2;
    u.onend = () => setIsPlaying(false);
    speechSynthesis.speak(u);
  };

  const tebakHuruf = (huruf: "A" | "O") => {
    if (sudahDijawab) return;

    if (huruf === current.hurufKosong.jawaban) {
      setSudahDijawab(true);
      setPopup("benar");
      setShowConfetti(true);
      // Ucapkan pujian
      const u = new SpeechSynthesisUtterance("Hebat! Jawabanmu benar!");
      u.lang = "id-ID";
      u.rate = 0.8;
      u.pitch = 1.4;
      speechSynthesis.speak(u);
      setTimeout(() => setShowConfetti(false), 2500);
    } else {
      setPopup("salah");
      setIsShaking(true);
      // Ucapkan semangat
      const u = new SpeechSynthesisUtterance("Coba lagi ya!");
      u.lang = "id-ID";
      u.rate = 0.8;
      u.pitch = 1.2;
      speechSynthesis.speak(u);
      setTimeout(() => {
        setIsShaking(false);
        setPopup(null);
      }, 1500);
    }
  };

  const goNext = () => {
    if (isLast) {
      router.push("/menu");
      return;
    }
    setShowAnim(false);
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setShowAnim(true);
    }, 200);
  };

  const goPrev = () => {
    if (currentIndex === 0) return;
    setShowAnim(false);
    setTimeout(() => {
      setCurrentIndex((prev) => prev - 1);
      setShowAnim(true);
    }, 200);
  };

  // Render kata dengan kotak huruf kosong
  const renderKataKosong = () => {
    const kata = current.hurufKosong.kata;
    return (
      <div className="flex items-center justify-center flex-wrap gap-1 mb-2">
        {kata.split("").map((char, i) => {
          if (char === "_") {
            return (
              <div
                key={i}
                className="w-10 h-12 rounded-xl border-4 flex items-center justify-center font-black text-2xl transition-all duration-300"
                style={{
                  borderColor: sudahDijawab ? "#4CAF50" : current.warna,
                  background: sudahDijawab ? "#E8F5E9" : "#f9f9f9",
                  color: sudahDijawab ? "#4CAF50" : current.warna,
                  minWidth: 40,
                }}
              >
                {sudahDijawab ? current.hurufKosong.jawaban : ""}
              </div>
            );
          }
          return (
            <div
              key={i}
              className="w-8 h-12 flex items-center justify-center font-black text-2xl"
              style={{ color: current.warna }}
            >
              {char.toUpperCase()}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
      }}
    >
      {/* Confetti animasi */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {["🌟", "⭐", "✨", "🎉", "🎊", "💫", "🏆", "🎈"].map((icon, i) => (
            <span
              key={i}
              className="absolute text-3xl"
              style={{
                left: `${10 + i * 11}%`,
                top: "-20px",
                animation: `confetti-fall 1.5s ease-in ${i * 0.15}s forwards`,
              }}
            >
              {icon}
            </span>
          ))}
        </div>
      )}

      {/* Header */}
      <div className="relative z-10 text-center mb-4">
        <div className="text-4xl mb-1 animate-bounce-gentle">🎯</div>
        <h1 className="text-2xl font-black text-white">Tebak Huruf A & O</h1>
        <p className="text-blue-200 text-sm font-semibold">
          {currentIndex + 1} / {anggotaTubuhData.length} — Isi huruf yang hilang!
        </p>
      </div>

      {/* Progress bar */}
      <div
        className="relative z-10 w-full max-w-sm h-3 rounded-full mb-6 overflow-hidden"
        style={{ background: "rgba(255,255,255,0.3)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${((currentIndex + 1) / anggotaTubuhData.length) * 100}%`,
            background: "white",
          }}
        />
      </div>

      {/* Kartu */}
      <div
        className={`relative z-10 card-game p-6 flex flex-col items-center w-full max-w-sm
          ${showAnim ? "animate-pop-in" : "opacity-0"}
          ${isShaking ? "animate-shake" : ""}
        `}
        style={{ background: "white" }}
      >
        {/* Emoji */}
        <div className="text-8xl mb-3 animate-float">{current.emoji}</div>

        {/* Nama Melayu Riau */}
        <div className="text-xs text-gray-400 font-bold mb-3">
          Melayu Riau:{" "}
          <span className="text-gray-600 font-black">
            {current.namaMelayu ?? current.nama}
          </span>
        </div>

        {/* Kata dengan huruf kosong */}
        {renderKataKosong()}

        {/* Hint */}
        <p className="text-xs text-gray-400 mb-4 font-semibold">
          🎯 Pilih huruf yang tepat untuk mengisi kotak di atas!
        </p>

        {/* Tombol Speaker (clue) */}
        <button
          onClick={playSound}
          disabled={isPlaying}
          className="btn-game w-14 h-14 rounded-full text-2xl text-white flex items-center justify-center mb-5 shadow"
          style={{
            background: isPlaying
              ? "#bbb"
              : `linear-gradient(135deg, ${current.warna}, #222)`,
          }}
          title="Dengar bunyinya!"
        >
          {isPlaying ? "🔊" : "🔈"}
        </button>

        {/* Pilihan huruf A & O */}
        <div className="flex gap-4 mb-5">
          {(["A", "O"] as const).map((huruf) => (
            <button
              key={huruf}
              onClick={() => tebakHuruf(huruf)}
              disabled={sudahDijawab}
              className="btn-game w-20 h-20 rounded-2xl text-4xl font-black text-white shadow-lg transition-all"
              style={{
                background:
                  sudahDijawab && huruf === current.hurufKosong.jawaban
                    ? "linear-gradient(135deg, #4CAF50, #2E7D32)"
                    : sudahDijawab
                    ? "#ddd"
                    : huruf === "A"
                    ? "linear-gradient(135deg, #FF6B6B, #C0392B)"
                    : "linear-gradient(135deg, #45B7D1, #1A6E8F)",
                boxShadow:
                  sudahDijawab && huruf === current.hurufKosong.jawaban
                    ? "0 6px 0 #1B5E20"
                    : sudahDijawab
                    ? "0 4px 0 #aaa"
                    : huruf === "A"
                    ? "0 6px 0 #922B21"
                    : "0 6px 0 #0E4D66",
                color: sudahDijawab && huruf !== current.hurufKosong.jawaban ? "#aaa" : "white",
              }}
            >
              {huruf}
            </button>
          ))}
        </div>

        {/* Navigasi */}
        <div className="flex gap-3 w-full">
          <button
            onClick={goPrev}
            disabled={currentIndex === 0}
            className="btn-game flex-1 py-3 rounded-xl font-bold text-white text-sm"
            style={{
              background: currentIndex === 0 ? "#ccc" : "#666",
              boxShadow: currentIndex === 0 ? "none" : "0 4px 0 #333",
            }}
          >
            ← Sebelumnya
          </button>
          <button
            onClick={goNext}
            className="btn-game flex-1 py-3 rounded-xl font-bold text-white text-sm"
            style={{
              background: isLast
                ? "linear-gradient(135deg, #F9A825, #E65100)"
                : `linear-gradient(135deg, ${current.warna}, #333)`,
              boxShadow: "0 4px 0 #222",
            }}
          >
            {isLast ? "🏠 Selesai!" : "Berikutnya →"}
          </button>
        </div>
      </div>

      {/* Tombol Kembali */}
      <button
        onClick={() => router.push("/menu")}
        className="btn-game mt-5 relative z-10 px-6 py-3 rounded-full font-bold text-white text-sm"
        style={{ background: "rgba(0,0,0,0.2)" }}
      >
        ← Kembali ke Menu
      </button>

      {/* Popup Benar */}
      {popup === "benar" && (
        <div className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none">
          <div className="animate-pop-in card-game px-10 py-8 flex flex-col items-center text-center" style={{ background: "white", maxWidth: 300 }}>
            <div className="text-7xl mb-2">🎉</div>
            <div className="text-2xl font-black" style={{ color: "#4CAF50" }}>Hebat!</div>
            <div className="text-base font-bold text-gray-600 mt-1">
              Jawabannya benar! Huruf{" "}
              <span style={{ color: "#4CAF50" }}>{current.hurufKosong.jawaban}</span>{" "}
              untuk kata{" "}
              <span style={{ color: current.warna }} className="font-black">
                {current.nama}
              </span>
            </div>
            <div className="flex gap-1 mt-3 text-2xl">
              {"⭐⭐⭐".split("").map((s, i) => (
                <span
                  key={i}
                  className="animate-star-spin"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  ⭐
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Popup Salah */}
      {popup === "salah" && (
        <div className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none">
          <div className="animate-pop-in card-game px-10 py-8 flex flex-col items-center text-center" style={{ background: "white", maxWidth: 280 }}>
            <div className="text-7xl mb-2">😅</div>
            <div className="text-2xl font-black" style={{ color: "#FF6B6B" }}>Oops!</div>
            <div className="text-base font-bold text-gray-500 mt-1">
              Coba lagi ya! Dengerin dulu bunyinya 🔈
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
