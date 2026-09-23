import Image from "next/image";

/**
 * Static page backdrop for inner pages (solutions, custom, blog, legal).
 *
 * Visually matches GlobalVideoBackground's reduced-motion state — the same
 * poster frame under the same light overlay — so the glass sections on these
 * pages sit on the same soft texture as the homepage, without loading and
 * autoplaying the background video on every inner page.
 */
export function PageBackdrop() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#F5F8F6]" aria-hidden="true">
      <Image
        src="/images/nalam-background-poster.jpg"
        alt=""
        fill
        sizes="100vw"
        quality={60}
        className="object-cover grayscale-[35%]"
      />
      <div className="absolute inset-0 bg-[rgba(245,248,246,0.88)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#F5F8F6]/40 via-transparent to-[#F5F8F6]/50" />
    </div>
  );
}
