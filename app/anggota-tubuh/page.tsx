"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { anggotaTubuhData } from "../../components/data";
import { useTTS } from "../../components/useTTS";
import PopupSelesai from "../../components/PopupSelesai";

export default function AnggotaTubuhPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnim, setShowAnim] = useState(true);
  const [selesai, setSelesai] = useState(false);
  const { speak, isPlaying } = useTTS();

  const current = anggotaTubuhData[currentIndex];
  const isLast = currentIndex === anggotaTubuhData.length - 1;

  const playSound = () => speak(current.nama);

  const goNext = () => {
    if (isLast) {
      setSelesai(true);
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

  const handleMainLagi = () => {
    setCurrentIndex(0);
    setSelesai(false);
    setShowAnim(true);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden"
      style={{
        background: "url('/pictures/background.png') center/cover no-repeat",
      }}>
      {/* Overlay */}
      <div className="absolute inset-0" style={{ background: "rgba(17,153,142,0.7)" }} />
      {/* Header */}
      <div className="relative z-10 text-center mb-4">
        <div className="text-4xl mb-1 animate-bounce-gentle">🫀</div>
        <h1 className="text-2xl font-black text-white">Anggota Tubuh</h1>
        <p className="text-green-100 text-sm font-semibold">
          {currentIndex + 1} / {anggotaTubuhData.length}
        </p>
      </div>

      {/* Progress bar */}
      <div
        className="relative z-10 w-full max-w-sm h-3 rounded-full mb-6 overflow-hidden"
        style={{ background: "rgba(255,255,255,0.3)" }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${((currentIndex + 1) / anggotaTubuhData.length) * 100}%`,
            background: "white",
          }}
        />
      </div>

      {/* Kartu Anggota Tubuh */}
      <div
        className={`relative z-10 card-game p-8 flex flex-col items-center w-full max-w-sm transition-all duration-200 ${showAnim ? "animate-pop-in" : "opacity-0"}`}
        style={{ background: "white" }}>
        {/* Gambar anggota tubuh */}
        <div
          className="mb-4 animate-float"
          style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))" }}>
          <img
            src={current.gambar}
            alt={current.nama}
            width={160}
            height={160}
            style={{ objectFit: "contain", width: 160, height: 160 }}
          />
        </div>

        {/* Nama Indonesia */}
        <div
          className="text-4xl font-black mb-1"
          style={{ color: current.warna }}>
          {current.nama}
        </div>

        {/* Tombol Speaker */}
        <button
          onClick={playSound}
          className="btn-game w-16 h-16 rounded-full text-3xl flex items-center justify-center text-white mb-4 shadow-md"
          style={{
            background: isPlaying
              ? "#999"
              : `linear-gradient(135deg, ${current.warna}, #333)`,
          }}
          disabled={isPlaying}>
          {isPlaying ? "🔊" : "🔈"}
        </button>

        {/* Navigasi */}
        <div className="flex gap-3 w-full">
          <button
            onClick={goPrev}
            disabled={currentIndex === 0 || isPlaying}
            className="btn-game flex-1 py-3 rounded-xl font-bold text-white text-sm"
            style={{
              background: currentIndex === 0 || isPlaying ? "#ccc" : "#666",
              boxShadow: currentIndex === 0 || isPlaying ? "none" : "0 4px 0 #333",
            }}>
            ← Sebelumnya
          </button>
          <button
            onClick={goNext}
            disabled={isPlaying}
            className="btn-game flex-1 py-3 rounded-xl font-bold text-white text-sm"
            style={{
              background: isPlaying
                ? "#ccc"
                : isLast
                ? "linear-gradient(135deg, #F9A825, #E65100)"
                : `linear-gradient(135deg, ${current.warna}, #222)`,
              boxShadow: isPlaying ? "none" : `0 4px 0 #222`,
            }}>
            {isLast ? "Lanjut →" : "Berikutnya →"}
          </button>
        </div>
      </div>

      {/* Kembali */}
      <button
        onClick={() => !isPlaying && router.push("/menu")}
        disabled={isPlaying}
        className="btn-game mt-5 relative z-10 px-6 py-3 rounded-full font-bold text-white text-sm"
        style={{
          background: isPlaying ? "rgba(0,0,0,0.08)" : "rgba(0,0,0,0.2)",
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
