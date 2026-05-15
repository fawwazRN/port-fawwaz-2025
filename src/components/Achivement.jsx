import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Search,
  SearchX,
  ArrowRight,
  Calendar,
  Star,
} from "lucide-react";

export default function Achievement() {
  const [searchTerm, setSearchTerm] = useState("");

  const achievementData = [
    {
      id: 1,
      title: "1st Place Web Design Competition",
      category: "Competition",
      date: "Des 2024",
      image:
        "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?q=80&w=500&auto=format&fit=crop",
      desc: "Juara 1 dalam kompetisi desain antarkelas dengan fokus pada User Experience dan aksesibilitas.",
      highlight: true,
    },
    {
      id: 2,
      title: "Fullstack Web Development Certification",
      category: "Certification",
      date: "Okt 2024",
      image:
        "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=500&auto=format&fit=crop",
      desc: "Sertifikasi keahlian membangun aplikasi web modern menggunakan React dan Node.js.",
    },
    {
      id: 3,
      title: "Tahfizh 5 Juz Al-Qur'an",
      category: "Religious",
      date: "Mei 2024",
      image:
        "https://images.unsplash.com/photo-1585036156171-3839efc229b7?q=80&w=500&auto=format&fit=crop",
      desc: "Pencapaian spiritual dalam menjaga hafalan Al-Qur'an di sela-sela kesibukan belajar IT.",
    },
    {
      id: 4,
      title: "Top Contributor Project Eduverse",
      category: "Honor",
      date: "Jan 2024",
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=500&auto=format&fit=crop",
      desc: "Penghargaan atas dedikasi luar biasa dalam pengembangan fitur inti platform Eduverse.",
    },
  ];

  const filteredData = achievementData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
    hover: {
      y: -5,
      transition: { type: "spring", stiffness: 300 },
    },
  };

  return (
    <section
      className="top-0 left-0 relative max-md:sticky flex justify-end items-center bg-utama max-md:bg-transparent w-full h-screen overflow-hidden font-jakarta"
      id="achievements">
      <motion.div
        className="top-0 left-0 flex justify-center items-center max-md:p-0 px-12.5 py-6.25 w-4/5 max-md:w-full h-full"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}>
        {/* Main Card Container - Responsive Padding */}
        <div className="relative flex flex-col bg-white/90 shadow-2xl backdrop-blur-md p-6 md:p-10 border border-white/50 rounded-[1.75rem] md:rounded-[2.5rem] w-full h-full overflow-hidden">
          {/* Decorative Blobs */}
          <div className="top-0 right-0 z-0 absolute bg-utama/5 blur-3xl rounded-full w-64 md:w-96 h-64 md:h-96 -translate-y-1/2 translate-x-1/2"></div>
          <div className="bottom-0 left-0 z-0 absolute bg-emerald-100/50 blur-3xl rounded-full w-48 md:w-64 h-48 md:h-64 -translate-x-1/2 translate-y-1/2"></div>

          {/* Header Section - Responsive Flex */}
          <div className="z-10 relative flex md:flex-row flex-col justify-between items-start md:items-end gap-4 md:gap-6 mb-6 md:mb-10 w-full">
            <div className="w-full md:w-auto md:text-left text-center">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="flex justify-center md:justify-start items-center gap-2 mb-1">
                <div className="bg-utama/10 p-1 rounded-full">
                  <Trophy size={12} className="text-utama" />
                </div>
                <h1 className="font-bold text-[10px] text-utama md:text-xs uppercase tracking-[3px] md:tracking-[5px]">
                  Chapter 5
                </h1>
              </motion.div>
              <h2 className="bg-clip-text bg-linear-to-r from-slate-900 to-slate-700 font-black text-transparent text-2xl md:text-4xl tracking-tight">
                Achievements
              </h2>
            </div>

            {/* Search Bar - Responsive Width */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="group relative w-full md:w-auto md:max-w-xs">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-linear-to-r from-utama to-emerald-400 opacity-0 group-focus-within:opacity-100 blur-sm rounded-xl md:rounded-2xl transition-opacity duration-300"></div>

              <div className="relative flex items-center bg-white shadow-sm md:shadow-md border border-slate-100 group-focus-within:border-transparent rounded-xl md:rounded-2xl overflow-hidden">
                <Search
                  className="ml-3 md:ml-4 text-slate-400 group-focus-within:text-utama transition-colors"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search achievements..."
                  className="bg-transparent py-2.5 md:py-3.5 pr-4 pl-2 outline-none w-full text-slate-800 placeholder:text-slate-300 text-xs md:text-sm"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </motion.div>
          </div>

          {/* Content Area - Scrollable */}
          <div className="z-10 relative flex-1 pr-1 md:pr-2 overflow-y-auto custom-scrollbar">
            <AnimatePresence mode="wait">
              {filteredData.length > 0 ? (
                <motion.div
                  key="grid"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="gap-4 md:gap-6 grid grid-cols-1 md:grid-cols-2 pb-4">
                  {filteredData.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      variants={cardVariants}
                      whileHover="hover"
                      whileTap={{ scale: 0.98 }} // Touch feedback for mobile
                      className="group relative flex flex-col bg-white shadow-sm border border-slate-100/80 rounded-2xl md:rounded-4xl overflow-hidden cursor-pointer">
                      {/* Image Section - Responsive Height */}
                      <div className="relative h-40 md:h-52 overflow-hidden">
                        <motion.img
                          src={item.image}
                          className="w-full h-full object-cover"
                          initial={{ scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/30 to-transparent" />

                        {/* Badges - Scaled for Mobile */}
                        <div className="top-3 right-3 left-3 absolute flex justify-between items-start">
                          <span className="flex items-center gap-1 bg-white/20 shadow-lg backdrop-blur-sm px-2 py-1 border border-white/10 rounded-full font-semibold text-[10px] text-white md:text-[11px] uppercase tracking-wider">
                            <Star size={10} className="text-yellow-300" />
                            {item.category}
                          </span>
                          {item.highlight && (
                            <span className="bg-utama shadow-lg px-2 py-1 rounded-md font-bold text-[9px] text-white md:text-[10px] animate-pulse">
                              TOP
                            </span>
                          )}
                        </div>

                        {/* Title on Image */}
                        <div className="right-3 bottom-3 left-3 absolute">
                          <h3 className="drop-shadow-md font-bold text-white text-base md:text-xl leading-tight">
                            {item.title}
                          </h3>
                        </div>
                      </div>

                      {/* Content Section - Responsive Padding */}
                      <div className="bg-white p-4 md:p-5">
                        <p className="mb-3 md:mb-4 text-slate-500 text-xs md:text-sm line-clamp-2 leading-relaxed">
                          {item.desc}
                        </p>

                        <div className="flex justify-between items-center pt-3 border-slate-50 border-t">
                          <div className="flex items-center gap-1.5 text-slate-400">
                            <Calendar size={12} />
                            <span className="font-medium text-[10px] md:text-xs">
                              {item.date}
                            </span>
                          </div>

                          <motion.button
                            whileHover={{ x: 3 }}
                            className="flex items-center gap-1 group-hover:gap-2 font-bold text-utama text-xs md:text-sm transition-all duration-300">
                            <span className="hidden md:inline opacity-80 group-hover:opacity-100">
                              View
                            </span>
                            <ArrowRight
                              size={14}
                              className="opacity-70 group-hover:opacity-100 transition-opacity"
                            />
                          </motion.button>
                        </div>
                      </div>

                      {/* Border Glow Hover */}
                      <div className="absolute inset-0 border-2 border-transparent group-hover:border-utama/20 rounded-2xl md:rounded-4xl transition-colors duration-300 pointer-events-none"></div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                /* Empty State - Clean & Centered */
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col justify-center items-center h-full min-h-[300px] text-center">
                  <div className="bg-slate-50 shadow-sm mb-4 p-4 rounded-full">
                    <SearchX size={28} className="text-slate-300" />
                  </div>
                  <p className="font-semibold text-slate-400 text-base md:text-lg">
                    Achievement not found
                  </p>
                  <p className="mt-1 text-slate-300 text-xs md:text-sm">
                    Try another keyword...
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Custom Scrollbar CSS */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </section>
  );
}
