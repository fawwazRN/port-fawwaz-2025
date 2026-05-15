import { motion } from "framer-motion";
import { ChevronRight, Sparkles, ArrowDown } from "lucide-react";
import indo from "../assets/indo-conv.webm"; // Pastikan path ini sesuai dengan struktur project Anda

export default function Hero() {
  // ================= ANIMATION VARIANTS =================

  // Variasi untuk Container Utama (Mengatur alur kemunculan)
  const heroContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Jeda antar elemen anak
        delayChildren: 0.4, // Jeda awal sebelum animasi dimulai
      },
    },
  };

  // Variasi untuk Elemen Teks (Efek Muncul dari kabut + naik)
  const epicFadeUp = {
    hidden: { y: 40, opacity: 0, filter: "blur(10px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        mass: 1,
      },
    },
  };

  // Variasi khusus untuk Judul Besar (Lebih dramatis)
  const titleReveal = {
    hidden: { y: 80, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 12,
        mass: 1.5,
        delay: 0.2,
      },
    },
  };

  // Variasi untuk Tombol (Slide masuk dari bawah)
  const buttonVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] },
    },
    hover: { scale: 1.05, y: -2 },
    tap: { scale: 0.98 },
  };

  return (
    <section
      className="top-0 fixed flex justify-end max-md:justify-center items-center w-full h-screen overflow-hidden font-jakarta text-white"
      id="hero">
      <div className="relative bg-slate-950 w-5/6 max-md:w-full h-full">
        {/* --- BACKGROUND ASSETS --- */}

        {/* Video Background dengan Opacity Dinamis */}
        <motion.video
          src={indo}
          autoPlay
          loop
          muted
          playsInline
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full object-cover"></motion.video>

        {/* Overlay Cinematic Mastery (Layering untuk kedalaman) */}
        <div className="z-10 absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/70 to-transparent" />
        <div className="z-10 absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-slate-950/40" />

        {/* Efek Vignette (Supaya fokus ke tengah) */}
        <div className="z-10 absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.9)] pointer-events-none" />

        {/* Noise Texture Overlay (Memberikan kesan 'Legacy/Film') */}
        <div className="z-10 absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-[0.15] pointer-events-none" />

        {/* --- CONTENT SECTION --- */}

        <motion.div
          className="top-0 left-0 z-30 absolute flex flex-col justify-center items-start max-md:items-center gap-8 px-16 max-md:px-6 md:px-20 w-full h-full"
          variants={heroContainer}
          initial="hidden"
          animate="visible">
          {/* Badge: Glassmorphism & Shimmer Effect */}
          <motion.div
            variants={epicFadeUp}
            className="group relative flex items-center gap-2 bg-white/10 shadow-black/20 shadow-lg backdrop-blur-xl px-5 py-2.5 border border-white/20 rounded-full overflow-hidden font-medium text-sm uppercase tracking-[0.2em]">
            {/* Shimmer Animation */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12 transition-transform -translate-x-full group-hover:translate-x-full duration-1000" />
            <Sparkles size={14} className="text-utama animate-pulse" />
            <span className="z-10 relative text-white/90">
              Welcome to my creative space
            </span>
          </motion.div>

          {/* Main Typography */}
          <div className="space-y-4 py-2 overflow-hidden max-md:text-center">
            <motion.h2
              variants={epicFadeUp}
              className="inline-block pb-2 border-white/10 border-b font-light text-slate-400 max-md:text-xl text-3xl uppercase tracking-[0.3em]">
              Let's Discover
            </motion.h2>

            {/* Headline dengan Masking Effect */}
            <div className="pt-2 overflow-hidden">
              <motion.h1
                variants={titleReveal}
                className="drop-shadow-2xl font-black text-white max-md:text-6xl text-8xl leading-[0.9] tracking-tighter">
                My{" "}
                {/* Span Khusus untuk Kata Portfolio (Efek Gradient Bergerak) */}
                <span className="inline-block relative bg-clip-text bg-linear-to-r from-white via-utama to-white bg-size-[200%_auto] text-transparent animate-gradient-shine">
                  Portfolio
                  {/* Underline Dekoratif */}
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
                    className="bottom-2 left-0 absolute bg-utama/50 rounded-full h-1 -rotate-1"
                  />
                </span>
              </motion.h1>
            </div>
          </div>

          {/* Description */}
          <motion.p
            variants={epicFadeUp}
            className="max-md:mt-2 max-md:pt-4 pl-4 border-utama/50 max-md:border-t border-l-2 max-md:border-l-0 max-w-lg font-light text-slate-300 text-lg max-md:text-center leading-relaxed">
            Transforming ideas into digital reality through clean code and
            intuitive design. A legacy built one pixel at a time.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap max-md:justify-center gap-4 pt-4">
            {/* Primary Button (Solid) */}
            <motion.a
              href="#aboutMe"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="group relative flex items-center gap-2 bg-white shadow-2xl shadow-white/10 px-8 py-4 rounded-xl overflow-hidden font-bold text-slate-950 text-lg transition-colors duration-300">
              {/* Hover Fill Effect */}
              <span className="z-10 relative group-hover:text-white transition-colors duration-300">
                Start Exploring
              </span>
              <ChevronRight
                size={20}
                className="z-10 relative transition-transform group-hover:translate-x-2 duration-300"
              />
              <div className="absolute inset-0 bg-utama scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
            </motion.a>

            {/* Secondary Button (Outline) */}
            <motion.a
              href="#contact"
              variants={buttonVariants}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.1)",
              }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-2 bg-transparent shadow-lg backdrop-blur-sm px-8 py-4 border border-white/30 hover:border-utama rounded-xl font-bold text-lg transition-all duration-300">
              Get in Touch
              <ChevronRight
                size={18}
                className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 duration-300"
              />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator - Minimalis & Elegan */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="max-sm:hidden bottom-10 left-1/2 z-40 absolute flex flex-col items-center gap-3 text-white/40 -translate-x-1/2">
          <span className="font-light text-[10px] uppercase tracking-[4px]">
            Scroll Down
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1">
            <div className="bg-linear-to-b from-white/50 to-transparent w-px h-6"></div>
            <ArrowDown size={14} className="text-utama" />
          </motion.div>
        </motion.div>

        {/* Decorative Frame Lines (Legacy Touch) */}
        <div className="z-20 absolute inset-0 p-4 md:p-8 pointer-events-none">
          <div className="border border-white/5 rounded-3xl w-full h-full" />
        </div>
      </div>

      {/* Custom CSS for Gradient Animation */}
      <style>{`
        @keyframes gradient-shine {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }
        .animate-gradient-shine {
          animation: gradient-shine 4s linear infinite;
        }
      `}</style>
    </section>
  );
}
