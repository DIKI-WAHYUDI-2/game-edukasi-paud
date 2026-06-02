"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { anggotaTubuhData } from "../../components/data";

export default function AnggotaTubuhPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAnim, setShowAnim] = useState(true);

  const current = anggotaTubuhData[currentIndex];
  const isLast = currentIndex === anggotaTubuhData.length - 1;

  const playSound = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    const utterance = new SpeechSynthesisUtterance(current.nama);
    utterance.lang = "id-ID";
    utterance.rate = 0.7;
    utterance.pitch = 1.2;
    utterance.onend = () => setIsPlaying(false);
    speechSynthesis.speak(utterance);
  };

  const goNext = () => {
    if (isLast) {
      router.push("/mengeja-kata");
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

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
      }}>
      {/* Header */}
      <div className="relative z-10 text-center mb-4">
        <div className="text-4xl mb-1 animate-bounce-gentle">🧠</div>
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
        {/* Emoji besar */}
        <div
          className="text-9xl mb-4 animate-float"
          style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))" }}>
          {current.emoji}
        </div>

        {/* Nama Indonesia */}
        <div
          className="text-4xl font-black mb-1"
          style={{ color: current.warna }}>
          {current.nama}
        </div>

        {/* Deskripsi */}
        <div
          className="px-4 py-2 rounded-full text-sm font-bold text-white mb-6"
          style={{ background: current.warna }}>
          {current.deskripsi}
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
            disabled={currentIndex === 0}
            className="btn-game flex-1 py-3 rounded-xl font-bold text-white text-sm"
            style={{
              background: currentIndex === 0 ? "#ccc" : "#666",
              boxShadow: currentIndex === 0 ? "none" : "0 4px 0 #333",
            }}>
            ← Sebelumnya
          </button>
          <button
            onClick={goNext}
            className="btn-game flex-1 py-3 rounded-xl font-bold text-white text-sm"
            style={{
              background: isLast
                ? "linear-gradient(135deg, #F9A825, #E65100)"
                : `linear-gradient(135deg, ${current.warna}, #222)`,
              boxShadow: `0 4px 0 #222`,
            }}>
            {isLast ? "Lanjut →" : "Berikutnya →"}
          </button>
        </div>
      </div>

      {/* Kembali */}
      <button
        onClick={() => router.push("/menu")}
        className="btn-game mt-5 relative z-10 px-6 py-3 rounded-full font-bold text-white text-sm"
        style={{ background: "rgba(0,0,0,0.2)" }}>
        ← Kembali ke Menu
      </button>
    </div>
  );
}
