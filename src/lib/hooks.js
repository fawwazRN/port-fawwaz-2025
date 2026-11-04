import { useEffect, useRef, useState } from "react";
import { addScene } from "./motion";

/** mount/unmount dengan transisi keluar */
export function useMountTransition(open, ms = 500) {
  const [mounted, setMounted] = useState(open);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (open) {
      setMounted(true);
      const r = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
      return () => cancelAnimationFrame(r);
    }
    setShown(false);
    const t = setTimeout(() => setMounted(false), ms);
    return () => clearTimeout(t);
  }, [open, ms]);
  return [mounted, shown];
}

/** simpan nilai terakhir yang tidak null (untuk animasi keluar modal) */
export function useLast(v) {
  const r = useRef(v);
  if (v != null) r.current = v;
  return v ?? r.current;
}

/** kunci scroll saat overlay terbuka */
export function useLock(locked) {
  useEffect(() => {
    document.documentElement.classList.toggle("locked", !!locked);
    return () => document.documentElement.classList.remove("locked");
  }, [locked]);
}

/** esc + panah */
export function useKeys(active, { onClose, onPrev, onNext }) {
  useEffect(() => {
    if (!active) return;
    const h = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowLeft") onPrev?.();
      if (e.key === "ArrowRight") onNext?.();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [active, onClose, onPrev, onNext]);
}

/** jalankan callback progress scroll untuk sebuah elemen */
export function useScene(ref, fn) {
  const fnRef = useRef(fn);
  fnRef.current = fn;
  useEffect(() => {
    if (!ref.current) return;
    return addScene(ref.current, (p, r, vh) => fnRef.current(p, r, vh));
  }, [ref]);
}

/** true saat elemen pertama kali terlihat */
export function useInView(ref, margin = "0px 0px -10% 0px") {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin]);
  return seen;
}
