import { useRef, useState } from "react";
import Counter from "./Counter";
import { SKILLS, TOOLS } from "../data";

function Chip({ label }) {
  const ref = useRef(null);
  const st = useRef({ drag: false, sx: 0, sy: 0 });
  const down = (e) => {
    const el = ref.current;
    el.setPointerCapture(e.pointerId);
    el.style.transition = "none";
    el.classList.add("drag");
    st.current = { drag: true, sx: e.clientX, sy: e.clientY };
  };
  const move = (e) => {
    if (!st.current.drag) return;
    const dx = e.clientX - st.current.sx;
    const dy = e.clientY - st.current.sy;
    ref.current.style.transform = `translate3d(${dx}px,${dy}px,0) rotate(${dx * 0.05}deg)`;
  };
  const up = () => {
    st.current.drag = false;
    const el = ref.current;
    el.classList.remove("drag");
    el.style.transition = "transform .9s cubic-bezier(.34,1.8,.5,1)";
    el.style.transform = "";
  };
  return (
    <span
      ref={ref}
      className="chip"
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
      data-cursor="Drag">
      {label}
    </span>
  );
}

export default function Skills() {
  const [act, setAct] = useState(0);
  return (
    <section id="skills" className="sec skills">
      <div className="wrap">
        <div className="eyebrow" data-reveal>
          <span>02</span> / Skills
        </div>
        <h2 className="h2" data-mask>
          <span className="mask"><span className="m">Apa yang</span></span>
          <span className="mask"><span className="m" style={{ "--d": 90 }}>bisa saya <em>buat.</em></span></span>
        </h2>

        <div className="acc" data-reveal style={{ "--d": 120 }}>
          {SKILLS.map((s, i) => (
            <article
              key={s.name}
              className={"acc-item" + (act === i ? " on" : "")}
              onMouseEnter={() => setAct(i)}
              onFocus={() => setAct(i)}
              onClick={() => setAct(i)}
              tabIndex={0}
              data-spot>
              <span className="acc-no mono">{String(i + 1).padStart(2, "0")}</span>
              <h3>{s.name}</h3>
              <div className="acc-body">
                <p>{s.text}</p>
                <div className="meter" role="progressbar" aria-valuenow={s.level} aria-valuemin={0} aria-valuemax={100} aria-label={s.name}>
                  <i style={{ "--p": s.level / 100 }} />
                </div>
              </div>
              <span className="acc-pct">
                <Counter to={s.level} /><small>%</small>
              </span>
            </article>
          ))}
        </div>

        <div className="toolbox" data-reveal>
          <div className="toolbox-head">
            <span className="mono">Toolbox</span>
            <span className="mono hint">↳ tarik &amp; lepas, mereka memantul</span>
          </div>
          <div className="chips">
            {TOOLS.map((t) => (
              <Chip key={t} label={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
