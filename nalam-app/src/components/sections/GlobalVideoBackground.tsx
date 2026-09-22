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
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#F5F8F6]" aria-hidden="true">
      {shouldReduceMotion ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/images/nalam-background-poster.jpg"
          alt=""
          className="h-full w-full object-cover grayscale-[35%]"
        />
      ) : (
        <video
          className="h-full w-full object-cover grayscale-[35%]"
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

      {/* Strong light overlay: the video reads as a barely-there, softly moving
          texture behind a warm off-white backdrop, never as visible video playback. */}
      <div className="absolute inset-0 bg-[rgba(245,248,246,0.88)]" />

      {/* Directional gradient: slightly stronger at top/bottom where content is
          densest, a touch lighter toward the middle so the faint motion still reads. */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F5F8F6]/40 via-transparent to-[#F5F8F6]/50" />
    </div>
  );
}
