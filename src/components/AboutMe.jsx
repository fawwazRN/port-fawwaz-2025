import { motion } from "framer-motion";
import { User, MapPin, Briefcase, GraduationCap, Code } from "lucide-react";
import fawwaz from "../assets/img/fawwaz.png";

// ================= ANIMATION VARIANTS =================

// Variasi untuk Container Utama (Orchestration)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.4,
    },
  },
};

// Variasi untuk Elemen Umum (Slide Up dengan Blur)
const itemVariants = {
  hidden: { y: 30, opacity: 0, filter: "blur(8px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
      mass: 1,
    },
  },
};

// Variasi untuk Gambar (Scale & Rotate 3D Effect)
const imageVariants = {
  hidden: { scale: 0.8, opacity: 0, rotateY: -15 },
  visible: {
    scale: 1,
    opacity: 1,
    rotateY: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.8,
    },
  },
};

// Variasi untuk Kartu Info (Hover state terpisah)
const cardHover = {
  rest: { scale: 1, y: 0, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" },
  hover: {
    scale: 1.03,
    y: -5,
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
    transition: { type: "spring", stiffness: 300 },
  },
};

export default function AboutMe() {
  return (
    <section
      className="top-0 max-md:bottom-0 left-0 relative max-md:sticky flex justify-end items-center bg-utama max-md:bg-transparent mt-[100vh] w-full h-screen font-jakarta text-slate-900"
      id="aboutMe">
      <motion.div
        className="top-0 left-0 flex justify-center items-center max-md:p-0 px-12.5 py-6.25 w-4/5 max-md:w-full h-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}>
        {/* Card Utama dengan Texture Overlay */}
        <div className="relative space-y-10 bg-white/95 shadow-2xl backdrop-blur-sm p-10 max-md:p-6 border border-slate-200/50 rounded-3xl w-full h-full overflow-x-hidden overflow-y-auto">
          {/* Decorative Subtle Pattern (Background Texture) */}
          <div className="absolute inset-0 bg-[radial-gradient(var(--color-slate-900)_1px,transparent_1px)] opacity-[0.03] bg-size-[20px_20px] pointer-events-none mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>

          {/* Header Bagian */}
          <motion.div
            className="z-10 relative flex justify-center items-center gap-4 w-full"
            variants={itemVariants}>
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-linear-to-r from-transparent via-slate-300 to-transparent h-px"></motion.span>
            <div className="flex-none px-4 min-w-fit text-center">
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block bg-utama/10 mb-1 px-3 py-1 rounded-full font-bold text-utama text-xs uppercase tracking-[4px]">
                Chapter 1
              </motion.span>
              <h2 className="font-bold text-slate-950 max-md:text-3xl text-4xl tracking-tight">
                About Me
              </h2>
            </div>
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-linear-to-r from-transparent via-slate-300 to-transparent h-px"></motion.span>
          </motion.div>

          <div className="z-10 relative gap-10 max-md:gap-8 grid grid-cols-1 md:grid-cols-[300px,1fr] w-full">
            {/* Bagian Gambar */}
            <motion.div
              className="relative flex flex-col items-center gap-4"
              variants={imageVariants}>
              <motion.div
                className="group relative cursor-pointer"
                whileHover={{ y: -5 }}>
                {/* Foto dengan Border Dekoratif */}
                <div className="absolute inset-0 bg-utama/20 rounded-3xl transition-transform translate-x-3 translate-y-3 group-hover:translate-x-2 group-hover:translate-y-2 duration-300 ease-out"></div>
                <div className="relative shadow-lg border-4 border-white rounded-3xl overflow-hidden">
                  <img
                    src={fawwaz}
                    alt="Fawwaz Romzi Nagib"
                    className="w-full h-[350px] max-md:h-60 object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                  {/* Overlay Gradient saat Hover */}
                  <div className="absolute inset-0 flex justify-center items-end bg-linear-to-t from-utama/80 via-utama/20 to-transparent opacity-0 group-hover:opacity-100 pb-6 transition-opacity duration-500">
                    <span className="opacity-0 group-hover:opacity-100 font-bold text-white text-sm uppercase tracking-wider transition-all translate-y-4 group-hover:translate-y-0 duration-300 delay-100">
                      View Profile
                    </span>
                  </div>
                </div>

                {/* Frame Sudut (Legacy Touch) */}
                <div className="top-0 left-0 absolute border-utama border-t-2 border-l-2 rounded-tl-xl w-6 h-6"></div>
                <div className="right-0 bottom-0 absolute border-utama border-r-2 border-b-2 rounded-br-xl w-6 h-6"></div>
              </motion.div>

              <div className="mt-2 text-center">
                <h3 className="font-bold text-slate-950 text-2xl tracking-tight">
                  Fawwaz Romzi Nagib
                </h3>
                <p className="flex justify-center items-center gap-1.5 mt-1 font-medium text-utama text-sm">
                  <Code size={16} className="animate-pulse" /> IT Enthusiast |
                  10th Grade
                </p>
              </div>
            </motion.div>

            {/* Bagian Teks & Detail */}
            <motion.div className="space-y-8" variants={itemVariants}>
              {/* Heading dengan Efek Reveal */}
              <div className="relative py-2 pl-6 border-utama border-l-4 overflow-hidden">
                <h1 className="font-light text-slate-500 max-md:text-3xl text-4xl leading-tight">
                  <span className="font-bold text-slate-950">Hello...</span> My
                  name is
                </h1>
                {/* Nama dengan Gradient Text */}
                <h2 className="relative bg-clip-text bg-linear-to-r from-utama via-emerald-600 to-utama drop-shadow-sm mt-1 font-extrabold text-transparent max-md:text-4xl text-5xl italic tracking-tight">
                  Fawwaz Romzi Nagib
                </h2>
                {/* Garis Bawah Animasi */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "60%" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="bottom-0 left-6 absolute bg-utama/20 rounded-full h-1"
                />
              </div>

              {/* Biografi dengan Glassmorphism */}
              <motion.div
                className="group relative bg-slate-50/80 shadow-sm backdrop-blur-sm p-6 border border-slate-100 rounded-2xl overflow-hidden"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 200 }}>
                {/* Decorative Quote Icon */}
                <div className="-top-2 -left-2 absolute font-serif text-utama/10 text-8xl select-none">
                  “
                </div>
                <p className="z-10 relative text-slate-700 max-md:text-base text-lg leading-relaxed">
                  A dedicated student at the{" "}
                  <strong className="relative text-slate-900">
                    Abudzar Tahfizh Plus IT Islamic boarding school
                    <motion.span
                      className="bottom-0 left-0 absolute bg-utama/20 w-full h-1"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}></motion.span>
                  </strong>{" "}
                  with a profound passion for Information Technology. He
                  actively builds experiences through diverse projects like{" "}
                  <span className="font-bold text-utama">Indotravel</span>,{" "}
                  <span className="font-bold text-utama">Webkita</span>,{" "}
                  <span className="font-bold text-utama">Portfolio</span>, and{" "}
                  <span className="font-bold text-utama">Eduverse</span>,
                  thriving in collaborative group environments.
                </p>
              </motion.div>

              {/* Detail Kunci (Grid Cards) */}
              <motion.div
                className="gap-5 grid grid-cols-2 max-sm:grid-cols-1 pt-4"
                variants={containerVariants}>
                {[
                  {
                    icon: GraduationCap,
                    label: "Education",
                    value: "10th Grade High School",
                  },
                  {
                    icon: MapPin,
                    label: "Location",
                    value: "Islamic Boarding School, Indonesia",
                  },
                  {
                    icon: Briefcase,
                    label: "Role",
                    value: "Aspiring IT Professional",
                  },
                  {
                    icon: User,
                    label: "Focus",
                    value: "Learning & Collaboration",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                    className="flex items-start gap-4 bg-white p-4 border border-slate-100 rounded-xl transition-colors duration-300"
                    variants={cardHover}>
                    <motion.div
                      className="bg-utama/10 group-hover:bg-utama p-2.5 rounded-lg text-utama group-hover:text-white transition-colors duration-300"
                      whileHover={{
                        rotate: [0, -10, 10, 0],
                        transition: { duration: 0.4 },
                      }}>
                      <item.icon className="w-6 h-6" strokeWidth={1.5} />
                    </motion.div>
                    <div>
                      <p className="font-medium text-slate-400 text-xs uppercase tracking-wider">
                        {item.label}
                      </p>
                      <p className="mt-0.5 font-semibold text-slate-950 text-base">
                        {item.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
