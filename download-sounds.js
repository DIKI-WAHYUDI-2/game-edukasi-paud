const https = require("https");
const fs = require("fs");
const path = require("path");

const outputDir = path.join(__dirname, "public", "sounds");
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

const voicesDir = path.join(__dirname, "public", "voices");
if (!fs.existsSync(voicesDir)) fs.mkdirSync(voicesDir, { recursive: true });

const soundWords = [
  // Anggota tubuh
  { text: "tenggorokan", file: "tenggorokan", dir: outputDir },
  { text: "bokong", file: "bokong", dir: outputDir },
  { text: "otot", file: "otot", dir: outputDir },
  { text: "otak", file: "otak", dir: outputDir },
  { text: "kepala", file: "kepala", dir: outputDir },
  { text: "tangan", file: "tangan", dir: outputDir },
  { text: "mata", file: "mata", dir: outputDir },
  { text: "kaki", file: "kaki", dir: outputDir },
  // Suku kata
  { text: "teng", file: "teng", dir: outputDir },
  { text: "go", file: "go", dir: outputDir },
  { text: "ro", file: "ro", dir: outputDir },
  { text: "kan", file: "kan", dir: outputDir },
  { text: "bo", file: "bo", dir: outputDir },
  { text: "kong", file: "kong", dir: outputDir },
  { text: "o", file: "o", dir: outputDir },
  { text: "tot", file: "tot", dir: outputDir },
  { text: "tak", file: "tak", dir: outputDir },
  { text: "ke", file: "ke", dir: outputDir },
  { text: "pa", file: "pa", dir: outputDir },
  { text: "la", file: "la", dir: outputDir },
  { text: "ngan", file: "ngan", dir: outputDir },
  { text: "ta", file: "ta", dir: outputDir },
  { text: "ma", file: "ma", dir: outputDir },
  { text: "ki", file: "ki", dir: outputDir },
  { text: "ka", file: "ka", dir: outputDir },
  // Feedback
  { text: "Hebat! Jawabanmu benar!", file: "benar", dir: outputDir },
  { text: "Coba lagi ya!", file: "salah", dir: outputDir },
  // Kata utuh untuk mengeja
  { text: "jadi... tenggorokan", file: "jadi-tenggorokan", dir: outputDir },
  { text: "jadi... bokong", file: "jadi-bokong", dir: outputDir },
  { text: "jadi... otot", file: "jadi-otot", dir: outputDir },
  { text: "jadi... otak", file: "jadi-otak", dir: outputDir },
  { text: "jadi... kepala", file: "jadi-kepala", dir: outputDir },
  { text: "jadi... tangan", file: "jadi-tangan", dir: outputDir },
  { text: "jadi... mata", file: "jadi-mata", dir: outputDir },
  { text: "jadi... kaki", file: "jadi-kaki", dir: outputDir },
  // === Navigasi ===
  { text: "Mulai bermain!", file: "mulai-bermain", dir: voicesDir },
  { text: "Pilih permainan!", file: "pilih-permainan", dir: voicesDir },
  { text: "Ayo, kenali huruf-huruf vokal!", file: "ayo-huruf-vokal", dir: voicesDir },
  { text: "Ayo, kenali anggota tubuh!", file: "ayo-anggota-tubuh", dir: voicesDir },
  { text: "Ayo, belajar mengeja kata!", file: "ayo-mengeja-kata", dir: voicesDir },
  { text: "Ayo, belajar tebak huruf yang hilang!", file: "ayo-tebak-huruf", dir: voicesDir },
];

function download(text, filename, dir) {
  return new Promise((resolve, reject) => {
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=id&client=tw-ob`;
    const dest = path.join(dir, `${filename}.mp3`);

    // Skip kalau file sudah ada
    if (fs.existsSync(dest)) {
      console.log(`— skip (sudah ada): ${filename}.mp3`);
      resolve();
      return;
    }

    const file = fs.createWriteStream(dest);
    const req = https.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
    }, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} untuk "${text}"`));
        return;
      }
      res.pipe(file);
      file.on("finish", () => {
        file.close();
        console.log(`✓ ${filename}.mp3`);
        resolve();
      });
    });

    req.on("error", reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error(`Timeout untuk "${text}"`));
    });
  });
}

async function downloadAll() {
  console.log("Mengunduh audio...\n");
  for (const item of soundWords) {
    try {
      await download(item.text, item.file, item.dir);
      await new Promise((r) => setTimeout(r, 300));
    } catch (err) {
      console.error(`✗ Gagal: ${item.file} — ${err.message}`);
    }
  }
  console.log("\nSelesai!");
}

downloadAll();
