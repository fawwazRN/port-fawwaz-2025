import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  MessageSquareText,
  User,
  Smartphone,
  MapPin,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

export default function Contact() {
  const [NDepan, setNDepan] = useState("");
  const [NBelakang, setNBelakang] = useState("");
  const [Message, setMessage] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const noHP = "0000000000"; // Ganti dengan nomor Anda
    const text = `Halo, saya ${NDepan} ${NBelakang}%0A%0A${Message}`;
    const masukWA = `https://api.whatsapp.com/send?phone=62${noHP}&text=${text}`;
    window.open(masukWA, "_blank");
  };

  // ================= VARIANTS =================
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const glowVariants = {
    initial: { opacity: 0.5, scale: 0.9 },
    animate: {
      opacity: 0.8,
      scale: 1,
      transition: { duration: 2, repeat: Infinity, repeatType: "reverse" },
    },
  };

  return (
    <section
      className="top-0 left-0 relative max-md:sticky flex justify-end items-center bg-utama max-md:bg-transparent w-full h-screen overflow-hidden font-jakarta"
      id="contact">
      <motion.div
        className="top-0 left-0 flex justify-center items-center max-md:p-0 px-12.5 py-6.25 w-4/5 max-md:w-full h-full"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}>
        {/* Main Card Container */}
        <div className="relative flex flex-col bg-white/90 shadow-2xl backdrop-blur-md p-6 md:p-10 border border-white/50 rounded-[1.75rem] md:rounded-[2.5rem] w-full h-full overflow-hidden max-sm:overflow-scroll">
          {/* Ambient Background Effects */}
          <div className="top-0 right-0 z-0 absolute bg-utama/5 blur-3xl rounded-full w-96 h-96 -translate-y-1/2 translate-x-1/2"></div>
          <div className="bottom-0 left-0 z-0 absolute bg-emerald-100/50 blur-3xl rounded-full w-64 h-64 -translate-x-1/2 translate-y-1/2"></div>

          {/* Grid Texture */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] opacity-[0.02] bg-size-[24px_24px] pointer-events-none"></div>

          {/* Header Section - Consistent with other sections */}
          <div className="z-10 relative flex md:flex-row flex-col justify-between items-start md:items-end gap-4 md:gap-6 mb-6 md:mb-8 w-full">
            <div className="w-full md:text-left text-center">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="flex justify-center md:justify-start items-center gap-2 mb-1">
                <div className="bg-utama/10 p-1 rounded-full">
                  <Sparkles size={12} className="text-utama" />
                </div>
                <h1 className="font-bold text-[10px] text-utama md:text-xs uppercase tracking-[3px] md:tracking-[5px]">
                  Chapter 6
                </h1>
              </motion.div>
              <h2 className="bg-clip-text bg-linear-to-r from-slate-900 to-slate-700 font-black text-transparent text-2xl md:text-4xl tracking-tight">
                Get in Touch
              </h2>
            </div>

            {/* Decorative Line */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="hidden md:block bg-linear-to-l from-transparent via-slate-200 to-transparent h-px"
            />
          </div>

          {/* Content Area - Split Layout */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="z-10 relative flex-1 gap-8 md:gap-16 grid md:grid-cols-5 min-h-0">
            {/* Left Column: Info & Legacy Vibe */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col justify-between space-y-6 col-span-2 h-full">
              <div>
                <h3 className="mb-4 font-bold text-slate-800 text-xl md:text-2xl leading-tight">
                  Let's build something{" "}
                  <span className="text-utama">legendary</span> together.
                </h3>
                <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                  Punya pertanyaan atau ide proyek? Saya selalu terbuka untuk
                  diskusi dan kolaborasi baru. Jangan ragu untuk menghubungi.
                </p>
              </div>

              {/* Contact Info Cards */}
              <div className="space-y-3">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="group flex items-center gap-4 bg-slate-50 hover:bg-utama/5 p-4 border border-slate-100 hover:border-utama/20 rounded-xl transition-all duration-300 cursor-default">
                  <div className="bg-utama/10 group-hover:bg-utama p-3 rounded-xl text-utama group-hover:text-white transition-colors">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-700 text-sm">
                      Location
                    </p>
                    <p className="text-slate-400 text-xs">Indonesia</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="group flex items-center gap-4 bg-slate-50 hover:bg-utama/5 p-4 border border-slate-100 hover:border-utama/20 rounded-xl transition-all duration-300 cursor-default">
                  <div className="bg-utama/10 group-hover:bg-utama p-3 rounded-xl text-utama group-hover:text-white transition-colors">
                    <Smartphone size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-700 text-sm">
                      WhatsApp
                    </p>
                    <p className="text-slate-400 text-xs">+62 000 0000 0000</p>
                  </div>
                </motion.div>
              </div>

              {/* Decorative Large Text */}
              <div className="max-md:hidden opacity-5 -mb-10 -ml-4 font-black text-[120px] text-slate-900 leading-none tracking-tighter select-none">
                MAIL.
              </div>
            </motion.div>

            {/* Right Column: The Form (Glassmorphism Card) */}
            <motion.div
              variants={itemVariants}
              className="relative col-span-3 h-full">
              {/* Inner Card Dark Mode Style */}
              <div className="relative flex flex-col bg-slate-900 shadow-inner p-6 md:p-8 border border-slate-800 rounded-2xl md:rounded-3xl w-full h-full overflow-hidden">
                {/* Ambient Glow inside Form */}
                <motion.div
                  variants={glowVariants}
                  initial="initial"
                  animate="animate"
                  className="top-0 right-0 absolute bg-utama/20 blur-[80px] rounded-full w-48 h-48 pointer-events-none"
                />

                <form
                  onSubmit={submit}
                  className="z-10 relative flex flex-col justify-between gap-5 w-full h-full">
                  {/* Input Grid */}
                  <div className="gap-5 grid md:grid-cols-2">
                    {/* First Name Input */}
                    <div className="group relative">
                      <User
                        className="top-3.5 left-4 absolute text-slate-500 group-focus-within:text-utama transition-colors"
                        size={16}
                      />
                      <input
                        type="text"
                        placeholder="Nama Depan"
                        required
                        onChange={(e) => setNDepan(e.target.value)}
                        className="peer bg-slate-800/50 py-3 pr-4 pl-11 border border-slate-700 focus:border-utama rounded-xl outline-none focus:ring-1 focus:ring-utama w-full text-white placeholder:text-slate-500 text-sm transition-all"
                      />
                    </div>

                    {/* Last Name Input */}
                    <div className="group relative">
                      <User
                        className="top-3.5 left-4 absolute text-slate-500 group-focus-within:text-utama transition-colors"
                        size={16}
                      />
                      <input
                        type="text"
                        placeholder="Nama Belakang"
                        required
                        onChange={(e) => setNBelakang(e.target.value)}
                        className="peer bg-slate-800/50 py-3 pr-4 pl-11 border border-slate-700 focus:border-utama rounded-xl outline-none focus:ring-1 focus:ring-utama w-full text-white placeholder:text-slate-500 text-sm transition-all"
                      />
                    </div>
                  </div>

                  {/* Message Textarea */}
                  <div className="group relative flex-1 min-h-[120px]">
                    <MessageSquareText
                      className="top-3.5 left-4 absolute text-slate-500 group-focus-within:text-utama transition-colors"
                      size={16}
                    />
                    <textarea
                      required
                      placeholder="Tulis pesan Anda di sini..."
                      onChange={(e) => setMessage(e.target.value)}
                      className="bg-slate-800/50 py-3 pr-4 pl-11 border border-slate-700 focus:border-utama rounded-xl outline-none focus:ring-1 focus:ring-utama w-full h-full text-white placeholder:text-slate-500 text-sm transition-all resize-none"></textarea>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="group relative flex justify-center items-center gap-2 bg-utama shadow-lg shadow-utama/20 py-4 rounded-xl overflow-hidden font-bold text-white transition-all duration-300">
                    {/* Button Shine Effect */}
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12 transition-transform -translate-x-full group-hover:translate-x-full duration-700" />

                    <span className="z-10 text-sm md:text-base tracking-wide">
                      KIRIM PESAN
                    </span>
                    <ArrowUpRight
                      size={18}
                      className="z-10 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
