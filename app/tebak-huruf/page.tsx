"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { anggotaTubuhData } from "../../components/data";
import { useTTS } from "../../components/useTTS";
import PopupSelesai from "../../components/PopupSelesai";

type PopupType = "benar" | "salah" | null;

// Bangun soal dari nama kata: SEMUA huruf A dan O jadi kotak kosong
function buildSoal(nama: string) {
  const upper = nama.toUpperCase();
  const kosong: number[] = [];
  upper.split("").forEach((char, i) => {
    if (char === "A" || char === "O") kosong.push(i);
  });
  return { upper, kosong };
}

export default function TebakHurufPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnim, setShowAnim] = useState(true);
  const [popup, setPopup] = useState<PopupType>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [sudahDijawab, setSudahDijawab] = useState(false);
  const [jawaban, setJawaban] = useState<Record<number, string | null>>({});
  const [activeKotak, setActiveKotak] = useState(0);
  const [selesai, setSelesai] = useState(false);
  const { speak, isPlaying, stop } = useTTS();

  const current = anggotaTubuhData[currentIndex];
  const isLast = currentIndex === anggotaTubuhData.length - 1;
  const { upper, kosong } = buildSoal(current.nama);

  // Reset state tiap ganti slide
  useEffect(() => {
    stop();
    setSudahDijawab(false);
    setPopup(null);
    setShowConfetti(false);
    setIsShaking(false);
    setJawaban({});
    setActiveKotak(0);
  }, [currentIndex]);

  // Auto play suara saat kartu berganti
  useEffect(() => {
    const timer = setTimeout(() => speak(current.nama), 400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const handleMainLagi = () => {
    setCurrentIndex(0);
    setSelesai(false);
    setSudahDijawab(false);
    setJawaban({});
    setActiveKotak(0);
    setShowAnim(true);
  };

  const playSound = () => speak(current.nama);

  const tebakHuruf = (huruf: "A" | "O") => {
    if (sudahDijawab) return;

    const posisi = kosong[activeKotak];
    const benar = upper[posisi] === huruf;

    if (benar) {
      const jawabanBaru = { ...jawaban, [posisi]: huruf };
      setJawaban(jawabanBaru);

      const nextKotak = activeKotak + 1;
      if (nextKotak >= kosong.length) {
        setSudahDijawab(true);
        setPopup("benar");
        setShowConfetti(true);
        speak("Hebat! Jawabanmu benar!");
        setTimeout(() => setShowConfetti(false), 2500);
      } else {
        setActiveKotak(nextKotak);
      }
    } else {
      setPopup("salah");
      setIsShaking(true);
      speak("Coba lagi ya!");
      setTimeout(() => {
        setIsShaking(false);
        setPopup(null);
      }, 2000);
    }
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

  const renderKataKosong = () => {
    return (
      <div className="flex items-center justify-center flex-wrap gap-1 mb-2">
        {upper.split("").map((char, i) => {
          const isKosong = kosong.includes(i);
          const isActive =
            isKosong && kosong[activeKotak] === i && !sudahDijawab;
          const isIsi = jawaban[i] != null;

          if (isKosong) {
            return (
              <div
                key={i}
                className="w-10 h-12 rounded-xl border-4 flex items-center justify-center font-black text-2xl transition-all duration-300"
                style={{
                  borderColor: isIsi
                    ? "#4CAF50"
                    : isActive
                      ? current.warna
                      : "#ccc",
                  background: isIsi ? "#E8F5E9" : isActive ? "#fff" : "#f0f0f0",
                  color: isIsi ? "#4CAF50" : current.warna,
                  minWidth: 40,
                  boxShadow: isActive ? `0 0 0 3px ${current.warna}44` : "none",
                }}>
                {isIsi ? jawaban[i] : ""}
              </div>
            );
          }
          return (
            <div
              key={i}
              className="w-8 h-12 flex items-center justify-center font-black text-2xl"
              style={{ color: current.warna }}>
              {char}
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
      }}>
      {/* Confetti */}
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
              }}>
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
          {currentIndex + 1} / {anggotaTubuhData.length} — Isi huruf yang
          hilang!
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

      {/* Kartu */}
      <div
        className={`relative z-10 card-game p-6 flex flex-col items-center w-full max-w-sm
          ${showAnim ? "animate-pop-in" : "opacity-0"}
          ${isShaking ? "animate-shake" : ""}
        `}
        style={{ background: "white" }}>
        {/* Gambar */}
        <div className="mb-3 animate-float flex items-center justify-center">
          <img
            src={current.gambar}
            alt={current.nama}
            width={100}
            height={100}
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* Nama Melayu Riau */}
        <div className="text-xs text-gray-400 font-bold mb-3">
          Melayu Riau:{" "}
          <span className="text-gray-600 font-black">
            {current.namaMelayu ?? current.nama}
          </span>
        </div>

        {/* Kata dengan huruf kosong */}
        {renderKataKosong()}

        {/* Hint kotak ke berapa */}
        {!sudahDijawab && (
          <p className="text-xs text-gray-400 mb-4 font-semibold">
            🎯 Isi kotak ke-{activeKotak + 1} dari {kosong.length}
          </p>
        )}
        {sudahDijawab && (
          <p
            className="text-xs mb-4 font-semibold"
            style={{ color: "#4CAF50" }}>
            ✅ Semua huruf terisi dengan benar!
          </p>
        )}

        {/* Tombol Speaker */}
        <button
          onClick={playSound}
          className="btn-game w-14 h-14 rounded-full text-2xl text-white flex items-center justify-center mb-5 shadow"
          style={{
            background: isPlaying
              ? "#bbb"
              : `linear-gradient(135deg, ${current.warna}, #222)`,
          }}
          title="Dengar bunyinya!">
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
                background: sudahDijawab
                  ? "#ddd"
                  : huruf === "A"
                    ? "linear-gradient(135deg, #FF6B6B, #C0392B)"
                    : "linear-gradient(135deg, #45B7D1, #1A6E8F)",
                boxShadow: sudahDijawab
                  ? "0 4px 0 #aaa"
                  : huruf === "A"
                    ? "0 6px 0 #922B21"
                    : "0 6px 0 #0E4D66",
                color: sudahDijawab ? "#aaa" : "white",
              }}>
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
            }}>
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
            }}>
            {isLast ? "🏠 Selesai!" : "Berikutnya →"}
          </button>
        </div>
      </div>

      {/* Tombol Kembali */}
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

      {/* Popup Benar */}
      {popup === "benar" && (
        <div className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none">
          <div
            className="animate-pop-in card-game px-10 py-8 flex flex-col items-center text-center"
            style={{ background: "white", maxWidth: 300 }}>
            <div className="text-7xl mb-2">🎉</div>
            <div className="text-2xl font-black" style={{ color: "#4CAF50" }}>
              Hebat!
            </div>
            <div className="text-base font-bold text-gray-600 mt-1">
              Semua huruf untuk kata{" "}
              <span style={{ color: current.warna }} className="font-black">
                {current.nama}
              </span>{" "}
              sudah benar!
            </div>
            <div className="flex gap-1 mt-3 text-2xl">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="animate-star-spin"
                  style={{ animationDelay: `${i * 0.2}s` }}>
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
          <div
            className="animate-pop-in card-game px-10 py-8 flex flex-col items-center text-center"
            style={{ background: "white", maxWidth: 280 }}>
            <div className="text-7xl mb-2">😅</div>
            <div className="text-2xl font-black" style={{ color: "#FF6B6B" }}>
              Oops!
            </div>
            <div className="text-base font-bold text-gray-500 mt-1">
              Coba lagi ya! Dengerin dulu bunyinya 🔈
            </div>
          </div>
        </div>
      )}

      {/* Popup Selesai semua soal */}
      <PopupSelesai show={selesai} onMainLagi={handleMainLagi} />
    </div>
  );
}
