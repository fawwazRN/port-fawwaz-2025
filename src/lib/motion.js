// Mini animation engine — tanpa dependency. rAF + easing + scroll scenes.
export const REDUCED =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export const FINE =
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const map = (v, a, b, c, d) => c + ((v - a) / (b - a)) * (d - c);
export const easeOut = (t) => 1 - Math.pow(1 - t, 4);
export const easeInOut = (t) =>
  t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

/* ---------- satu loop rAF bersama ---------- */
const subs = new Set();
let running = false;
function loop(t) {
  subs.forEach((fn) => fn(t));
  if (subs.size) requestAnimationFrame(loop);
  else running = false;
}
export function onFrame(fn) {
  subs.add(fn);
  if (!running) {
    running = true;
    requestAnimationFrame(loop);
  }
  return () => subs.delete(fn);
}

/* ---------- tween sederhana ---------- */
export function tween({ duration = 1000, ease = easeOut, from = 0, to = 1, onUpdate, onDone }) {
  const start = performance.now();
  let stop = false;
  const step = (now) => {
    if (stop) return;
    const p = clamp((now - start) / duration, 0, 1);
    onUpdate(lerp(from, to, ease(p)));
    if (p < 1) requestAnimationFrame(step);
    else onDone && onDone();
  };
  requestAnimationFrame(step);
  return () => {
    stop = true;
  };
}

/* ---------- smooth scroll untuk anchor ---------- */
let cancelScroll = null;
export function scrollToY(y) {
  if (cancelScroll) cancelScroll();
  if (REDUCED) return window.scrollTo(0, y);
  const from = window.scrollY;
  const dist = Math.abs(y - from);
  const stopTween = tween({
    from,
    to: y,
    duration: clamp(dist * 0.55, 700, 1700),
    ease: easeInOut,
    onUpdate: (v) => window.scrollTo(0, v),
  });
  const cancel = () => {
    stopTween();
    cleanup();
  };
  const cleanup = () => {
    ["wheel", "touchstart", "keydown"].forEach((e) => window.removeEventListener(e, cancel));
    cancelScroll = null;
  };
  ["wheel", "touchstart", "keydown"].forEach((e) =>
    window.addEventListener(e, cancel, { passive: true }),
  );
  cancelScroll = cancel;
}
export function scrollToId(id) {
  if (id === "home") return scrollToY(0);
  const el = document.getElementById(id);
  if (el) scrollToY(el.getBoundingClientRect().top + window.scrollY - 0);
}

/* ---------- scroll scenes ---------- */
const scenes = new Set();
let lastY = 0;
export let scrollVel = 0;
let sceneStarted = false;
function startScenes() {
  if (sceneStarted) return;
  sceneStarted = true;
  lastY = window.scrollY;
  onFrame(() => {
    const y = window.scrollY;
    scrollVel = lerp(scrollVel, y - lastY, 0.12);
    lastY = y;
    const vh = window.innerHeight;
    scenes.forEach((s) => {
      const r = s.el.getBoundingClientRect();
      const p = clamp((vh - r.top) / (vh + r.height), 0, 1);
      const key = Math.round(p * 2000) + "|" + Math.round(r.top);
      if (key !== s.key) {
        s.key = key;
        s.fn(p, r, vh);
      }
    });
  });
}
export function addScene(el, fn) {
  const s = { el, fn, key: "" };
  scenes.add(s);
  startScenes();
  return () => scenes.delete(s);
}

/* ---------- format ---------- */
export const pad = (n, l = 2) => String(n).padStart(l, "0");
