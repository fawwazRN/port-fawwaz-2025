import { useEffect, useRef, useState } from "react";
import { PROFILE } from "../data";
import { easeInOut, pad, tween } from "../lib/motion";

const HELLO = ["Halo", "Hello", "Assalamu'alaikum", "Ahlan", "こんにちは"];

export default function Preloader({ onReveal, onDone }) {
  const [pct, setPct] = useState(0);
  const [out, setOut] = useState(false);
  const [gone, setGone] = useState(false);
  const word = Math.min(HELLO.length - 1, Math.floor((pct / 100) * HELLO.length));
  const cb = useRef({ onReveal, onDone });
  cb.current = { onReveal, onDone };

  useEffect(() => {
    document.documentElement.classList.add("locked");
    let t1, t2;
    const stop = tween({
      duration: 2300,
      ease: easeInOut,
      onUpdate: (v) => setPct(Math.round(v * 100)),
      onDone: () => {
        setOut(true);
        t1 = setTimeout(() => cb.current.onReveal(), 380);
        t2 = setTimeout(() => {
          document.documentElement.classList.remove("locked");
          setGone(true);
          cb.current.onDone();
        }, 1300);
      },
    });
    return () => {
      stop();
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (gone) return null;
  return (
    <div className={"pre" + (out ? " out" : "")} aria-hidden="true">
      <div className="pre-word" key={word}>
        <span className="dot" /> {HELLO[word]}
      </div>
      <div className="pre-foot">
        <span className="mono">{PROFILE.name} — Portfolio {new Date().getFullYear()}</span>
        <span className="pre-count">{pad(pct, 3)}</span>
      </div>
      <i className="pre-bar" style={{ transform: `scaleX(${pct / 100})` }} />
    </div>
  );
}
