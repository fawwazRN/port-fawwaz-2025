import { motion } from "framer-motion";
import { User, MapPin, Briefcase, GraduationCap, Code } from "lucide-react"; // Import ikon Lucide
import fawwaz from "../assets/img/fawwaz.png";

// Variasi animasi untuk container utama (stagger children)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Jeda antar animasi anak
      delayChildren: 0.3, // Jeda sebelum animasi anak dimulai
    },
  },
};

// Variasi animasi untuk elemen anak (fade in & slide up)
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// Variasi animasi untuk gambar (scale & rotate sedikit)
const imageVariants = {
  hidden: { scale: 0.8, opacity: 0, rotate: -5 },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
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
        viewport={{ once: true, amount: 0.3 }} // Animasi jalan sekali saat 30% elemen terlihat
        variants={containerVariants}>
        <div className="space-y-10 bg-white shadow-2xl p-10 max-md:p-6 border border-slate-100 rounded-3xl w-full h-full overflow-y-auto">
          {/* Header Bagian */}
          <motion.div
            className="flex justify-center items-center gap-4 w-full"
            variants={itemVariants}>
            <span className="bg-slate-200 w-full h-px"></span>
            <div className="flex-none min-w-fit text-center">
              <h1 className="font-bold text-utama text-sm uppercase tracking-[5px]">
                Bab 1
              </h1>
              <h2 className="font-bold text-slate-950 max-md:text-3xl text-4xl">
                About Me
              </h2>
            </div>
            <span className="bg-slate-200 w-full h-px"></span>
          </motion.div>

          <div className="gap-10 max-md:gap-8 grid grid-cols-1 md:grid-cols-[300px,1fr] w-full">
            {/* Bagian Gambar */}
            <motion.div
              className="relative flex flex-col items-center gap-4"
              variants={imageVariants}>
              <div className="group relative">
                <img
                  src={fawwaz}
                  alt="Fawwaz Romzi Nagib"
                  className="shadow-lg rounded-3xl w-full h-[350px] max-md:h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-utama/10 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300"></div>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-slate-950 text-2xl">
                  Fawwaz Romzi Nagib
                </h3>
                <p className="flex justify-center items-center gap-1.5 font-medium text-utama">
                  <Code size={16} /> IT Enthusiast | 10th Grade
                </p>
              </div>
            </motion.div>

            {/* Bagian Teks & Detail */}
            <motion.div className="space-y-8" variants={itemVariants}>
              <div className="relative py-2 pl-6 border-utama border-l-4">
                <h1 className="font-light text-slate-600 max-md:text-3xl text-4xl">
                  <span className="font-bold text-slate-950">Hello...</span> My
                  name is
                </h1>
                <h2 className="relative mt-1 font-extrabold text-utama max-md:text-4xl text-5xl italic tracking-tight">
                  Fawwaz Romzi Nagib
                </h2>
              </div>

              {/* Biografi */}
              <div className="bg-slate-50 p-6 border border-slate-100 rounded-2xl">
                <p className="text-slate-700 max-md:text-base text-lg leading-relaxed">
                  A dedicated student at the{" "}
                  <strong className="text-slate-900">
                    Abudzar Tahfizh Plus IT Islamic boarding school
                  </strong>{" "}
                  with a profound passion for Information Technology. He
                  actively builds experiences through diverse projects like{" "}
                  <strong className="text-utama">Indotravel</strong>,{" "}
                  <strong className="text-utama">Webkita</strong>,{" "}
                  <strong className="text-utama">Portfolio</strong>, and{" "}
                  <strong className="text-utama">Eduverse</strong>, thriving in
                  collaborative group environments.
                </p>
              </div>

              {/* Detail Kunci (Pake Ikon Lucide) */}
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
                    className="flex items-start gap-4 bg-white hover:shadow-md p-4 border border-slate-100 hover:border-utama/30 rounded-xl transition-all duration-300"
                    variants={itemVariants}>
                    <div className="bg-utama/10 p-2.5 rounded-lg text-utama">
                      <item.icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-medium text-slate-500 text-sm">
                        {item.label}
                      </p>
                      <p className="font-semibold text-slate-950 text-base">
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
