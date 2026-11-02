import { siteConfig } from "@/lib/constants";

const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
  siteConfig.contact.whatsappMessage
)}`;

/**
 * Floating WhatsApp contact button, rendered once from the root layout.
 * Pure server component: CSS-only hover/focus tooltip, no client JS.
 * z-[60] sits above page content and the header (z-50) but below the
 * requirements popup dialog (z-[100]).
 */
export function WhatsAppButton() {
  return (
    <div className="group fixed right-[max(1.25rem,env(safe-area-inset-right))] bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-[60] md:right-8 md:bottom-8">
      <span
        role="presentation"
        className="pointer-events-none absolute top-1/2 right-full mr-4 hidden -translate-y-1/2 translate-x-1 rounded-lg bg-ink px-3 py-2 text-sm font-medium whitespace-nowrap text-white opacity-0 shadow-soft transition-[opacity,transform] duration-200 group-focus-within:translate-x-0 group-focus-within:opacity-100 group-hover:translate-x-0 group-hover:opacity-100 md:block"
      >
        Chat with Nalam on WhatsApp
      </span>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact Nalam on WhatsApp"
        // Inline radius: the global unlayered :focus-visible rule sets a 4px
        // radius that would otherwise square off the focused button.
        style={{ borderRadius: "9999px" }}
        className="flex size-14 cursor-pointer items-center justify-center bg-[#25D366] text-white shadow-[0_0_0_6px_rgba(37,211,102,0.25),0_8px_24px_-4px_rgba(16,35,27,0.35)] transition-[transform,box-shadow] duration-200 ease-out hover:scale-110 hover:shadow-[0_0_0_8px_rgba(37,211,102,0.3),0_12px_28px_-4px_rgba(16,35,27,0.4)] focus-visible:scale-110 focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-ink active:scale-95 md:size-16"
      >
        <svg
          viewBox="0 0 24 24"
          className="size-7 fill-current md:size-8"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}
