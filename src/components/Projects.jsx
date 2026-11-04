import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "./Icon";
import Cover from "./Cover";
import { PROJECTS, host, monthYear, year } from "../data";
import { FINE, clamp, lerp, onFrame, pad } from "../lib/motion";
import { useKeys, useLast, useLock, useMountTransition } from "../lib/hooks";

const status = (p) => (p.persent >= 100 ? "Selesai" : `Proses ${p.persent}%`);

function Modal({ list, index, onClose, onNav }) {
  const open = index != null;
  const [mounted, shown] = useMountTransition(open, 600);
  const last = useLast(index);
  useLock(open);
  useKeys(open, { onClose, onPrev: () => onNav(-1), onNext: () => onNav(1) });
  const closeRef = useRef(null);
  useEffect(() => {
    if (open) closeRef.current?.focus({ preventScroll: true });
  }, [open]);
  if (!mounted) return null;
  const p = list[last];
  if (!p) return null;
  const all = PROJECTS.indexOf(p);
  return (
    <div className={"modal" + (shown ? " in" : "")} role="dialog" aria-modal="true" aria-label={p.nama}>
      <div className="modal-bg" onClick={onClose} />
      <div className="modal-panel">
        <div className="modal-top">
          <span className="mono">
            {pad(last + 1)} / {pad(list.length)}
          </span>
          <div className="modal-nav">
            <button className="icon-btn" onClick={() => onNav(-1)} aria-label="Sebelumnya"><Icon n="chevl" size={18} /></button>
            <button className="icon-btn" onClick={() => onNav(1)} aria-label="Berikutnya"><Icon n="chevr" size={18} /></button>
            <button className="icon-btn" ref={closeRef} onClick={onClose} aria-label="Tutup"><Icon n="close" size={18} /></button>
          </div>
        </div>
        <div className="modal-scroll">
          <div className="browser" key={p.nama}>
            <div className="browser-bar">
              <i /><i /><i />
              <span className="mono">{host(p.link)}</span>
            </div>
            <div className="browser-shot"><Cover p={p} i={all} eager /></div>
          </div>
          <div className="modal-info" key={p.nama + "i"}>
            <div>
              <h3>{p.nama}</h3>
              <p>{p.slogan || "Web project"}</p>
            </div>
            <dl>
              <div><dt className="mono">Dirilis</dt><dd>{monthYear(p.tanggal)}</dd></div>
              <div><dt className="mono">Status</dt><dd>{status(p)}</dd></div>
              <div>
                <dt className="mono">Progress</dt>
                <dd><span className="meter sm"><i style={{ "--p": p.persent / 100 }} /></span></dd>
              </div>
            </dl>
            <a className="btn btn-solid" href={p.link} target="_blank" rel="noopener noreferrer">
              Kunjungi website <Icon n="arrow-ur" size={18} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ p, i, onOpen }) {
  return (
    <button className="card" onClick={onOpen} data-cursor="Buka" data-tilt style={{ "--i": i }}>
      <div className="card-shot"><Cover p={p} i={PROJECTS.indexOf(p)} /></div>
      <div className="card-meta">
        <span className="mono">{pad(i + 1)}</span>
        <h3>{p.nama}</h3>
        <span className="mono">{year(p.tanggal)}</span>
      </div>
      <p>{p.slogan || "Web project"}</p>
    </button>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState("list");
  const [hover, setHover] = useState(0);
  const [sel, setSel] = useState(null);
  const [touched, setTouched] = useState(false);
  const pv = useRef(null);
  const listRef = useRef(null);
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0, rot: 0, trot: 0, in: false });

  const list = useMemo(
    () =>
      PROJECTS.filter((p) => (filter === "all" ? true : filter === "done" ? p.persent >= 100 : p.persent < 100)),
    [filter],
  );

  // preview mengikuti kursor
  useEffect(() => {
    if (!FINE) return;
    const s = pos.current;
    let idle;
    const move = (e) => {
      s.tx = e.clientX;
      s.ty = e.clientY;
      s.trot = clamp(e.movementX * 0.5, -14, 14);
      clearTimeout(idle);
      idle = setTimeout(() => (s.trot = 0), 90);
    };
    window.addEventListener("pointermove", move, { passive: true });
    const off = onFrame(() => {
      s.x = lerp(s.x, s.tx, 0.14);
      s.y = lerp(s.y, s.ty, 0.14);
      s.rot = lerp(s.rot, s.trot, 0.12);
      if (pv.current)
        pv.current.style.transform = `translate3d(${s.x}px,${s.y}px,0) translate(-50%,-50%) rotate(${s.rot.toFixed(2)}deg)`;
    });
    return () => {
      off();
      clearTimeout(idle);
      window.removeEventListener("pointermove", move);
    };
  }, []);

  const showPv = (v) => pv.current && pv.current.classList.toggle("show", v && view === "list");
  const nav = (d) => setSel((v) => (v == null ? v : (v + d + list.length) % list.length));
  const pick = (f) => {
    setFilter(f);
    setTouched(true);
    setHover(0);
  };

  const filters = [
    ["all", "Semua", PROJECTS.length],
    ["done", "Selesai", PROJECTS.filter((p) => p.persent >= 100).length],
    ["wip", "Proses", PROJECTS.filter((p) => p.persent < 100).length],
  ];

  return (
    <section id="work" className="sec work">
      <div className="wrap">
        <div className="eyebrow" data-reveal>
          <span>03</span> / Selected work
        </div>
        <div className="work-head">
          <h2 className="h2" data-mask>
            <span className="mask"><span className="m">Karya</span></span>
            <span className="mask"><span className="m" style={{ "--d": 90 }}>terbaru <sup>({pad(PROJECTS.length)})</sup></span></span>
          </h2>
          <div className="work-tools" data-reveal style={{ "--d": 150 }}>
            <div className="seg" role="tablist" aria-label="Filter project">
              {filters.map(([k, l, n]) => (
                <button key={k} role="tab" aria-selected={filter === k} className={filter === k ? "on" : ""} onClick={() => pick(k)}>
                  {l} <sup>{n}</sup>
                </button>
              ))}
            </div>
            <div className="seg" role="tablist" aria-label="Tampilan">
              {[["list", "List"], ["grid", "Grid"]].map(([k, l]) => (
                <button key={k} role="tab" aria-selected={view === k} className={view === k ? "on" : ""} onClick={() => (setView(k), setTouched(true), showPv(false))}>
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>

        {view === "list" ? (
          <ul
            className={"plist" + (touched ? " pop" : "")}
            ref={listRef}
            key={"l" + filter}
            onMouseEnter={() => showPv(true)}
            onMouseLeave={() => showPv(false)}
            data-reveal>
            {list.map((p, i) => (
              <li key={p.nama} style={{ "--i": i }}>
                <div
                  className={"row" + (hover === i ? " on" : "")}
                  role="button"
                  tabIndex={0}
                  onMouseEnter={() => setHover(i)}
                  onClick={() => setSel(i)}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setSel(i))}>
                  <span className="row-no mono">{pad(i + 1)}</span>
                  <span className="row-thumb"><Cover p={p} i={PROJECTS.indexOf(p)} /></span>
                  <span className="row-name">{p.nama}</span>
                  <span className="row-slogan">{p.slogan || "Web project"}</span>
                  <span className={"row-state mono" + (p.persent < 100 ? " wip" : "")}>{status(p)}</span>
                  <span className="row-year mono">{year(p.tanggal)}</span>
                  <span className="row-arrow"><Icon n="arrow-ur" size={22} /></span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className={"pgrid" + (touched ? " pop" : "")} key={"g" + filter}>
            {list.map((p, i) => (
              <Card key={p.nama} p={p} i={i} onOpen={() => setSel(i)} />
            ))}
          </div>
        )}
      </div>

      {FINE && (
        <div className="pv" ref={pv} aria-hidden="true">
          {list.map((p, i) => (
            <div key={p.nama} className={hover === i ? "on" : ""}>
              <Cover p={p} i={PROJECTS.indexOf(p)} />
            </div>
          ))}
        </div>
      )}

      <Modal list={list} index={sel} onClose={() => setSel(null)} onNav={nav} />
    </section>
  );
}
