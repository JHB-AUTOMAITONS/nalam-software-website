export function HeroVideoBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-navy-950">
      <video
        className="absolute inset-0 h-full w-full object-cover object-[30%_center] sm:object-center"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster="/images/hero-poster.jpg"
        aria-hidden="true"
      >
        <source src="/videos/hero-background.mp4" type="video/mp4" />
      </video>

      {/* Localized readability gradient: darker behind the left-side text, lighter on the
          right so the video stays clearly visible behind the connection diagram. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(3,12,9,0.62) 0%, rgba(3,12,9,0.45) 38%, rgba(3,12,9,0.20) 70%, rgba(3,12,9,0.15) 100%)",
        }}
      />

      {/* Subtle atmospheric emerald glow — kept faint so the video retains its natural look. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 70% 35%, rgba(57,255,136,0.06), transparent 40%)",
        }}
      />

      {/* Bottom fade into the next section. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-950 to-transparent"
      />
    </div>
  );
}
