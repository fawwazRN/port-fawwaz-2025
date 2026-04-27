import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageSquare, User, Mail, Smartphone } from "lucide-react"; // Import ikon Lucide

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

  // Variasi animasi untuk container
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section
      className="max-md:top-0 max-md:left-0 relative max-md:sticky flex justify-end items-center bg-utama max-md:bg-transparent w-full h-screen overflow-hidden font-jakarta"
      id="contact">
      <motion.div
        className="top-0 left-0 flex justify-center items-center max-md:p-0 px-12.5 py-6.25 w-4/5 max-md:w-full h-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}>
        <div className="flex flex-col space-y-8 bg-white shadow-2xl p-10 max-md:p-6 border border-slate-100 rounded-3xl w-full h-full overflow-y-auto">
          {/* Header Section */}
          <div className="flex max-md:flex-col justify-between items-center max-md:gap-4 w-full">
            <span className="bg-slate-200 w-full h-px"></span>
            <div className="flex-none px-8 text-center">
              <h1 className="font-bold text-utama text-sm uppercase tracking-[8px]">
                Any
              </h1>
              <h2 className="font-extrabold text-slate-900 text-4xl">
                QuestioN
              </h2>
            </div>
            <span className="bg-slate-200 w-full h-px"></span>
          </div>

          <div className="gap-10 grid grid-cols-1 lg:grid-cols-2 h-full">
            {/* Info Section (Sisi Kiri pada Desktop) */}
            <motion.div
              className="flex flex-col justify-center space-y-6"
              variants={itemVariants}>
              <h3 className="font-bold text-slate-800 text-2xl">
                Mari Terhubung!
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Punya pertanyaan atau ingin bekerja sama dalam sebuah proyek?
                Isi formulir ini dan pesan Anda akan langsung terkirim ke
                WhatsApp saya.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-slate-700">
                  <div className="bg-utama/10 p-3 rounded-full text-utama">
                    <Smartphone size={20} />
                  </div>
                  <span>+62 000 0000 0000</span>
                </div>
                <div className="flex items-center gap-4 text-slate-700">
                  <div className="bg-utama/10 p-3 rounded-full text-utama">
                    <MessageSquare size={20} />
                  </div>
                  <span>Respon cepat via WhatsApp</span>
                </div>
              </div>
            </motion.div>

            {/* Form Section */}
            <form
              className="flex flex-col justify-center gap-4 w-full"
              onSubmit={submit}>
              <div className="gap-4 grid grid-cols-2 max-sm:grid-cols-1">
                <motion.div className="relative" variants={itemVariants}>
                  <User
                    className="top-1/2 left-4 absolute text-slate-400 -translate-y-1/2"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Nama Depan"
                    onChange={(e) => setNDepan(e.target.value)}
                    required
                    className="py-3 pr-4 pl-12 border border-slate-200 focus:border-transparent rounded-xl outline-none focus:ring-2 focus:ring-utama w-full transition-all"
                  />
                </motion.div>

                <motion.div className="relative" variants={itemVariants}>
                  <User
                    className="top-1/2 left-4 absolute text-slate-400 -translate-y-1/2"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Nama Belakang"
                    onChange={(e) => setNBelakang(e.target.value)}
                    required
                    className="py-3 pr-4 pl-12 border border-slate-200 focus:border-transparent rounded-xl outline-none focus:ring-2 focus:ring-utama w-full transition-all"
                  />
                </motion.div>
              </div>

              <motion.div
                className="relative flex-grow"
                variants={itemVariants}>
                <textarea
                  required
                  placeholder="Ceritakan pesan Anda di sini..."
                  onChange={(e) => setMessage(e.target.value)}
                  className="p-5 border border-slate-200 focus:border-transparent rounded-2xl outline-none focus:ring-2 focus:ring-utama w-full h-40 transition-all resize-none"></textarea>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="group flex justify-center items-center gap-2 bg-slate-950 hover:bg-utama shadow-lg py-4 rounded-xl font-bold text-white transition-colors cursor-pointer">
                <span>KIRIM PESAN</span>
                <Send
                  size={18}
                  className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </motion.button>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
