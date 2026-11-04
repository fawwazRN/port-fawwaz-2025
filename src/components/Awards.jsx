import { useMemo, useState } from "react";
import Icon from "./Icon";
import { AWARDS } from "../data";
import { pad } from "../lib/motion";
import { useKeys, useLast, useLock, useMountTransition } from "../lib/hooks";

function Lightbox({ list, index, onClose, onNav }) {
  const open = index != null;
  const [mounted, shown] = useMountTransition(open, 500);
  const last = useLast(index);
  useLock(open);
  useKeys(open, { onClose, onPrev: () => onNav(-1), onNext: () => onNav(1) });
  if (!mounted) return null;
  const a = list[last];
  if (!a) return null;
  return (
    <div className={"modal lb" + (shown ? " in" : "")} role="dialog" aria-modal="true" aria-label={a.title}>
      <div className="modal-bg" onClick={onClose} />
      <div className="modal-panel lb-panel">
        <div className="modal-top">
          <span className="mono">{a.cat} · {a.date}</span>
          <div className="modal-nav">
            <button className="icon-btn" onClick={() => onNav(-1)} aria-label="Sebelumnya"><Icon n="chevl" size={18} /></button>
            <button className="icon-btn" onClick={() => onNav(1)} aria-label="Berikutnya"><Icon n="chevr" size={18} /></button>
            <button className="icon-btn" onClick={onClose} aria-label="Tutup"><Icon n="close" size={18} /></button>
          </div>
        </div>
        <div className="lb-body">
          <img key={a.id} src={a.img} alt={a.title} />
          <div className="lb-text">
            <h3>{a.title}</h3>
            <p>{a.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Awards() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [sel, setSel] = useState(null);
  const cats = ["All", "Certification", "Achievement"];
  const list = useMemo(
    () =>
      AWARDS.filter(
        (a) =>
          (cat === "All" || a.cat === cat) &&
          (a.title + a.cat + a.desc).toLowerCase().includes(q.trim().toLowerCase()),
      ),
    [q, cat],
  );
  const nav = (d) => setSel((v) => (v == null ? v : (v + d + list.length) % list.length));

  return (
    <section id="awards" className="sec awards">
      <div className="wrap">
        <div className="eyebrow" data-reveal>
          <span>05</span> / Awards
        </div>
        <div className="work-head">
          <h2 className="h2" data-mask>
            <span className="mask"><span className="m">Sertifikat</span></span>
            <span className="mask"><span className="m" style={{ "--d": 90 }}>&amp; <em>prestasi.</em></span></span>
          </h2>
          <div className="work-tools" data-reveal style={{ "--d": 150 }}>
            <div className="seg" role="tablist" aria-label="Kategori">
              {cats.map((c) => (
                <button key={c} role="tab" aria-selected={cat === c} className={cat === c ? "on" : ""} onClick={() => setCat(c)}>
                  {c}
                </button>
              ))}
            </div>
            <label className="search">
              <Icon n="search" size={16} />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari…" aria-label="Cari sertifikat" />
            </label>
          </div>
        </div>

        {list.length ? (
          <div className="agrid" key={cat + q}>
            {list.map((a, i) => (
              <button
                key={a.id}
                className={"acard" + (a.featured && cat === "All" && !q ? " big" : "")}
                style={{ "--i": i }}
                onClick={() => setSel(i)}
                data-cursor="Lihat"
                data-spot>
                <img src={a.img} alt={a.title} loading="lazy" />
                <span className="acard-shade" />
                <span className="acard-tag mono">{a.cat}</span>
                {a.featured && <span className="acard-star"><Icon n="star" size={14} /> Favorit</span>}
                <span className="acard-info">
                  <small className="mono">{pad(i + 1)} · {a.date}</small>
                  <b>{a.title}</b>
                </span>
              </button>
            ))}
          </div>
        ) : (
          <p className="empty">Tidak ada hasil untuk “{q}”. Coba kata kunci lain.</p>
        )}
      </div>
      <Lightbox list={list} index={sel} onClose={() => setSel(null)} onNav={nav} />
    </section>
  );
}
