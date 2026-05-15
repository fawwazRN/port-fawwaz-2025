import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Calendar,
  Layers,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Aperture,
  Eye,
} from "lucide-react";
import { project as myProject } from "./asset";

export default function MyProject() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);

  // Logic Filter
  const allProjects = myProject
    .filter(
      (item) =>
        item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.slogan.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));

  const topProjects = allProjects.slice(0, 3);

  // ================= VARIANTS =================
  const flipContainerVariants = {
    front: {
      rotateY: 0,
      transition: { duration: 1.0, type: "spring", stiffness: 70, damping: 25 },
    },
    back: {
      rotateY: 180,
      transition: { duration: 1.0, type: "spring", stiffness: 70, damping: 25 },
    },
  };

  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const gridItemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <section
      className="top-0 left-0 relative max-md:sticky flex justify-end items-center bg-utama max-md:bg-transparent w-full h-screen overflow-hidden font-jakarta"
      id="myProject">
      <div className="flex justify-center items-center max-md:p-0 px-8 py-6 w-4/5 max-md:w-full h-full">
        <div
          className="relative w-full h-full"
          style={{ perspective: "2500px" }}>
          <motion.div
            variants={flipContainerVariants}
            animate={showAll ? "back" : "front"}
            className="absolute inset-0 w-full h-full"
            style={{ transformStyle: "preserve-3d" }}>
            {/* ==================== SISI DEPAN (BENTO GRID) ==================== */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{ backfaceVisibility: "hidden" }}>
              <div className="relative flex flex-col bg-white/95 shadow-2xl backdrop-blur-md p-4 md:p-8 border border-white/50 rounded-[1.75rem] md:rounded-[2.5rem] w-full h-full min-h-0 overflow-hidden">
                {/* Background Texture */}
                <div className="absolute inset-0 bg-[radial-gradient(var(--color-slate-900)_1px,transparent_1px)] opacity-[0.02] bg-size-[16px_16px] pointer-events-none"></div>
                <div className="top-0 right-0 z-0 absolute bg-utama/5 blur-3xl rounded-full w-96 h-96 -translate-y-1/2 translate-x-1/2"></div>

                {/* Header */}
                <div className="z-10 relative flex flex-col items-center gap-1 md:gap-2 mb-4 md:mb-6 pt-2 shrink-0">
                  <span className="inline-flex items-center gap-1.5 bg-utama/10 px-3 py-1 rounded-full font-bold text-[10px] text-utama md:text-xs uppercase tracking-[3px]">
                    <Sparkles size={10} /> Chapter 3
                  </span>
                  <h2 className="bg-clip-text bg-linear-to-br from-slate-900 via-slate-800 to-slate-600 font-black text-transparent text-xl md:text-3xl tracking-tight whitespace-nowrap">
                    Featured Works
                  </h2>
                </div>

                {/* Grid Layout */}
                <motion.div
                  variants={gridContainerVariants}
                  initial="hidden"
                  animate="visible"
                  className="z-10 relative flex-1 gap-3 md:gap-5 grid grid-cols-1 md:grid-cols-2 min-h-0">
                  {/* Kolom Kiri: Project Utama (Hero) */}
                  {topProjects[0] && (
                    <motion.div
                      variants={gridItemVariants}
                      layout
                      onClick={() => window.open(topProjects[0].link, "_blank")}
                      className="group relative shadow-2xl rounded-2xl md:rounded-3xl h-56 md:h-full overflow-hidden cursor-pointer">
                      <img
                        src={topProjects[0].img}
                        className="absolute w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-900/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

                      {/* Frame Effect */}
                      <div className="absolute inset-0 border-4 border-white/5 group-hover:border-utama/30 rounded-2xl md:rounded-3xl transition-colors pointer-events-none"></div>

                      <div className="bottom-0 left-0 absolute p-5 md:p-8 text-white">
                        {/* Badge Best Pick */}
                        <div className="inline-flex items-center gap-1.5 bg-utama shadow-lg shadow-utama/30 mb-2 md:mb-3 px-2.5 py-1 rounded-full w-fit font-bold text-[10px] md:text-xs uppercase tracking-wider whitespace-nowrap">
                          <Sparkles size={10} className="text-yellow-300" />
                          <span>Best Pick</span>
                        </div>

                        <h3 className="drop-shadow-xl font-black group-hover:text-utama text-xl md:text-4xl uppercase line-clamp-2 leading-tight tracking-tight transition-colors duration-300">
                          {topProjects[0].nama}
                        </h3>
                        <p className="hidden md:block mt-3 pl-3 border-utama/50 border-l-2 font-light text-slate-300 text-sm line-clamp-2">
                          {topProjects[0].slogan}
                        </p>
                      </div>

                      <div className="top-4 right-4 absolute bg-white/20 opacity-0 group-hover:opacity-100 backdrop-blur-md p-2 rounded-full scale-50 group-hover:scale-100 transition-all duration-300 transform">
                        <Eye size={18} className="text-white" />
                      </div>
                    </motion.div>
                  )}

                  {/* Kolom Kanan: Grid Stack */}
                  <div className="flex flex-col gap-3 md:gap-5 h-full min-h-0">
                    {topProjects[1] && (
                      <motion.div
                        variants={gridItemVariants}
                        layout
                        onClick={() =>
                          window.open(topProjects[1].link, "_blank")
                        }
                        className="group relative flex-1 shadow-lg rounded-2xl md:rounded-3xl h-36 md:h-auto min-h-[140px] overflow-hidden cursor-pointer">
                        <img
                          src={topProjects[1].img}
                          className="absolute w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 to-transparent" />
                        <div className="bottom-0 left-0 absolute p-4 md:p-6 text-white">
                          <h3 className="font-bold group-hover:text-utama text-base md:text-xl line-clamp-1 transition-colors">
                            {topProjects[1].nama}
                          </h3>
                          <p className="mt-1 text-[10px] text-slate-300 md:text-xs line-clamp-1">
                            {topProjects[1].slogan}
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {/* Baris Bawah: Project 3 & View All */}
                    <div className="flex md:flex-row flex-col flex-1 gap-3 md:gap-5 min-h-0">
                      {topProjects[2] && (
                        <motion.div
                          variants={gridItemVariants}
                          layout
                          onClick={() =>
                            window.open(topProjects[2].link, "_blank")
                          }
                          className="group relative flex-1 shadow-md rounded-2xl md:rounded-3xl h-28 md:h-auto min-h-[100px] overflow-hidden cursor-pointer">
                          <img
                            src={topProjects[2].img}
                            className="absolute w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 to-transparent" />
                          <div className="bottom-0 left-0 absolute p-3 md:p-5 text-white">
                            <h3 className="font-bold group-hover:text-utama text-sm md:text-lg line-clamp-1 transition-colors">
                              {topProjects[2].nama}
                            </h3>
                          </div>
                        </motion.div>
                      )}

                      {/* Tombol View All - Diperbaiki Responsive */}
                      <motion.div
                        variants={gridItemVariants}
                        layout
                        onClick={() => setShowAll(true)}
                        className="group relative flex-1 justify-center items-center bg-linear-to-br from-slate-900 to-slate-950 shadow-xl p-4 border border-slate-800 rounded-2xl md:rounded-3xl min-h-[100px] md:min-h-0 overflow-hidden cursor-pointer">
                        {/* Animated Background Glow */}
                        <div className="absolute inset-0 bg-linear-to-br from-utama/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_70%)]" />

                        <div className="z-10 relative flex flex-col justify-center items-center h-full text-center">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 20,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="mb-1 md:mb-2">
                            <Aperture
                              size={24}
                              className="opacity-80 group-hover:opacity-100 mx-auto text-utama transition-opacity"
                            />
                          </motion.div>
                          <span className="font-bold text-white group-hover:text-utama text-xs md:text-sm whitespace-nowrap transition-colors">
                            View All
                          </span>
                          <span className="block mt-0.5 text-[9px] text-slate-500 group-hover:text-slate-300 transition-colors">
                            {myProject.length} Projects
                          </span>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* ==================== SISI BELAKANG (THE ARCHIVE) ==================== */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}>
              {/* Dark Theme Container */}
              <div className="relative flex flex-col bg-slate-950 shadow-2xl border border-slate-800 rounded-[2.5rem] w-full h-full overflow-hidden text-white">
                {/* Ambient Light Effects */}
                <div className="top-0 left-1/4 absolute bg-utama/10 blur-[120px] rounded-full w-96 h-96 pointer-events-none"></div>
                <div className="right-0 bottom-0 absolute bg-emerald-500/5 blur-[100px] rounded-full w-64 h-64 pointer-events-none"></div>

                {/* Header Section */}
                <div className="z-20 relative flex flex-col gap-3 md:gap-4 bg-slate-900/50 backdrop-blur-xl p-4 md:p-6 border-white/5 border-b shrink-0">
                  <div className="flex justify-between items-center w-full">
                    <motion.button
                      whileHover={{ x: -5 }}
                      onClick={() => setShowAll(false)}
                      className="flex items-center gap-2 hover:bg-white/5 px-3 py-1.5 rounded-full text-slate-400 hover:text-white transition-colors">
                      <ArrowLeft size={16} />
                      <span className="hidden md:block font-semibold text-xs">
                        Back
                      </span>
                    </motion.button>

                    <div className="flex flex-col flex-1 items-center text-center">
                      <span className="mb-0.5 text-[9px] text-utama/80 uppercase tracking-[6px]">
                        Archive
                      </span>
                      <h2 className="font-black text-white text-lg md:text-2xl tracking-tight">
                        All Projects
                      </h2>
                    </div>

                    <div className="w-16 md:w-20"></div>
                  </div>

                  {/* Search Bar */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="group relative mx-auto w-full max-w-md">
                    <div className="absolute inset-0 bg-utama/20 opacity-0 group-focus-within:opacity-60 blur-md rounded-xl transition-opacity duration-500"></div>
                    <div className="relative flex items-center bg-slate-800/60 border border-white/5 group-focus-within:border-utama/50 rounded-xl overflow-hidden transition-colors">
                      <Search
                        className="ml-3 text-slate-500 group-focus-within:text-utama transition-colors"
                        size={16}
                      />
                      <input
                        type="text"
                        placeholder="Search archive..."
                        className="bg-transparent py-2.5 pr-4 pl-2 outline-none w-full font-medium text-white placeholder:text-slate-600 text-xs md:text-sm"
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Grid Gallery Area - Responsive Vertical Grid */}
                <div className="z-10 relative flex-1 bg-transparent p-4 md:p-6 min-h-0 overflow-x-hidden overflow-y-auto custom-scrollbar-dark">
                  <motion.div
                    layout
                    className="gap-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <AnimatePresence mode="popLayout">
                      {allProjects.length > 0 ? (
                        allProjects.map((item, index) => (
                          <motion.div
                            layout
                            key={item.nama}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{
                              opacity: 0,
                              scale: 0.9,
                              filter: "blur(10px)",
                            }}
                            transition={{ duration: 0.4, delay: index * 0.03 }}
                            className="group relative h-full">
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex flex-col bg-slate-900/50 shadow-lg hover:shadow-2xl hover:shadow-utama/10 border border-white/5 hover:border-utama/30 rounded-2xl h-full overflow-hidden transition-all duration-300 cursor-pointer">
                              {/* Image Section */}
                              <div className="relative h-28 md:h-36 overflow-hidden">
                                <img
                                  src={item.img}
                                  alt={item.nama}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-slate-900 to-transparent opacity-40"></div>
                              </div>

                              {/* Content Section */}
                              <div className="relative flex flex-col flex-1 p-3 md:p-4">
                                <h3 className="mb-1 font-bold text-white group-hover:text-utama text-xs md:text-sm line-clamp-2 leading-snug transition-colors">
                                  {item.nama}
                                </h3>
                                <p className="hidden md:block mb-2 text-[10px] text-slate-400 line-clamp-1">
                                  {item.slogan}
                                </p>

                                <div className="flex justify-between items-center mt-auto pt-2 border-white/5 border-t">
                                  <div className="flex items-center gap-1 text-[9px] text-slate-500 md:text-[10px]">
                                    <Calendar size={10} />
                                    {item.tanggal}
                                  </div>
                                  <motion.div
                                    whileHover={{ x: 3 }}
                                    className="flex items-center gap-0.5 font-bold text-[10px] text-utama group-hover:text-white transition-colors">
                                    Open <ChevronRight size={12} />
                                  </motion.div>
                                </div>
                              </div>
                            </a>
                          </motion.div>
                        ))
                      ) : (
                        <motion.div
                          key="no-result"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex flex-col justify-center items-center col-span-full h-64 text-center">
                          <div className="bg-slate-800 mb-4 p-4 border border-white/5 rounded-full">
                            <Search size={32} className="text-slate-600" />
                          </div>
                          <p className="font-semibold text-slate-400 text-lg">
                            No Projects Found
                          </p>
                          <p className="mt-1 text-slate-600 text-sm">
                            Try searching for something else...
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Custom CSS for Dark Scrollbar */}
      <style>{`
        .custom-scrollbar-dark::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar-dark::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar-dark::-webkit-scrollbar-thumb {
          background: #334155; /* slate-700 */
          border-radius: 20px;
        }
        .custom-scrollbar-dark::-webkit-scrollbar-thumb:hover {
          background: #475569; /* slate-600 */
        }
      `}</style>
    </section>
  );
}
