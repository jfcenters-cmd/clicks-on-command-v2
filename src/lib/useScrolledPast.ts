"use client";

import { useEffect, useRef, useState } from "react";

/** Scroll flag throttled to one read per frame; skips React updates when value unchanged. */
export function useScrolledPast(thresholdPx = 12) {
  const [scrolled, setScrolled] = useState(false);
  const raf = useRef(0);

  useEffect(() => {
    const tick = () => {
      raf.current = 0;
      const next = window.scrollY > thresholdPx;
      setScrolled((prev) => (prev === next ? prev : next));
    };
    const onScroll = () => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [thresholdPx]);

  return scrolled;
}
