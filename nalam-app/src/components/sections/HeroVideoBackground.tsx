export function HeroVideoBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#F5F8F6]">
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

      {/* Localized readability gradient: lighter behind the left-side text, a touch
          more open on the right so the video stays visible behind the connection diagram.
          Tinted very subtly toward cool-grey/ice-blue rather than plain off-white. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(242,246,248,0.92) 0%, rgba(244,248,248,0.85) 38%, rgba(245,250,250,0.72) 70%, rgba(245,250,250,0.68) 100%)",
        }}
      />

      {/* Subtle atmospheric glow — ice-blue over the diagram side, a faint hint of the
          healthcare green behind the text, kept faint so the video retains its natural look. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 70% 35%, rgba(5,213,213,0.08), transparent 42%), radial-gradient(circle at 15% 70%, rgba(25,200,120,0.05), transparent 40%)",
        }}
      />

      {/* Bottom fade into the next section. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#F5F8F6] to-transparent"
      />
    </div>
  );
}
