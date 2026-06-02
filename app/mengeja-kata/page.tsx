"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { anggotaTubuhData } from "../../components/data";

export default function MengejaKataPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSuku, setActiveSuku] = useState<number | null>(null);
  const [showAnim, setShowAnim] = useState(true);

  const current = anggotaTubuhData[currentIndex];
  const isLast = currentIndex === anggotaTubuhData.length - 1;

  const playSuku = (suku: string, index: number) => {
    if (isPlaying) return;
    setIsPlaying(true);
    setActiveSuku(index);

    const utterance = new SpeechSynthesisUtterance(suku);
    utterance.lang = "id-ID";
    utterance.rate = 0.5;
    utterance.pitch = 1.2;
    utterance.onend = () => {
      setActiveSuku(null);
      setIsPlaying(false);
    };
    speechSynthesis.speak(utterance);
  };

  const playFullWord = () => {
    if (isPlaying) return;
    setIsPlaying(true);

    // Ucapkan satu per satu suku kata
    let i = 0;
    const speakNext = () => {
      if (i < current.sukuKata.length) {
        setActiveSuku(i);
        const u = new SpeechSynthesisUtterance(current.sukuKata[i]);
        u.lang = "id-ID";
        u.rate = 0.5;
        u.pitch = 1.2;
        u.onend = () => {
          i++;
          setTimeout(speakNext, 200);
        };
        speechSynthesis.speak(u);
      } else {
        setActiveSuku(null);
        // Ucapkan kata utuh
        const full = new SpeechSynthesisUtterance(`jadi... ${current.nama}`);
        full.lang = "id-ID";
        full.rate = 0.7;
        full.pitch = 1.2;
        full.onend = () => setIsPlaying(false);
        speechSynthesis.speak(full);
      }
    };
    speakNext();
  };

  const goNext = () => {
    if (isLast) {
      router.push("/tebak-huruf");
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
        background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      }}>
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
        {/* Emoji */}
        <div className="text-8xl mb-3 animate-float">{current.emoji}</div>

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

          {/* Simbol + dan kata utuh */}
          <span className="self-center text-gray-400 font-black text-xl">
            =
          </span>
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
            disabled={currentIndex === 0}
            className="btn-game flex-1 py-3 rounded-xl font-bold text-white text-sm"
            style={{
              background: currentIndex === 0 ? "#ccc" : "#777",
              boxShadow: "0 4px 0 #333",
            }}>
            ← Sebelumnya
          </button>
          <button
            onClick={goNext}
            className="btn-game flex-1 py-3 rounded-xl font-bold text-white text-sm"
            style={{
              background: isLast
                ? "linear-gradient(135deg, #AB47BC, #6A1B9A)"
                : `linear-gradient(135deg, ${current.warna}, #222)`,
              boxShadow: "0 4px 0 #222",
            }}>
            {isLast ? "Lanjut →" : "Berikutnya →"}
          </button>
        </div>
      </div>

      <button
        onClick={() => router.push("/menu")}
        className="btn-game mt-5 relative z-10 px-6 py-3 rounded-full font-bold text-white text-sm"
        style={{ background: "rgba(0,0,0,0.2)" }}>
        ← Kembali ke Menu
      </button>
    </div>
  );
}
