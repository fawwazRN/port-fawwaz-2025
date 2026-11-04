import { useRef } from "react";
import Counter from "./Counter";
import { AWARDS, PROFILE, PROJECTS } from "../data";
import { clamp, map } from "../lib/motion";
import { useScene } from "../lib/hooks";

const STATEMENT = [
  "Saya",
  ["Fawwaz,", 1],
  "santri",
  "di",
  "Abudzar",
  "Tahfizh",
  "Plus",
  "IT",
  "yang",
  "mengubah",
  ["ide", 1],
  "menjadi",
  ["pengalaman web", 1],
  "yang",
  "cepat,",
  "ekspresif,",
  "dan",
  "bermakna",
  "—",
  "seimbang",
  "antara",
  "menghafal",
  "Al-Qur'an",
  "dan",
  ["menulis kode.", 1],
];

const words = STATEMENT.flatMap((w) => (Array.isArray(w) ? w[0].split(" ").map((x) => [x, 1]) : [[w, 0]]));

export default function About() {
  const root = useRef(null);
  const wordRefs = useRef([]);
  const photo = useRef(null);
  const years = new Date().getFullYear() - PROFILE.startYear;

  useScene(root, (p) => {
    const wp = clamp(map(p, 0.18, 0.5, 0, 1), 0, 1);
    const N = words.length;
    wordRefs.current.forEach((el, i) => {
      if (!el) return;
      const r = clamp(wp * (N + 4) - i, 0, 1);
      el.style.opacity = (0.16 + 0.84 * r).toFixed(3);
    });
    if (photo.current) photo.current.style.transform = `translate3d(0,${((0.5 - p) * 70).toFixed(1)}px,0) scale(1.12)`;
  });

  const info = [
    ["Pendidikan", "Abudzar Tahfizh Plus IT"],
    ["Lokasi", "Indonesia"],
    ["Fokus", "Front-end & Creative"],
    ["Mulai coding", `${PROFILE.startYear} (${years} tahun)`],
  ];

  return (
    <section id="about" className="sec about" ref={root}>
      <div className="wrap">
        <div className="eyebrow" data-reveal>
          <span>01</span> / About
        </div>

        <div className="about-grid">
          <div className="about-text">
            <p className="statement">
              {words.map(([w, em], i) => (
                <span key={i} ref={(el) => (wordRefs.current[i] = el)} className={"w" + (em ? " em" : "")}>
                  {w}{" "}
                </span>
              ))}
            </p>

            <dl className="info" data-reveal>
              {info.map(([k, v]) => (
                <div key={k} data-spot>
                  <dt className="mono">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>

            <div className="stats" data-reveal style={{ "--d": 120 }}>
              <div>
                <b><Counter to={PROJECTS.length} /></b>
                <span>Project dirilis</span>
              </div>
              <div>
                <b><Counter to={AWARDS.length} /></b>
                <span>Sertifikat &amp; penghargaan</span>
              </div>
              <div>
                <b><Counter to={years} suffix="+" /></b>
                <span>Tahun belajar coding</span>
              </div>
            </div>
          </div>

          <figure className="portrait" data-reveal data-tilt data-cursor="Halo!">
            <div className="portrait-frame">
              <img ref={photo} src={PROFILE.photo} alt="Foto Fawwaz Romzi Nagib" loading="lazy" />
            </div>
            <figcaption className="mono">
              <span>FRN — {new Date().getFullYear()}</span>
              <span>Based in Indonesia</span>
            </figcaption>
            <span className="sticker" aria-hidden="true">
              Tahfizh<br />&amp; Code ✦
            </span>
          </figure>
        </div>
      </div>
    </section>
  );
}
