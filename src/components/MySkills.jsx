import { motion } from "framer-motion";
import { skill as mySkill } from "./asset";
import { Cpu, Code2, Monitor, Terminal, Sparkles } from "lucide-react";

export default function MySkills() {
  // Variasi untuk Container Utama
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  // Variasi untuk setiap Kartu Skill
  const itemVariants = {
    hidden: { y: 30, opacity: 0, filter: "blur(8px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  // Variasi untuk Progress Bar (Fill)
  const progressVariants = {
    hidden: { height: 0 },
    visible: (custom) => ({
      height: `${custom}%`,
      transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.8 },
    }),
  };

  return (
    <section
      className="max-md:top-0 max-md:left-0 relative max-md:sticky flex justify-end items-center bg-utama max-md:bg-transparent w-full h-screen overflow-hidden font-jakarta"
      id="mySkills">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex justify-center items-center max-md:p-0 px-12.5 py-6.25 w-4/5 max-md:w-full h-full">
        {/* Card Utama: Menambahkan overflow-hidden dan min-h-0 untuk stabilisasi */}
        <div className="relative flex flex-col gap-6 md:gap-8 bg-white/95 shadow-2xl backdrop-blur-md p-6 md:p-10 border border-slate-100 rounded-3xl w-full h-full min-h-0 overflow-hidden">
          {/* Decorative Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] opacity-[0.03] bg-size-[24px_24px] pointer-events-none"></div>
          <div className="top-0 right-0 z-0 absolute bg-utama/5 blur-3xl rounded-full w-96 h-96 -translate-y-1/2 translate-x-1/2"></div>

          {/* Header Section - FIXED: shrink-0 agar tidak dihancurkan oleh flex child bawah */}
          <div className="z-10 relative flex max-md:flex-col justify-between items-center max-md:gap-4 w-full shrink-0">
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 0.8 }}
              className="hidden md:block bg-linear-to-r from-transparent via-slate-300 to-transparent h-px"
            />
            <div className="flex flex-col items-center gap-1 md:gap-2 px-4 w-full md:w-auto md:min-w-[300px] text-center">
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block bg-utama/10 px-3 py-1 rounded-full font-bold text-utama text-xs uppercase tracking-[4px]">
                Chapter 2
              </motion.span>
              {/* FIXED: whitespace-nowrap agar tidak 2 baris, text size responsive */}
              <h2 className="bg-clip-text bg-linear-to-br from-slate-900 via-slate-800 to-slate-600 font-extrabold text-transparent text-2xl md:text-4xl tracking-tight whitespace-nowrap">
                Technical Skills
              </h2>
            </div>
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 0.8 }}
              className="hidden md:block bg-linear-to-r from-transparent via-slate-300 to-transparent h-px"
            />
          </div>

          {/* Dashboard Area - FIXED: min-h-0 dan flex-1 agar tidak membesar tak terkendali */}
          <div className="relative flex flex-col flex-1 bg-slate-900 shadow-inner p-5 md:p-8 border border-slate-800 rounded-4xl md:rounded-[2.5rem] min-h-0 overflow-hidden">
            {/* Ambient Light Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-900 opacity-70"></div>

            {/* Legend Bar - shrink-0 */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="z-10 relative flex justify-between items-center bg-slate-950/50 shadow-lg backdrop-blur-sm mb-6 md:mb-10 px-4 md:px-8 py-3 md:py-4 border border-slate-700/50 rounded-xl md:rounded-2xl text-white shrink-0">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="relative">
                  <Cpu size={16} className="md:w-5 md:h-5 text-utama" />
                  <span className="absolute inset-0 bg-utama opacity-50 blur-sm"></span>
                </div>
                <h3 className="font-bold text-[10px] text-slate-200 md:text-sm uppercase tracking-wider">
                  Expertise Inventory <span className="text-utama">2025</span>
                </h3>
              </div>
              <span className="max-md:hidden flex items-center gap-2 opacity-50 text-[10px] text-slate-400 italic uppercase tracking-[3px]">
                <Sparkles size={12} /> Interactive Growth Chart
              </span>
            </motion.div>

            {/* Main Skills Chart Area - FIXED: h-full diganti flex-1 min-h-0 agar stabil */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              className="z-10 relative flex-1 items-end gap-4 md:gap-8 grid grid-cols-4 px-2 md:px-4 min-h-0">
              {mySkill.map((item, index) => (
                <motion.div
                  key={item.name}
                  variants={itemVariants}
                  className="group relative flex flex-col justify-end items-center h-full cursor-pointer">
                  {/* Tooltip */}
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    whileHover={{ opacity: 1, y: 0, scale: 1 }}
                    className="-top-6 group-hover:-top-10 z-20 absolute bg-white shadow-xl px-3 py-1.5 border border-slate-200 rounded-lg font-bold text-[10px] text-slate-900 md:text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-300 pointer-events-none">
                    {item.name}
                    <div className="-bottom-1 left-1/2 absolute bg-white border-slate-200 border-r border-b w-2 h-2 rotate-45 -translate-x-1/2"></div>
                  </motion.div>

                  {/* Percentage Number */}
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="drop-shadow-lg mb-2 md:mb-4 font-black text-white group-hover:text-utama text-sm md:text-2xl tracking-tighter transition-colors">
                    {item.persent}
                    <span className="text-slate-500 text-xs md:text-sm">%</span>
                  </motion.span>

                  {/* Progress Column Container - FIXED: Tinggi 70% relatif terhadap parent tinggi */}
                  <div className="relative flex items-end bg-slate-950/50 shadow-inner backdrop-blur-sm border border-slate-700/50 rounded-t-xl md:rounded-t-2xl w-full max-w-12 md:max-w-20 h-[60%] md:h-[70%] overflow-hidden">
                    {/* Animated Fill */}
                    <motion.div
                      custom={item.persent}
                      variants={progressVariants}
                      initial="hidden"
                      whileInView="visible"
                      className="relative w-full overflow-hidden">
                      {/* Gradient Fill */}
                      <div className="absolute inset-0 bg-linear-to-t from-utama via-emerald-500 to-teal-400 w-full h-full" />

                      {/* Glossy Shine Effect */}
                      <div className="left-0 absolute inset-y-0 bg-linear-to-r from-white/30 to-transparent w-1/2 skew-x-[-20deg] transition-transform -translate-x-full group-hover:translate-x-[200%] duration-1000 ease-out"></div>

                      {/* Neon Glow Line */}
                      <div className="top-0 right-0 left-0 absolute bg-white shadow-[0_0_15px_rgba(255,255,255,0.7)] h-1"></div>
                    </motion.div>

                    {/* Horizontal Lines (Decor) */}
                    <div className="absolute inset-0 flex flex-col justify-evenly opacity-20 py-2 pointer-events-none">
                      <div className="bg-slate-700 w-full h-px"></div>
                      <div className="bg-slate-700 w-full h-px"></div>
                      <div className="bg-slate-700 w-full h-px"></div>
                    </div>
                  </div>

                  {/* Label Bawah - FIXED: Height fixed & text truncate/centered */}
                  <div className="flex justify-center items-center mt-2 w-full h-8 md:h-10">
                    <p className="w-full font-bold text-[8px] text-slate-400 md:text-[10px] group-hover:text-white text-center uppercase line-clamp-2 leading-tight tracking-tighter transition-colors duration-300">
                      {item.name}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Decorative Code Background */}
            <div className="max-md:hidden right-8 bottom-8 absolute opacity-5 text-white pointer-events-none">
              <Code2 size={120} strokeWidth={1} />
            </div>
          </div>

          {/* Footer Hint */}
          <div className="z-10 relative flex justify-center gap-6 md:gap-10 py-2 overflow-x-auto shrink-0">
            {[
              { icon: Terminal, label: "Logic" },
              { icon: Monitor, label: "UI/UX" },
              { icon: Code2, label: "Dev" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.1 }}
                className="group flex items-center gap-1.5 font-bold text-[9px] text-slate-400 md:text-[10px] hover:text-utama uppercase tracking-widest transition-colors cursor-default">
                <item.icon
                  size={14}
                  className="text-slate-300 group-hover:text-utama transition-colors"
                />
                <span>{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
