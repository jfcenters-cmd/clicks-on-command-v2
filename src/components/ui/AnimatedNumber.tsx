"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type AnimatedNumberProps = {
  value: number;
  duration?: number;
  format?: (n: number) => string;
};

export function AnimatedNumber({
  value,
  duration = 1800,
  format = (n) => n.toLocaleString("en-US"),
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {format(n)}
    </span>
  );
}
