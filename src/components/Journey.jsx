import { useRef } from "react";
import { JOURNEY } from "../data";
import { useScene } from "../lib/hooks";
import { clamp, map } from "../lib/motion";

export default function Journey() {
  const root = useRef(null);
  const line = useRef(null);
  const dots = useRef([]);
  useScene(root, (p, r, vh) => {
    // garis terisi sesuai posisi titik tengah layar
    const prog = clamp((vh * 0.55 - r.top) / r.height, 0, 1);
    if (line.current) line.current.style.transform = `scaleY(${prog})`;
    dots.current.forEach((d, i) => {
      if (!d) return;
      const t = (i + 0.5) / JOURNEY.length;
      d.classList.toggle("lit", prog >= t - 0.06);
    });
  });
  return (
    <section id="journey" className="sec journey" ref={root}>
      <div className="wrap">
        <div className="eyebrow" data-reveal>
          <span>04</span> / Journey
        </div>
        <h2 className="h2" data-mask>
          <span className="mask"><span className="m">Perjalanan</span></span>
          <span className="mask"><span className="m" style={{ "--d": 90 }}>sejauh <em>ini.</em></span></span>
        </h2>

        <ol className="tl">
          <i className="tl-line" aria-hidden="true"><b ref={line} /></i>
          {JOURNEY.map((j, i) => (
            <li key={j.year} className={i % 2 ? "r" : "l"}>
              <span className="tl-dot" ref={(el) => (dots.current[i] = el)} aria-hidden="true" />
              <div className="tl-card" data-reveal data-spot>
                <span className="tl-year">{j.year}</span>
                <h3>{j.title}</h3>
                <p>{j.text}</p>
                <div className="tags">
                  {j.tags.map((t) => (
                    <span key={t} className="mono">{t}</span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
