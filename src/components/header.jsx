import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  User,
  Code,
  Briefcase,
  Mail,
  Route,
  Sparkles,
  ArrowUpRight,
  Award,
} from "lucide-react";

export default function Header() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const menu = [
    { judul: "Home", link: "#", icon: Home },
    { judul: "About Me", link: "#aboutMe", icon: User },
    { judul: "My Skills", link: "#mySkills", icon: Code },
    { judul: "My Project", link: "#myProject", icon: Briefcase },
    { judul: "My Journey", link: "#timeline", icon: Route },
    { judul: "Achievements", link: "#achievements", icon: Award },
    { judul: "Contact", link: "#contact", icon: Mail },
  ];

  // Variants untuk Animasi Stagger (Muncul satu per satu)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <header className="max-md:hidden top-0 left-0 z-50 fixed flex flex-col justify-between items-center bg-slate-950/95 backdrop-blur-xl border-white/5 border-r w-72 h-screen font-jakarta">
      {/* --- Decorative Background Elements --- */}
      <div className="top-0 left-0 absolute bg-utama/10 blur-[100px] rounded-full w-48 h-48 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="right-0 bottom-0 absolute bg-emerald-500/5 blur-[80px] rounded-full w-32 h-32 translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      {/* --- LOGO SECTION (Top) --- */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="group relative mt-10 w-full cursor-pointer">
        {/* Container Logo dengan Border Glow */}
        <div className="relative flex justify-center items-center">
          <div className="absolute inset-0 bg-linear-to-tr from-utama/20 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
          <div className="relative flex justify-center items-center bg-slate-900/50 group-hover:bg-slate-900/80 shadow-lg border border-white/10 group-hover:border-utama/50 rounded-2xl w-16 h-16 transition-all duration-500">
            <h1 className="font-black text-white text-3xl tracking-tighter">
              FR
              <span className="text-utama">.</span>
            </h1>
          </div>
        </div>

        {/* Role Title under Logo */}
        <div className="mt-4 text-center">
          <h3 className="font-bold text-white text-sm tracking-wide">Fawwaz</h3>
          <p className="mt-1 text-[10px] text-slate-500 uppercase tracking-[3px]">
            Creative Developer
          </p>
        </div>

        {/* Decorative Separator */}
        <div className="bg-linear-to-r from-transparent via-slate-700 to-transparent mx-10 mt-6 h-px"></div>
      </motion.div>

      {/* --- NAVIGATION SECTION (Center) --- */}
      <motion.nav
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 justify-center py-8 w-full overflow-y-auto">
        <ul className="space-y-1.5 px-4">
          {menu.map((item, index) => (
            <motion.li
              key={item.judul}
              variants={itemVariants}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative list-none">
              <a
                href={item.link}
                className="group z-20 relative flex items-center gap-3 px-5 py-3 rounded-xl transition-colors duration-200">
                {/* Background Liquid Animation (Shared Layout) */}
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-utama shadow-lg shadow-utama/20 rounded-xl"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Index Number (Legacy Style) */}
                <span
                  className={`font-mono text-xs transition-colors duration-200 ${
                    hoveredIndex === index
                      ? "text-white/50 z-10"
                      : "text-slate-600"
                  }`}>
                  0{index + 1}
                </span>

                {/* Icon */}
                <motion.div
                  animate={
                    hoveredIndex === index
                      ? { scale: 1.1, x: 2 }
                      : { scale: 1, x: 0 }
                  }
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                  <item.icon
                    size={18}
                    strokeWidth={2}
                    className={`transition-colors duration-200 ${
                      hoveredIndex === index ? "text-white" : "text-slate-400"
                    }`}
                  />
                </motion.div>

                {/* Title */}
                <span
                  className={`font-semibold text-sm tracking-wide transition-colors duration-200 ${
                    hoveredIndex === index
                      ? "text-white z-10"
                      : "text-slate-300"
                  }`}>
                  {item.judul}
                </span>

                {/* Arrow Indicator */}
                <ArrowUpRight
                  size={14}
                  className={`absolute right-4 opacity-0 transition-all duration-200 ${
                    hoveredIndex === index
                      ? "opacity-100 text-white z-10"
                      : "opacity-0"
                  }`}
                />
              </a>
            </motion.li>
          ))}
        </ul>
      </motion.nav>

      {/* --- FOOTER / STATUS SECTION (Bottom) --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col items-center gap-4 mb-8 px-6 w-full">
        {/* Divider */}
        <div className="bg-linear-to-r from-transparent via-slate-700 to-transparent w-full h-px"></div>

        {/* Status Card */}
        <div className="flex items-center gap-3 bg-slate-900/50 shadow-inner px-4 py-3 border border-white/5 rounded-xl w-full">
          <div className="relative flex w-2.5 h-2.5">
            <span className="inline-flex absolute bg-green-400 opacity-75 rounded-full w-full h-full animate-ping"></span>
            <span className="inline-flex relative bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] rounded-full w-2.5 h-2.5"></span>
          </div>
          <div>
            <p className="font-semibold text-white text-xs">
              Available for Work
            </p>
            <p className="text-[10px] text-slate-500">
              Currently open for offers
            </p>
          </div>
        </div>

        {/* Copyright & Tech Stack Badge */}
        <div className="flex justify-between items-center w-full text-[9px] text-slate-600 uppercase tracking-[2px]">
          <span>© 2024 Fawwaz</span>
          <div className="flex items-center gap-1">
            <Sparkles size={10} className="text-utama" />
            <span>Made with Passion</span>
          </div>
        </div>
      </motion.div>
    </header>
  );
}
