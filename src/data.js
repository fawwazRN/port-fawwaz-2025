const base = import.meta.env.BASE_URL;
const img = (n) => `${base}img/${n}.webp`;
const cert = (n) => `${base}cert/${n}.webp`;

export const PROFILE = {
  name: "Fawwaz Romzi Nagib",
  email: "fawwaz1511@student.abudzar.sch.id",
  github: "https://github.com/fawwazrn",
  startYear: 2021,
  photo: img("fawwaz"),
};

export const ROLES = ["Front-end Developer", "Video Editor", "Creative Writer", "Santri Abudzar IT"];

export const SKILLS = [
  {
    name: "Front-end Developer",
    level: 90,
    text: "Antarmuka yang terasa hidup: layout responsif, motion yang halus, dan arsitektur komponen yang rapi dengan React.",
  },
  {
    name: "Video Editing",
    level: 50,
    text: "Potongan, tempo, dan transisi yang bercerita — rasa ritme yang sama saya bawa ke animasi UI.",
  },
  {
    name: "Creative Writing",
    level: 50,
    text: "Kata-kata yang memberi suara pada produk: copywriting, caption, dan cerita singkat.",
  },
  {
    name: "Back-end Developer",
    level: 20,
    text: "Sisi lain dari stack: API, data, dan deployment. Masih awal, tapi belajarnya cepat.",
  },
];

export const TOOLS = [
  "React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "GSAP", "Framer Motion",
  "Vite", "Git", "GitHub Pages", "Netlify", "Vercel",
];

export const PROJECTS = [
  { nama: "Quran.me", slogan: "Bringing the Qur'an closer to your daily life", persent: 90, link: "https://project-quranme.netlify.app/", img: img("quran"), tanggal: "2026-04-15" },
  { nama: "RA Nurul Huda", slogan: "Belajar ceria, berakhlak mulia", persent: 100, link: "https://ra-nurulhuda.netlify.app/", img: img("ra"), tanggal: "2026-04-14" },
  { nama: "EduCourse", slogan: "Upgrade skill, buka peluang baru", persent: 90, link: "https://learnfromeducourse.netlify.app/", img: img("educourse"), tanggal: "2026-03-03" },
  { nama: "Check Cuaca", slogan: "", persent: 100, link: "https://check-cuaca.netlify.app/", img: img("cuaca"), tanggal: "2026-02-19" },
  { nama: "Undangan Nikah Syar'i", slogan: "Ketika cinta bertaut syar'i", persent: 78, link: "https://undangannikahsyari.netlify.app/", img: img("undangan"), tanggal: "2026-02-18" },
  { nama: "GrowSmart!", slogan: "Grow smarter every day", persent: 100, link: "https://growsmarts.netlify.app/", img: img("growsmart"), tanggal: "2026-02-02" },
  { nama: "Semusim Coffee", slogan: "Satu cangkir kenangan", persent: 100, link: "https://semusim-coffee.netlify.app/", img: img("semusim"), tanggal: "2026-01-22" },
  { nama: "GTK Pacu Jalur", slogan: "", persent: 100, link: "https://pacujalur.vercel.app/", img: img("pacujalur"), tanggal: "2025-10-26" },
  { nama: "EduVerse", slogan: "Learn without limits", persent: 30, link: "https://fawwazrn.github.io/EDUVERSE/", img: img("eduverse"), tanggal: "2025-10-18" },
  { nama: "Online Sticky Notes", slogan: "Quick notes for quick minds", persent: 100, link: "https://fawwazrn.github.io/sticky-notes/", img: img("sticky"), tanggal: "2025-09-05" },
  { nama: "WebKita", slogan: "Simple web. Simple life.", persent: 100, link: "https://fawwazrn.github.io/WebKita/", img: img("webkita"), tanggal: "2025-04-24" },
  { nama: "Animal Story", slogan: "Daily facts from the wild", persent: 100, link: "https://fawwazrn.github.io/animal-story/", img: null, tanggal: "2024-10-31" },
];

export const JOURNEY = [
  { year: "2021", title: "Awal minat di IT", text: "Mulai tertarik pada dunia teknologi dan belajar pemrograman dasar secara mandiri.", tags: ["Self-taught"] },
  { year: "2022", title: "Masuk pesantren", text: "Bergabung dengan Abudzar Tahfizh Plus IT — menyeimbangkan hafalan Al-Qur'an dengan fundamental IT bersama Ustadz Firman Azhary.", tags: ["Abudzar IT", "Tahfizh"] },
  { year: "2023", title: "Proyek pertama", text: "Mengerjakan proyek kolaboratif seperti Indotravel dan WebKita sebagai latihan nyata dari ilmu yang dipelajari.", tags: ["Indotravel", "WebKita"] },
  { year: "2024", title: "Membangun diri", text: "Portfolio pertama, Animal Story, dan awal EduVerse. Lulus kelas Dasar Pemrograman Web di Dicoding.", tags: ["Portfolio", "Dicoding"] },
  { year: "2025", title: "Naik level", text: "Peserta lomba Web Dev di IDN IT Fest, sertifikat HTML/CSS/JavaScript dari Sololearn, serta rilis Sticky Notes dan GTK Pacu Jalur.", tags: ["IDN IT Fest", "Sololearn"] },
  { year: "2026", title: "Mulai ngebut", text: "Tujuh project dirilis, dari Semusim Coffee sampai Quran.me, plus Coding Camp DBS Foundation.", tags: ["Coding Camp", "7 project"] },
];

export const AWARDS = [
  { id: 1, title: "Introduction to Financial Literacy", cat: "Certification", date: "Mei 2026", img: cert("dicoding1"), desc: "Kelas Literasi Finansial Coding Camp DBS Foundation 2026: prinsip dasar, keputusan keuangan harian, dan strategi jangka panjang." },
  { id: 2, title: "Introduction to JavaScript", cat: "Certification", date: "Nov 2025", img: cert("sololearn3"), featured: true, desc: "Sertifikat resmi Sololearn: logika pemrograman, manipulasi elemen web, dan dasar pembuatan website yang interaktif." },
  { id: 3, title: "Peserta Lomba Web Dev — IDN IT Fest 2025", cat: "Achievement", date: "Nov 2025", img: cert("idn1"), desc: "Penghargaan partisipasi aktif dalam kompetisi Web Development offline yang diselenggarakan IDN Boarding School." },
  { id: 4, title: "Introduction to CSS", cat: "Certification", date: "Nov 2025", img: cert("sololearn2"), desc: "Sertifikat resmi Sololearn: desain, layout, dan aspek visual halaman web yang responsif." },
  { id: 5, title: "Introduction to HTML", cat: "Certification", date: "Nov 2025", img: cert("sololearn1"), desc: "Sertifikat resmi Sololearn: struktur dasar halaman web dan fundamental web development." },
  { id: 6, title: "Belajar Dasar Pemrograman Web", cat: "Certification", date: "Okt 2024", img: cert("dicoding2"), desc: "Kelulusan resmi Dicoding Indonesia: HTML, CSS, dan teknik layout responsif standar industri." },
];

export const NAV = [
  ["home", "Home"],
  ["about", "About"],
  ["skills", "Skills"],
  ["work", "Work"],
  ["journey", "Journey"],
  ["awards", "Awards"],
  ["contact", "Contact"],
];

export const year = (d) => d.slice(0, 4);
export const monthYear = (d) =>
  new Date(d).toLocaleDateString("id-ID", { month: "short", year: "numeric" });
export const host = (u) => u.replace(/^https?:\/\//, "").replace(/\/$/, "");
