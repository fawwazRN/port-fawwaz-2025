import { useState } from "react";
import { project as myProject } from "./asset";

export default function MyProject() {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredAndSortedProjects = myProject
    .filter(
      (item) =>
        item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.slogan.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal)); // Menggunakan b - a untuk descending
  return (
    <section
      className="top-0 left-0 relative max-md:sticky flex justify-end items-center bg-utama max-md:bg-transparent w-full h-screen font-jakarta"
      id="myProject">
      <div className="flex justify-center items-center max-md:p-0 px-12.5 py-6.25 w-4/5 max-md:w-full h-full">
        <div className="flex flex-col justify-between items-center gap-10 bg-white px-6.25 py-9 border border-black rounded-3xl w-full h-full">
          <div className="flex max-md:flex-col justify-between items-center max-md:gap-4 w-full">
            <span className="hidden md:block bg-black w-full h-px"></span>
            <div className="flex flex-col items-center gap-4 w-full md:w-1/2 font-bold text-center">
              <h1 className="text-2xl tracking-[10px]">BAB 3</h1>
              <h2 className="text-3xl">My Project</h2>
            </div>
            <span className="hidden md:block bg-black w-full h-px"></span>
          </div>
          {/* Input Pencarian */}
          <input
            type="text"
            placeholder="Cari project..."
            className="px-4 py-2 border border-black rounded-full focus:outline-none focus:ring-2 focus:ring-black w-full font-normal text-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex justify-start items-center gap-10 max-md:gap-3 w-full h-full overflow-x-scroll text-white scrollbar-hide">
            {filteredAndSortedProjects.length > 0 ? (
              filteredAndSortedProjects.map((item) => (
                <a
                  key={item.nama}
                  href={item.link}
                  target="_blank"
                  className="relative border border-black rounded-3xl w-150 max-md:w-91 h-full overflow-hidden shrink-0">
                  <img
                    src={item.img}
                    alt=""
                    className="absolute w-full h-full object-cover"
                  />
                  <div className="absolute flex flex-col justify-center items-start space-y-1 bg-black/80 hover:bg-black/60 px-4 w-full h-full transition-all">
                    <h1 className="font-bold text-5xl uppercase">
                      {item.nama}
                    </h1>
                    <h2 className="text-xl uppercase tracking-widest">
                      {item.slogan}
                    </h2>
                    <div className="flex justify-between items-center gap-10 w-full">
                      <div className="bg-white w-full h-px"></div>
                      <p className="w-1/4">{item.tanggal}</p>
                    </div>
                  </div>
                </a>
              ))
            ) : (
              <div className="w-full text-black text-center">
                Project tidak ditemukan...
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
