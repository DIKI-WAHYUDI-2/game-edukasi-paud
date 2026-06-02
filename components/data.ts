// Data anggota tubuh untuk semua game
export interface AnggotaTubuh {
  id: number;
  nama: string; // Nama Indonesia
  emoji: string;
  deskripsi: string;
  sukuKata: string[]; // Suku kata untuk mengeja
  hurufKosong: {
    kata: string; // Kata dengan _ sebagai pengganti huruf
    jawaban: "A" | "O";
    posisi: number; // Posisi huruf kosong dalam kata
  };
  warna: string; // Warna tema kartu
}

export const anggotaTubuhData: AnggotaTubuh[] = [
  {
    id: 1,
    nama: "Kepala",
    emoji: "🤯",
    deskripsi: "Bagian tubuh paling atas",
    sukuKata: ["ke", "pa", "la"],
    hurufKosong: { kata: "kep_la", jawaban: "A", posisi: 3 },
    warna: "#FF6B6B",
  },
  {
    id: 2,
    nama: "Mata",
    emoji: "👁️",
    deskripsi: "Alat untuk melihat",
    sukuKata: ["ma", "ta"],
    hurufKosong: { kata: "m_ta", jawaban: "A", posisi: 1 },
    warna: "#4ECDC4",
  },
  {
    id: 3,
    nama: "Tangan",
    emoji: "🤚",
    deskripsi: "Alat untuk memegang",
    sukuKata: ["ta", "ngan"],
    hurufKosong: { kata: "t_ngan", jawaban: "A", posisi: 1 },
    warna: "#45B7D1",
  },
  {
    id: 4,
    nama: "Kaki",
    emoji: "🦵",
    deskripsi: "Alat untuk berjalan",
    sukuKata: ["ka", "ki"],
    hurufKosong: { kata: "k_ki", jawaban: "A", posisi: 1 },
    warna: "#96CEB4",
  },
  {
    id: 5,
    nama: "Otak",
    emoji: "🧠",
    deskripsi: "Alat untuk berpikir",
    sukuKata: ["o", "tak"],
    hurufKosong: { kata: "_tak", jawaban: "O", posisi: 0 },
    warna: "#FFEAA7",
  },
  {
    id: 6,
    nama: "Otot",
    emoji: "💪",
    deskripsi: "Membuat tubuh kuat",
    sukuKata: ["o", "tot"],
    hurufKosong: { kata: "_tot", jawaban: "O", posisi: 0 },
    warna: "#DDA0DD",
  },
  {
    id: 7,
    nama: "Tenggorokan",
    emoji: "🗣️",
    deskripsi: "Saluran udara dan makanan",
    sukuKata: ["teng", "go", "ro", "kan"],
    hurufKosong: { kata: "tenggor_kan", jawaban: "O", posisi: 7 },
    warna: "#F0A500",
  },
  {
    id: 8,
    nama: "Bokong",
    emoji: "🍑",
    deskripsi: "Bagian belakang tubuh",
    sukuKata: ["bo", "kong"],
    hurufKosong: { kata: "b_kong", jawaban: "O", posisi: 1 },
    warna: "#FF8B94",
  },
];

export const hurufVokalData = [
  {
    huruf: "A",
    contoh: "Ayam",
    emoji: "🐔",
    warna: "#FF6B6B",
    warnaGelap: "#E53E3E",
  },
  {
    huruf: "I",
    contoh: "Ikan",
    emoji: "🐟",
    warna: "#4ECDC4",
    warnaGelap: "#2C7873",
  },
  {
    huruf: "U",
    contoh: "Ulat",
    emoji: "🐛",
    warna: "#45B7D1",
    warnaGelap: "#2B6CB0",
  },
  {
    huruf: "E",
    contoh: "Ekor",
    emoji: "/pictures/gambar-ekor.png",
    warna: "#96CEB4",
    warnaGelap: "#276749",
  },
  {
    huruf: "O",
    contoh: "Obat",
    emoji: "💊",
    warna: "#FFEAA7",
    warnaGelap: "#D69E2E",
  },
];
