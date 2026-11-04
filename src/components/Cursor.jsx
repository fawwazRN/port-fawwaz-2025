import { useEffect, useRef } from "react";
import { FINE, lerp, onFrame } from "../lib/motion";

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    if (!FINE) return;
    const html = document.documentElement;
    html.classList.add("has-cursor");
    const m = { x: -100, y: -100, rx: -100, ry: -100, seen: false };
    const move = (e) => {
      m.x = e.clientX;
      m.y = e.clientY;
      if (!m.seen) {
        m.seen = true;
        m.rx = m.x;
        m.ry = m.y;
        ring.current.style.opacity = dot.current.style.opacity = 1;
      }
      const t = e.target;
      const lab = t.closest?.("[data-cursor]");
      const hov = t.closest?.("a,button,[role=button],input,textarea,label,[data-hover]");
      ring.current.classList.toggle("is-label", !!lab);
      ring.current.classList.toggle("is-hover", !!hov && !lab);
      if (lab) label.current.textContent = lab.dataset.cursor;
    };
    const down = () => ring.current.classList.add("is-down");
    const up = () => ring.current.classList.remove("is-down");
    const leave = () => (ring.current.style.opacity = dot.current.style.opacity = 0);
    const enter = () => m.seen && (ring.current.style.opacity = dot.current.style.opacity = 1);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    const off = onFrame(() => {
      m.rx = lerp(m.rx, m.x, 0.18);
      m.ry = lerp(m.ry, m.y, 0.18);
      dot.current.style.transform = `translate3d(${m.x}px,${m.y}px,0)`;
      ring.current.style.transform = `translate3d(${m.rx}px,${m.ry}px,0)`;
    });
    return () => {
      off();
      html.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, []);

  if (!FINE) return null;
  return (
    <>
      <div ref={ring} className="cur-ring" aria-hidden="true">
        <span ref={label} className="cur-label" />
      </div>
      <div ref={dot} className="cur-dot" aria-hidden="true" />
    </>
  );
}
