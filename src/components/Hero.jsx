import { motion } from "framer-motion";
import { ChevronRight, MousePointer2, Sparkles } from "lucide-react";
import indo from "../assets/indo-conv.webm";

export default function Hero() {
  // Variasi animasi untuk teks
  const textVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2, duration: 0.8, ease: "easeOut" },
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.5 },
    },
  };

  return (
    <section
      className="top-0 fixed flex justify-end max-md:justify-center items-center w-full h-screen overflow-hidden font-jakarta text-white"
      id="hero">
      <div className="relative bg-slate-950 w-4/5 max-md:w-full h-full">
        {/* Background Video dengan Overlay yang Lebih Smooth */}
        <video
          src={indo}
          autoPlay
          loop
          muted
          playsInline
          className="opacity-50 w-full h-full object-cover"></video>

        {/* Overlay Gradient: Membuat teks lebih mudah dibaca & kesan cinematic */}
        <div className="z-10 absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent"></div>
        <div className="z-10 absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/20"></div>

        <div className="top-0 left-0 z-30 absolute flex flex-col justify-center items-start max-md:items-center gap-8 px-20 max-md:px-6 w-full h-full">
          {/* Badge Kecil Atas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 border border-white/20 rounded-full font-medium text-sm uppercase tracking-widest">
            <Sparkles size={14} className="text-utama" />
            Welcome to my creative space
          </motion.div>

          <div className="space-y-2 max-md:text-center">
            <motion.h2
              custom={1}
              initial="hidden"
              animate="visible"
              variants={textVariant}
              className="font-light text-slate-300 max-md:text-2xl text-4xl uppercase tracking-[10px]">
              Let's Discover
            </motion.h2>
            <motion.h1
              custom={2}
              initial="hidden"
              animate="visible"
              variants={textVariant}
              className="font-black max-md:text-6xl text-8xl leading-none tracking-tighter">
              My <span className="text-utama">Portfolio</span>
            </motion.h1>
          </div>

          <motion.p
            custom={3}
            initial="hidden"
            animate="visible"
            variants={textVariant}
            className="max-w-md text-slate-400 text-lg max-md:text-center leading-relaxed">
            Transforming ideas into digital reality through clean code and
            intuitive design.
          </motion.p>

          {/* Tombol Navigasi yang Disederhanakan & Lebih Elegan */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap max-md:justify-center gap-4">
            <a
              href="#aboutMe"
              className="group flex items-center gap-2 bg-white hover:bg-utama shadow-xl px-8 py-4 rounded-xl font-bold text-slate-950 hover:text-white text-lg transition-all duration-300">
              Start Exploring
              <ChevronRight
                size={20}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 backdrop-blur-sm px-8 py-4 border border-white/10 rounded-xl font-bold text-lg transition-all duration-300">
              Get in Touch
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="bottom-10 left-1/2 z-40 absolute flex flex-col items-center gap-2 text-white/30 -translate-x-1/2">
          <span className="text-[10px] uppercase tracking-[4px]">Scroll</span>
          <div className="bg-gradient-to-b from-white/50 to-transparent w-px h-12"></div>
        </motion.div>
      </div>
    </section>
  );
}
