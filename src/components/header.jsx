import { useState } from "react";
import { motion } from "framer-motion";
import { Home, User, Code, Briefcase, Mail } from "lucide-react"; // Ikon untuk sidebar

export default function Header() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const menu = [
    { judul: "Home", link: "#", icon: Home },
    { judul: "About Me", link: "#aboutMe", icon: User },
    { judul: "My Skills", link: "#mySkills", icon: Code },
    { judul: "My Project", link: "#myProject", icon: Briefcase },
    { judul: "Contact Me", link: "#contact", icon: Mail },
  ];

  return (
    <header className="max-md:hidden top-0 left-0 z-50 fixed flex flex-col justify-between items-center bg-utama shadow-2xl py-12 border-white/10 border-r w-1/5 h-screen font-jakarta">
      {/* Logo atau Inisial */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-black text-white text-3xl tracking-tighter">
        FR<span className="text-slate-900">.</span>
      </motion.div>

      {/* Navigasi Utama */}
      <nav className="px-6 w-full">
        <ul className="space-y-4">
          {menu.map((item, index) => (
            <li
              key={index}
              className="relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}>
              <a
                href={item.link}
                className={`relative z-10 flex items-center gap-4 px-6 py-4 rounded-2xl transition-colors duration-300 ${
                  hoveredIndex === index ? "text-utama" : "text-white"
                }`}>
                <item.icon
                  size={24}
                  strokeWidth={hoveredIndex === index ? 2.5 : 2}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
                <span className="font-bold text-xl tracking-tight">
                  {item.judul}
                </span>
              </a>

              {/* Background Indicator dengan Framer Motion */}
              {hoveredIndex === index && (
                <motion.div
                  layoutId="sidebar-hover"
                  className="absolute inset-0 bg-white shadow-lg rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30,
                  }}
                />
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer Sidebar / Social Hint */}
      <div className="font-medium text-white/50 text-xs uppercase tracking-[3px]">
        © 2024 Fawwaz
      </div>
    </header>
  );
}
