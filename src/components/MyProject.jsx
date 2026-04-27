import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ExternalLink,
  Calendar,
  Layers,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { project as myProject } from "./asset";

export default function MyProject() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAndSortedProjects = myProject
    .filter(
      (item) =>
        item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.slogan.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));

  return (
    <section
      className="top-0 left-0 relative max-md:sticky flex justify-end items-center bg-utama max-md:bg-transparent w-full h-screen overflow-hidden font-jakarta"
      id="myProject">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex justify-center items-center max-md:p-0 px-8 py-6 w-4/5 max-md:w-full h-full">
        {/* Container Putih Utama */}
        <div className="relative flex flex-col bg-white shadow-2xl border border-slate-100 rounded-[2.5rem] w-full h-[90vh] max-md:h-full overflow-hidden">
          {/* 1. Header & Search - Fixed di Atas */}
          <div className="flex flex-col gap-6 p-10 max-md:p-6 pb-2">
            <div className="flex max-md:flex-col justify-between items-center gap-4 w-full">
              <span className="hidden md:block flex-1 bg-slate-100 h-px"></span>
              <div className="flex flex-col items-center gap-1 px-8 text-center">
                <h1 className="font-bold text-utama text-xs uppercase tracking-[8px]">
                  Bab 3
                </h1>
                <h2 className="font-black text-slate-900 text-4xl tracking-tight">
                  My Projects
                </h2>
              </div>
              <span className="hidden md:block flex-1 bg-slate-100 h-px"></span>
            </div>

            {/* Search Bar Modern */}
            <div className="group relative mx-auto w-full max-w-lg">
              <Search
                className="top-1/2 left-5 absolute text-slate-400 group-focus-within:text-utama transition-colors -translate-y-1/2"
                size={20}
              />
              <input
                type="text"
                placeholder="Cari karya luar biasa..."
                className="bg-slate-50/50 hover:bg-slate-50 py-4 pr-6 pl-14 border-2 border-slate-100 focus:border-utama rounded-2xl focus:outline-none focus:ring-4 focus:ring-utama/10 w-full font-semibold text-slate-700 placeholder:text-slate-400 transition-all"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* 2. Galeri Project - Area Scrollable */}
          <div className="relative flex flex-col flex-1 justify-center overflow-hidden">
            {/* Indikator Scroll (Samping) */}
            <div className="hidden top-1/2 right-4 z-10 absolute md:flex flex-col gap-2 -translate-y-1/2">
              <div className="bg-utama/20 rounded-full w-1.5 h-12">
                <div className="bg-utama rounded-full w-full h-1/2 animate-bounce"></div>
              </div>
            </div>

            <div className="flex items-center gap-8 px-10 max-md:px-6 pb-10 w-full h-full overflow-x-auto overflow-y-hidden snap-mandatory snap-x select-none custom-scrollbar-minimal">
              <AnimatePresence mode="popLayout">
                {filteredAndSortedProjects.length > 0 ? (
                  filteredAndSortedProjects.map((item) => (
                    <motion.a
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ y: -10 }}
                      transition={{ duration: 0.4 }}
                      key={item.nama}
                      href={item.link}
                      target="_blank"
                      className="group relative flex-none shadow-2xl rounded-[2.5rem] w-[420px] max-md:w-[85vw] h-[480px] max-md:h-[60vh] overflow-hidden transition-all duration-500 snap-center">
                      {/* Gambar Project dengan Overlay */}
                      <img
                        src={item.img}
                        alt={item.nama}
                        className="absolute w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500"></div>

                      {/* Konten Teks */}
                      <div className="absolute inset-0 flex flex-col justify-end p-10 text-white">
                        <div className="space-y-4 transition-all duration-500 transform">
                          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl px-4 py-1.5 border border-white/20 rounded-full w-fit font-bold text-[10px] text-utama uppercase tracking-widest">
                            <Layers size={12} />
                            Featured Project
                          </div>
                          <h1 className="font-black text-3xl md:text-4xl uppercase leading-tight tracking-tighter">
                            {item.nama}
                          </h1>
                          <p className="opacity-0 group-hover:opacity-100 font-medium text-slate-300 text-lg line-clamp-2 leading-relaxed transition-opacity duration-500">
                            {item.slogan}
                          </p>

                          <div className="flex justify-between items-center pt-6 border-white/10 border-t">
                            <div className="flex items-center gap-2.5 text-slate-400 text-sm">
                              <Calendar size={16} />
                              {item.tanggal}
                            </div>
                            <div className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-xl font-bold text-slate-950 text-sm active:scale-95 group-hover:scale-105 transition-all transform">
                              View Project
                              <ChevronRight size={18} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.a>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col justify-center items-center py-20 w-full text-slate-300">
                    <Search size={64} className="opacity-20 mb-6" />
                    <p className="font-bold text-slate-400 text-2xl tracking-tight">
                      Project tidak ditemukan
                    </p>
                    <p className="text-slate-400">
                      Coba gunakan kata kunci lain
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CSS Khusus untuk Scrollbar Minimalis */}
      <style jsx>{`
        .custom-scrollbar-minimal::-webkit-scrollbar {
          height: 6px;
        }
        .custom-scrollbar-minimal::-webkit-scrollbar-track {
          background: transparent;
          margin: 0 100px;
        }
        .custom-scrollbar-minimal::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar-minimal::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
        @media (max-width: 768px) {
          .custom-scrollbar-minimal::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
