"use client";

import { useEffect, useState } from "react";

function getPrefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function GlobalVideoBackground() {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(getPrefersReducedMotion);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event: MediaQueryListEvent) => setShouldReduceMotion(event.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-navy-950" aria-hidden="true">
      {shouldReduceMotion ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/images/nalam-background-poster.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
      ) : (
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/nalam-background-poster.jpg"
        >
          <source src="/videos/nalam-background.mp4" type="video/mp4" />
        </video>
      )}

      {/* Dark emerald overlay: keeps the video subtle and premium, never fully hidden. */}
      <div className="absolute inset-0 bg-[rgba(3,15,11,0.52)]" />

      {/* Directional gradient: slightly darker at top/bottom where content is densest,
          lighter toward the middle so the video stays visible. */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/35 via-transparent to-navy-950/45" />
    </div>
  );
}
