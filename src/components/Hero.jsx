import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { PROFILE, ROLES } from "../data";
import { FINE, REDUCED, clamp, lerp, onFrame, scrollToId } from "../lib/motion";
import { useScene } from "../lib/hooks";

const Chars = ({ text, start = 0 }) =>
  text.split("").map((c, i) => (
    <span key={i} className="ch" style={{ "--i": start + i }} aria-hidden="true">
      {c === " " ? " " : c}
    </span>
  ));

function Clock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Jakarta",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const tick = () => setT(f.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="mono">{t} WIB</span>;
}

function Rotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (REDUCED) return;
    const id = setInterval(() => setI((v) => (v + 1) % ROLES.length), 2400);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="rot" aria-label={ROLES.join(", ")}>
      {ROLES.map((r, j) => (
        <span
          key={r}
          aria-hidden="true"
          className={j === i ? "on" : j === (i - 1 + ROLES.length) % ROLES.length ? "off" : ""}>
          {r}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const root = useRef(null);
  const inner = useRef(null);
  const cv = useRef(null);
  const title = useRef(null);

  // parallax keluar saat scroll
  useScene(root, (p, r) => {
    const o = clamp(-r.top / r.height, 0, 1);
    if (inner.current) {
      inner.current.style.transform = `translate3d(0,${o * 90}px,0)`;
      inner.current.style.opacity = 1 - o * 1.15;
    }
  });

  // canvas titik interaktif
  useEffect(() => {
    const c = cv.current;
    const ctx = c.getContext("2d");
    const GAP = 36;
    let w = 0, h = 0, dpr = 1, cols = 0, rows = 0, visible = true;
    const m = { x: -999, y: -999, tx: -999, ty: -999 };
    let col = { fg: "243,238,229", acc: "255,91,46" };
    const readColors = () => {
      const s = getComputedStyle(document.documentElement);
      col = { fg: s.getPropertyValue("--fg-rgb").trim(), acc: s.getPropertyValue("--acc-rgb").trim() };
    };
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = c.getBoundingClientRect();
      w = r.width;
      h = r.height;
      c.width = w * dpr;
      c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / GAP) + 1;
      rows = Math.ceil(h / GAP) + 1;
    };
    const move = (e) => {
      const r = c.getBoundingClientRect();
      m.tx = e.clientX - r.left;
      m.ty = e.clientY - r.top;
    };
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(c);
    readColors();
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("themechange", readColors);
    window.addEventListener("pointermove", move, { passive: true });
    const off = onFrame((t) => {
      if (!visible) return;
      m.x = lerp(m.x, m.tx, 0.14);
      m.y = lerp(m.y, m.ty, 0.14);
      ctx.clearRect(0, 0, w, h);
      const R = 190;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          let x = i * GAP + 6;
          let y = j * GAP + 6;
          const dx = x - m.x;
          const dy = y - m.y;
          const d = Math.hypot(dx, dy);
          const f = d < R ? 1 - d / R : 0;
          const wave = REDUCED ? 0 : Math.sin(t / 1400 + i * 0.45 + j * 0.3) * 0.5 + 0.5;
          if (f > 0) {
            const push = f * f * 26;
            x += (dx / (d || 1)) * push;
            y += (dy / (d || 1)) * push;
          }
          const a = 0.1 + wave * 0.1 + f * 0.7;
          const rad = 1 + wave * 0.5 + f * 2.6;
          ctx.fillStyle = f > 0.35 ? `rgba(${col.acc},${a})` : `rgba(${col.fg},${a})`;
          ctx.beginPath();
          ctx.arc(x, y, rad, 0, 6.2832);
          ctx.fill();
        }
      }
    });
    return () => {
      off();
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("themechange", readColors);
      window.removeEventListener("pointermove", move);
    };
  }, []);

  // efek berat huruf mengikuti kursor (variable font)
  useEffect(() => {
    const chars = [...title.current.querySelectorAll(".ch")];
    const cur = chars.map(() => 560);
    const m = { x: -9999, y: -9999, used: false };
    const move = (e) => {
      m.x = e.clientX;
      m.y = e.clientY;
      m.used = true;
    };
    if (FINE) window.addEventListener("pointermove", move, { passive: true });
    const off = onFrame((t) => {
      const box = title.current.getBoundingClientRect();
      if (box.bottom < 0) return;
      chars.forEach((el, i) => {
        let target;
        if (m.used && FINE) {
          const r = el.getBoundingClientRect();
          const d = Math.hypot(m.x - (r.left + r.width / 2), m.y - (r.top + r.height / 2));
          target = 520 + 280 * clamp(1 - d / 260, 0, 1);
        } else {
          target = 560 + (REDUCED ? 0 : 220 * (Math.sin(t / 650 - i * 0.55) * 0.5 + 0.5));
        }
        cur[i] = lerp(cur[i], target, 0.12);
        el.style.fontVariationSettings = `"wght" ${cur[i].toFixed(0)}`;
      });
    });
    return () => {
      off();
      window.removeEventListener("pointermove", move);
    };
  }, []);

  return (
    <section id="home" className="hero" ref={root}>
      <canvas ref={cv} className="hero-canvas" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />
      <div className="wrap hero-inner" ref={inner}>
        <div className="hero-meta" data-in style={{ "--d": 0 }}>
          <span className="status">
            <i /> Open for freelance &amp; collab
          </span>
          <span className="hero-loc">
            Indonesia · <Clock />
          </span>
        </div>

        <h1 className="hero-title" ref={title} aria-label={PROFILE.name}>
          <span className="line l1">
            <Chars text="FAWWAZ" />
          </span>
          <span className="line l2">
            <Chars text="ROMZI NAGIB" start={6} />
          </span>
        </h1>

        <div className="hero-bottom">
          <div className="hero-role" data-in style={{ "--d": 1 }}>
            <small className="mono">( currently )</small>
            <Rotator />
          </div>
          <div className="hero-copy" data-in style={{ "--d": 2 }}>
            <p>
              Saya membangun website yang cepat, ekspresif, dan terasa hidup — sambil terus merilis
              sesuatu yang baru. Scroll untuk melihat hasilnya.
            </p>
            <div className="cta-row">
              <a href="#work" className="btn btn-solid" data-magnetic onClick={(e) => (e.preventDefault(), scrollToId("work"))}>
                Lihat karya <Icon n="arrow" size={18} />
              </a>
              <a href="#contact" className="btn btn-ghost" data-magnetic onClick={(e) => (e.preventDefault(), scrollToId("contact"))}>
                Say hello
              </a>
            </div>
          </div>
          <button className="badge" data-in style={{ "--d": 3 }} onClick={() => scrollToId("about")} aria-label="Scroll ke bawah" data-magnetic>
            <svg viewBox="0 0 120 120" aria-hidden="true">
              <defs>
                <path id="circ" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
              </defs>
              <text>
                <textPath href="#circ" textLength="284" lengthAdjust="spacing">SCROLL • DOWN • SCROLL • DOWN •</textPath>
              </text>
            </svg>
            <Icon n="down" size={26} stroke={1.6} />
          </button>
        </div>
      </div>
    </section>
  );
}
