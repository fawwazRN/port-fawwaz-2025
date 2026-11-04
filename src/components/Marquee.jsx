import { useEffect, useRef } from "react";
import { REDUCED, onFrame, scrollVel } from "../lib/motion";

const WORDS = ["React", "JavaScript", "Motion", "Tailwind", "Vite", "Design", "HTML", "CSS", "Storytelling"];

export default function Marquee() {
  const track = useRef(null);
  useEffect(() => {
    let x = 0;
    let dir = -1;
    const el = track.current;
    const off = onFrame(() => {
      const half = el.scrollWidth / 2;
      if (!half) return;
      if (Math.abs(scrollVel) > 0.4) dir = scrollVel > 0 ? -1 : 1;
      const speed = REDUCED ? 0 : 0.7 + Math.min(Math.abs(scrollVel) * 0.35, 14);
      x += dir * speed;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      el.style.transform = `translate3d(${x}px,0,0) skewX(${(-scrollVel * 0.12).toFixed(2)}deg)`;
    });
    return off;
  }, []);
  const row = WORDS.map((w, i) => (
    <span key={i} className={i % 2 ? "o" : ""}>
      {w}
      <em>✦</em>
    </span>
  ));
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track" ref={track}>
        <div>{row}</div>
        <div>{row}</div>
      </div>
    </div>
  );
}
