import { motion } from "framer-motion";
import { skill as mySkill } from "./asset";
import { Cpu, Code2, Monitor, Terminal } from "lucide-react"; // Ikon tambahan dari Lucide

export default function MySkills() {
  // Variasi animasi untuk progress bar
  const progressVariants = {
    hidden: { height: 0 },
    visible: (custom) => ({
      height: `${custom}%`,
      transition: { duration: 1.5, ease: "circOut", delay: 0.5 },
    }),
  };

  return (
    <section
      className="max-md:top-0 max-md:left-0 relative max-md:sticky flex justify-end items-center bg-utama max-md:bg-transparent w-full h-screen overflow-hidden font-jakarta"
      id="mySkills">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="flex justify-center items-center max-md:p-0 px-12.5 py-6.25 w-4/5 max-md:w-full h-full">
        <div className="flex flex-col gap-8 bg-white shadow-2xl p-10 max-md:p-6 border border-slate-100 rounded-3xl w-full h-full">
          {/* Header Section */}
          <div className="flex max-md:flex-col justify-between items-center max-md:gap-4 w-full">
            <span className="hidden md:block bg-slate-200 w-full h-px"></span>
            <div className="flex flex-col items-center gap-2 w-full md:w-1/2 text-center">
              <h1 className="font-bold text-utama text-sm uppercase tracking-[10px]">
                Bab 2
              </h1>
              <h2 className="font-extrabold text-slate-900 text-4xl">
                Technical Skills
              </h2>
            </div>
            <span className="hidden md:block bg-slate-200 w-full h-px"></span>
          </div>

          <div className="relative flex flex-col bg-slate-50 p-8 max-md:p-4 border border-slate-100 rounded-[2.5rem] overflow-hidden grow">
            {/* Legend / Title bar */}
            <div className="flex justify-between items-center bg-slate-900 shadow-lg mb-12 px-8 py-4 rounded-2xl text-white">
              <div className="flex items-center gap-3">
                <Cpu size={20} className="text-utama" />
                <h3 className="font-bold text-sm uppercase tracking-wider">
                  Expertise Inventory 2025
                </h3>
              </div>
              <span className="max-md:hidden opacity-50 text-[10px] italic uppercase tracking-[3px]">
                Interactive Growth Chart
              </span>
            </div>

            {/* Main Skills Chart Area */}
            <div className="items-end gap-8 max-md:gap-3 grid grid-cols-4 px-4 h-full grow">
              {mySkill.map((item) => (
                <div
                  key={item.name}
                  className="group relative flex flex-col justify-end items-center h-full">
                  {/* Tooltip on Hover */}
                  <div className="-top-4 group-hover:-top-8 z-20 absolute bg-slate-900 opacity-0 group-hover:opacity-100 shadow-xl px-3 py-1.5 rounded-lg font-bold text-white text-xs transition-all duration-300 pointer-events-none">
                    {item.name}
                  </div>

                  {/* Percentage Number */}
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mb-4 font-black text-slate-800 max-md:text-lg text-2xl">
                    {item.persent}%
                  </motion.span>

                  {/* Progress Column */}
                  <div className="relative flex items-end bg-white shadow-inner border border-slate-200 rounded-t-full w-full max-w-20 h-[70%] overflow-hidden">
                    {/* Animated Fill */}
                    <motion.div
                      custom={item.persent}
                      variants={progressVariants}
                      initial="hidden"
                      whileInView="visible"
                      className="relative bg-linear-to-t from-utama via-utama to-emerald-400 w-full">
                      {/* Glossy Effect */}
                      <div className="left-0 absolute inset-y-0 bg-white/20 w-1/3"></div>
                    </motion.div>
                  </div>

                  {/* Label Bawah */}
                  <p className="mt-4 font-bold text-slate-500 max-md:text-[10px] group-hover:text-utama text-sm text-center uppercase tracking-tighter transition-colors">
                    {item.name}
                  </p>
                </div>
              ))}
            </div>

            {/* Decorative Elements */}
            <div className="max-md:hidden right-8 bottom-8 absolute opacity-5">
              <Code2 size={120} />
            </div>
          </div>

          {/* Footer Hint */}
          <div className="flex justify-center gap-10 max-md:gap-4 py-2 overflow-x-auto">
            {[
              <Terminal size={18} />,
              <Monitor size={18} />,
              <Code2 size={18} />,
            ].map((icon, i) => (
              <div
                key={i}
                className="flex items-center gap-2 font-bold text-[10px] text-slate-400 uppercase tracking-widest">
                {icon}
                <span>Stack 0{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
