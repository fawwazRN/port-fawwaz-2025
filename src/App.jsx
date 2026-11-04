import { useEffect, useRef, useState } from "react";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Journey from "./components/Journey";
import Awards from "./components/Awards";
import Contact from "./components/Contact";
import { FINE, REDUCED } from "./lib/motion";

function useSeen() {
  // sekali observer untuk semua [data-reveal] / [data-mask], termasuk yang muncul belakangan
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    const scan = (root) => {
      if (root.nodeType !== 1) return;
      if (root.matches?.("[data-reveal],[data-mask]")) io.observe(root);
      root.querySelectorAll?.("[data-reveal],[data-mask]").forEach((n) => io.observe(n));
    };
    scan(document.body);
    const mo = new MutationObserver((ms) => ms.forEach((m) => m.addedNodes.forEach(scan)));
    mo.observe(document.getElementById("root"), { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}

function usePointerFx() {
  // spotlight, tilt, dan magnetic lewat satu listener
  useEffect(() => {
    if (!FINE) return;
    let tilt = null;
    let mag = null;
    const reset = (el, kind) => {
      if (!el) return;
      if (kind === "tilt") {
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
      } else el.style.transform = "";
    };
    const move = (e) => {
      const t = e.target;
      if (!t.closest) return;
      const spot = t.closest("[data-spot]");
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", e.clientX - r.left + "px");
        spot.style.setProperty("--my", e.clientY - r.top + "px");
      }
      const tl = t.closest("[data-tilt]");
      if (tilt && tilt !== tl) reset(tilt, "tilt");
      tilt = tl;
      if (tl) {
        const r = tl.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        tl.style.setProperty("--ry", (px * 12).toFixed(2) + "deg");
        tl.style.setProperty("--rx", (-py * 12).toFixed(2) + "deg");
        tl.style.setProperty("--gx", (px + 0.5) * 100 + "%");
        tl.style.setProperty("--gy", (py + 0.5) * 100 + "%");
      }
      const mg = t.closest("[data-magnetic]");
      if (mag && mag !== mg) reset(mag, "mag");
      mag = mg;
      if (mg) {
        const r = mg.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        mg.style.transform = `translate3d(${dx * 0.28}px,${dy * 0.35}px,0)`;
      }
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);
}

function ProgressBar() {
  const ref = useRef(null);
  useEffect(() => {
    const f = () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      if (ref.current) ref.current.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
    };
    f();
    window.addEventListener("scroll", f, { passive: true });
    window.addEventListener("resize", f);
    return () => {
      window.removeEventListener("scroll", f);
      window.removeEventListener("resize", f);
    };
  }, []);
  return <i className="progress" ref={ref} aria-hidden="true" />;
}

export default function App() {
  const seen = (() => {
    try {
      return sessionStorage.getItem("frn-seen") === "1";
    } catch {
      return false;
    }
  })();
  const skip = seen || REDUCED;
  const [loading, setLoading] = useState(!skip);
  useSeen();
  usePointerFx();

  useEffect(() => {
    if (skip) document.documentElement.classList.add("ready");
  }, [skip]);

  const reveal = () => document.documentElement.classList.add("ready");
  const done = () => {
    setLoading(false);
    try {
      sessionStorage.setItem("frn-seen", "1");
    } catch {
      /* abaikan */
    }
  };

  return (
    <>
      {loading && <Preloader onReveal={reveal} onDone={done} />}
      <Cursor />
      <ProgressBar />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Awards />
        <Contact />
      </main>
      <div className="grain" aria-hidden="true" />
    </>
  );
}
