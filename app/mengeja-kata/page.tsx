"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { anggotaTubuhData } from "../../components/data";
import { useTTS } from "../../components/useTTS";
import PopupSelesai from "../../components/PopupSelesai";

export default function MengejaKataPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeSuku, setActiveSuku] = useState<number | null>(null);
  const [showAnim, setShowAnim] = useState(true);
  const [selesai, setSelesai] = useState(false);
  const { speak, speakSequence, isPlaying } = useTTS();

  const current = anggotaTubuhData[currentIndex];
  const isLast = currentIndex === anggotaTubuhData.length - 1;

  const playSuku = (suku: string, index: number) => {
    if (isPlaying) return;
    setActiveSuku(index);
    speak(suku);
    setTimeout(() => setActiveSuku(null), 1200);
  };

  const playFullWord = () => {
    if (isPlaying) return;
    speakSequence([...current.sukuKata, `jadi... ${current.nama}`], 400);
  };

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
      <div className="absolute inset-0" style={{ background: "rgba(240,147,251,0.7)" }} />
      {/* Header */}
      <div className="relative z-10 text-center mb-4">
        <div className="text-4xl mb-1 animate-bounce-gentle">📖</div>
        <h1 className="text-2xl font-black text-white">Mengeja Kata</h1>
        <p className="text-pink-100 text-sm font-semibold">
          {currentIndex + 1} / {anggotaTubuhData.length} — Klik suku kata!
        </p>
      </div>

      {/* Progress */}
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

      {/* Kartu */}
      <div
        className={`relative z-10 card-game p-8 flex flex-col items-center w-full max-w-sm ${showAnim ? "animate-pop-in" : "opacity-0"}`}
        style={{ background: "white" }}>
        {/* Gambar anggota tubuh */}
        <div className="mb-3 animate-float">
          <img
            src={current.gambar}
            alt={current.nama}
            width={120}
            height={120}
            style={{ objectFit: "contain", width: 120, height: 120 }}
          />
        </div>

        {/* Nama lengkap */}
        <div
          className="text-3xl font-black mb-1"
          style={{ color: current.warna }}>
          {current.nama}
        </div>

        {/* Suku kata */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {current.sukuKata.map((suku, i) => (
            <button
              key={i}
              onClick={() => playSuku(suku, i)}
              className="btn-game px-4 py-2 rounded-xl text-white font-black text-lg shadow"
              style={{
                background:
                  activeSuku === i
                    ? "#333"
                    : `linear-gradient(135deg, ${current.warna}, #555)`,
                boxShadow: activeSuku === i ? "0 2px 0 #111" : `0 4px 0 #555`,
                transform: activeSuku === i ? "translateY(2px)" : "",
              }}>
              {suku}
            </button>
          ))}
          <span className="self-center text-gray-400 font-black text-xl">=</span>
          <div
            className="px-4 py-2 rounded-xl font-black text-lg"
            style={{ background: "#f0f0f0", color: current.warna }}>
            {current.nama}
          </div>
        </div>

        {/* Tombol play semua */}
        <button
          onClick={playFullWord}
          disabled={isPlaying}
          className="btn-game w-14 h-14 rounded-full text-2xl text-white flex items-center justify-center mb-5 shadow"
          style={{
            background: isPlaying
              ? "#bbb"
              : `linear-gradient(135deg, ${current.warna}, #222)`,
          }}>
          {isPlaying ? "🔊" : "🔈"}
        </button>

        {/* Navigasi */}
        <div className="flex gap-3 w-full">
          <button
            onClick={goPrev}
            disabled={currentIndex === 0 || isPlaying}
            className="btn-game flex-1 py-3 rounded-xl font-bold text-white text-sm"
            style={{
              background: currentIndex === 0 || isPlaying ? "#ccc" : "#777",
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
                ? "linear-gradient(135deg, #AB47BC, #6A1B9A)"
                : `linear-gradient(135deg, ${current.warna}, #222)`,
              boxShadow: isPlaying ? "none" : "0 4px 0 #222",
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
