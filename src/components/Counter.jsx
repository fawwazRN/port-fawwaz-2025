import { useEffect, useRef, useState } from "react";
import { easeOut, tween } from "../lib/motion";
import { useInView } from "../lib/hooks";

export default function Counter({ to, duration = 1600, suffix = "" }) {
  const ref = useRef(null);
  const seen = useInView(ref);
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!seen) return;
    return tween({ duration, ease: easeOut, from: 0, to, onUpdate: (x) => setV(Math.round(x)) });
  }, [seen, to, duration]);
  return (
    <span ref={ref}>
      {v}
      {suffix}
    </span>
  );
}
