const https = require("https");
const fs = require("fs");
const path = require("path");

const outputDir = path.join(__dirname, "public", "sounds");
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

const words = [
  // Anggota tubuh
  { text: "tenggorokan", file: "tenggorokan" },
  { text: "bokong", file: "bokong" },
  { text: "otot", file: "otot" },
  { text: "otak", file: "otak" },
  { text: "kepala", file: "kepala" },
  { text: "tangan", file: "tangan" },
  { text: "mata", file: "mata" },
  { text: "kaki", file: "kaki" },
  // Suku kata
  { text: "teng", file: "teng" },
  { text: "go", file: "go" },
  { text: "ro", file: "ro" },
  { text: "kan", file: "kan" },
  { text: "bo", file: "bo" },
  { text: "kong", file: "kong" },
  { text: "o", file: "o" },
  { text: "tot", file: "tot" },
  { text: "tak", file: "tak" },
  { text: "ke", file: "ke" },
  { text: "pa", file: "pa" },
  { text: "la", file: "la" },
  { text: "ngan", file: "ngan" },
  { text: "ta", file: "ta" },
  { text: "ma", file: "ma" },
  { text: "ki", file: "ki" },
  { text: "ka", file: "ka" },
  // Feedback
  { text: "Hebat! Jawabanmu benar!", file: "benar" },
  { text: "Coba lagi ya!", file: "salah" },
  // Kata utuh untuk mengeja
  { text: "jadi... tenggorokan", file: "jadi-tenggorokan" },
  { text: "jadi... bokong", file: "jadi-bokong" },
  { text: "jadi... otot", file: "jadi-otot" },
  { text: "jadi... otak", file: "jadi-otak" },
  { text: "jadi... kepala", file: "jadi-kepala" },
  { text: "jadi... tangan", file: "jadi-tangan" },
  { text: "jadi... mata", file: "jadi-mata" },
  { text: "jadi... kaki", file: "jadi-kaki" },
];

function download(text, filename) {
  return new Promise((resolve, reject) => {
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=id&client=tw-ob`;
    const dest = path.join(outputDir, `${filename}.mp3`);

    const file = fs.createWriteStream(dest);
    const req = https.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
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
  console.log(`Menyimpan audio ke: ${outputDir}\n`);
  for (const item of words) {
    try {
      await download(item.text, item.file);
      // Jeda kecil supaya tidak dianggap spam
      await new Promise((r) => setTimeout(r, 300));
    } catch (err) {
      console.error(`✗ Gagal: ${item.file} — ${err.message}`);
    }
  }
  console.log("\nSelesai!");
}

downloadAll();
