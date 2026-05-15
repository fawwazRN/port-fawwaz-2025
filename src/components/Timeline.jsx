import { motion } from "framer-motion";
import {
  Calendar,
  Rocket,
  GraduationCap,
  Code,
  Laptop,
  Award,
  ChevronRight,
} from "lucide-react";

export default function Timeline() {
  const timelineData = [
    {
      year: "2021",
      title: "Awal Minat IT",
      desc: "Mulai tertarik mendalami dunia teknologi informasi dan belajar pemrograman dasar secara mandiri.",
      icon: Laptop,
      tags: ["Self-Taught", "Basics"],
    },
    {
      year: "2022",
      title: "Pendidikan Pesantren",
      desc: "Bergabung dengan Abudzar Tahfizh Plus IT. Menyeimbangkan hafalan Al-Qur'an dan fundamental IT.",
      icon: GraduationCap,
      tags: ["Tahfizh", "IT Foundation"],
    },
    {
      year: "2023",
      title: "Proyek Pertama",
      desc: "Mengerjakan proyek kolaboratif seperti Indotravel dan Webkita sebagai implementasi skill.",
      icon: Code,
      tags: ["Web Dev", "Collaboration"],
    },
    {
      year: "2024",
      title: "Pengembangan Diri",
      desc: "Membangun Portfolio pribadi, Eduverse, dan aktif dalam berbagai proyek IT kelas 10.",
      icon: Rocket,
      tags: ["Fullstack", "Portfolio"],
    },
  ];

  // ================= ANIMATION VARIANTS =================

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: (index) => ({
      opacity: 0,
      x: index % 2 === 0 ? -50 : 50,
      filter: "blur(10px)",
    }),
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15,
      },
    },
  };

  const lineVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: { duration: 1.5, ease: "easeInOut" },
    },
  };

  return (
    <section
      className="top-0 left-0 relative max-md:sticky flex justify-end items-center bg-utama max-md:bg-transparent w-full h-screen overflow-hidden font-jakarta"
      id="timeline">
      <motion.div
        className="top-0 left-0 flex justify-center items-center max-md:p-0 px-12.5 py-6.25 w-4/5 max-md:w-full h-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}>
        <div className="relative space-y-10 bg-white/95 shadow-2xl backdrop-blur-sm p-10 max-md:p-6 border border-slate-200/50 rounded-3xl w-full h-full overflow-y-auto">
          {/* Background Texture Overlay (Matching AboutMe) */}
          <div className="absolute inset-0 bg-[radial-gradient(theme(colors.slate.900)_1px,transparent_1px)] opacity-[0.02] pointer-events-none [background-size:20px_20px]"></div>

          {/* Header Section */}
          <motion.div
            className="z-10 relative flex justify-center items-center gap-4 w-full"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}>
            <span className="bg-linear-to-r from-transparent to-slate-200 w-full h-px"></span>
            <div className="flex-none px-4 min-w-fit text-center">
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block bg-utama/10 mb-1 px-3 py-1 rounded-full font-bold text-utama text-xs uppercase tracking-[4px]">
                Chapter 4
              </motion.span>
              <h2 className="font-bold text-slate-950 max-md:text-3xl text-4xl tracking-tight">
                My Journey
              </h2>
            </div>
            <span className="bg-linear-to-l from-transparent to-slate-200 w-full h-px"></span>
          </motion.div>

          {/* Timeline Body */}
          <div className="relative px-4 md:px-10 py-8">
            {/* Central Vertical Line */}
            <motion.div
              className="max-md:hidden top-0 bottom-0 left-1/2 absolute bg-linear-to-b from-utama via-slate-200 to-transparent w-0.5 origin-top -translate-x-1/2"
              variants={lineVariants}
            />

            <div className="space-y-16">
              {timelineData.map((item, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={cardVariants}
                  className={`relative flex items-center w-full ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-col`}>
                  {/* Dot on Line */}
                  <div className="max-md:hidden top-1/2 left-1/2 z-30 absolute bg-white shadow-[0_0_15px_rgba(var(--utama-rgb),0.4)] border-4 border-utama rounded-full w-5 h-5 -translate-x-1/2 -translate-y-1/2"></div>

                  {/* Card Content */}
                  <div
                    className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-16" : "md:pl-16"} max-md:pl-12`}>
                    <motion.div
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="relative bg-slate-50 hover:bg-white shadow-sm hover:shadow-xl p-6 border border-slate-100 hover:border-utama/30 rounded-2xl transition-all duration-300">
                      {/* Mobile Icon */}
                      <div className="md:hidden top-0 left-0 absolute flex justify-center items-center bg-utama shadow-lg border-4 border-white rounded-full w-10 h-10 text-white -translate-x-1/2">
                        <item.icon size={18} />
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1.5 bg-utama/10 px-3 py-1 rounded-full text-utama">
                          <Calendar size={14} />
                          <span className="font-bold text-xs">{item.year}</span>
                        </div>
                        {item.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="font-medium text-[10px] text-slate-400 uppercase tracking-wider">
                            • {tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="mb-2 font-bold text-slate-950 text-xl tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {item.desc}
                      </p>

                      {/* Icon for Desktop (Floating Side) */}
                      <div
                        className={`max-md:hidden absolute top-6 ${index % 2 === 0 ? "-right-12" : "-left-12"} text-utama opacity-20 group-hover:opacity-100 transition-opacity`}>
                        <item.icon size={32} />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="pt-12 text-center">
            <div className="inline-flex items-center gap-3 bg-slate-950 shadow-2xl px-6 py-3 border border-white/10 rounded-full">
              <div className="bg-utama p-1.5 rounded-full">
                <Award size={16} className="text-white animate-pulse" />
              </div>
              <span className="font-bold text-white text-sm tracking-wide">
                The Journey Continues...
              </span>
              <ChevronRight size={16} className="text-utama" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
