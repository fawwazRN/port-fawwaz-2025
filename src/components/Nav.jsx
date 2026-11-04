import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import Icon from "./Icon";
import { NAV, PROFILE } from "../data";
import { REDUCED, scrollToId } from "../lib/motion";

export default function Nav() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(document.documentElement.dataset.theme || "dark");
  const refs = useRef({});
  const [pill, setPill] = useState({ x: 0, w: 0 });
  const [scrolled, setScrolled] = useState(false);

  // section aktif
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach(([id]) => {
      const el = document.getElementById(id);
      el && io.observe(el);
    });
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // posisi indikator pill
  useLayoutEffect(() => {
    const place = () => {
      const el = refs.current[active];
      if (el) setPill({ x: el.offsetLeft, w: el.offsetWidth });
    };
    place();
    window.addEventListener("resize", place);
    document.fonts?.ready.then(place);
    return () => window.removeEventListener("resize", place);
  }, [active]);

  useEffect(() => {
    document.documentElement.classList.toggle("locked", open);
    const k = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);

  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    setTimeout(() => scrollToId(id), open ? 350 : 0);
  };

  const toggleTheme = (e) => {
    const next = theme === "dark" ? "light" : "dark";
    const apply = () => {
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem("frn-theme", next);
      } catch {
        /* abaikan */
      }
      setTheme(next);
      window.dispatchEvent(new Event("themechange"));
    };
    if (!document.startViewTransition || REDUCED) return apply();
    const x = e.clientX || innerWidth - 60;
    const y = e.clientY || 40;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const vt = document.startViewTransition(() => flushSync(apply));
    vt.ready.then(() =>
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 750, easing: "cubic-bezier(.7,0,.2,1)", pseudoElement: "::view-transition-new(root)" },
      ),
    );
  };

  return (
    <>
      <header className={"nav" + (scrolled ? " scrolled" : "")}>
        <a href="#home" className="brand" onClick={go("home")} aria-label="Ke atas">
          <span className="brand-mark">F</span>
          <span className="brand-txt">
            <b>Fawwaz</b>
            <small>Romzi Nagib</small>
          </span>
        </a>

        <nav className="pill" aria-label="Navigasi utama">
          <i className="pill-ind" style={{ transform: `translateX(${pill.x}px)`, width: pill.w }} />
          {NAV.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              ref={(el) => (refs.current[id] = el)}
              className={active === id ? "on" : ""}
              onClick={go(id)}>
              {label}
            </a>
          ))}
        </nav>

        <div className="nav-right">
          <button className="icon-btn" onClick={toggleTheme} aria-label="Ganti tema" data-magnetic>
            <Icon n={theme === "dark" ? "sun" : "moon"} size={18} />
          </button>
          <button className="icon-btn burger" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
            <Icon n={open ? "close" : "menu"} size={20} />
          </button>
        </div>
      </header>

      <div className={"menu" + (open ? " open" : "")} aria-hidden={!open}>
        <ul>
          {NAV.map(([id, label], i) => (
            <li key={id} style={{ "--i": i }}>
              <a href={`#${id}`} onClick={go(id)} tabIndex={open ? 0 : -1} className={active === id ? "on" : ""}>
                <small>{String(i + 1).padStart(2, "0")}</small>
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a className="menu-mail mono" href={`mailto:${PROFILE.email}`} tabIndex={open ? 0 : -1}>
          {PROFILE.email}
        </a>
      </div>
    </>
  );
}
