"use client";

import { useEffect, useRef, useState } from "react";

const FORM_URL = "https://connect.automationclub.in/widget/form/ubInACG4r1dH4FnSTh6P";
const FORM_ORIGIN = "https://connect.automationclub.in";
// Fallback in case the iframe's onLoad never fires (cross-origin SPA content
// can be unreliable about firing load events) — hide the loading overlay
// after this even if we never got a definitive "loaded" signal, so visitors
// are never stuck looking at "Loading form..." forever.
const LOADING_FALLBACK_MS = 4000;

interface ExternalLeadFormProps {
  /** Called once, best-effort, if the embedded form posts a submission signal. */
  onSubmitDetected?: () => void;
  className?: string;
}

/**
 * Embeds Nalam's AutomationClub (GoHighLevel) lead-capture form.
 *
 * This form is a GHL-hosted single-page app with no documented public API
 * and no plain HTML form action — the only officially supported integration
 * is the iframe embed GHL itself ships (confirmed by the iframe-resize
 * helper script GHL's own page loads). Submission happens entirely inside
 * the iframe, so we can't reliably read field values or a guaranteed success
 * state from the parent page.
 *
 * IMPORTANT — single scrollbar: the iframe is given a generous fixed height
 * that comfortably exceeds the form's real content, so the GHL page never
 * needs to scroll *inside itself*. The only scrolling container is the
 * popup/page area around this component. Do not add overflow/scrolling to
 * the iframe or this wrapper — that reintroduces a second, nested scrollbar.
 *
 * IMPORTANT — the iframe is always rendered (never `display: none`), because
 * some browsers don't reliably fire `onLoad` for cross-origin SPA content
 * that does its own client-side routing after the initial load. Gating the
 * iframe's visibility on `onLoad` previously left visitors stuck on a
 * permanent "Loading form..." screen if that event never fired. A brief
 * overlay is shown on top instead, cleared by either the load event or a
 * timed fallback, whichever comes first.
 *
 * We listen for a postMessage from the iframe as a best-effort signal (some
 * GHL forms post one on submit); this is not officially documented or
 * guaranteed, so nothing here depends on it firing.
 */
export function ExternalLeadForm({ onSubmitDetected, className = "" }: ExternalLeadFormProps) {
  const [showOverlay, setShowOverlay] = useState(true);
  const firedRef = useRef(false);

  useEffect(() => {
    const fallback = window.setTimeout(() => setShowOverlay(false), LOADING_FALLBACK_MS);
    return () => window.clearTimeout(fallback);
  }, []);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.origin !== FORM_ORIGIN) return;
      if (firedRef.current) return;

      const data = event.data;
      const looksLikeSubmit =
        typeof data === "string"
          ? /submit|success/i.test(data)
          : typeof data === "object" && data !== null
            ? /submit|success/i.test(JSON.stringify(data))
            : false;

      if (looksLikeSubmit) {
        firedRef.current = true;
        onSubmitDetected?.();
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onSubmitDetected]);

  return (
    <div className={`relative w-full ${className}`}>
      {showOverlay ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 flex h-[900px] items-center justify-center bg-[#F5F8F6] transition-opacity duration-300"
        >
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-slate-500">
            Loading form…
          </span>
        </div>
      ) : null}
      <iframe
        src={FORM_URL}
        title="Nalam requirements form"
        scrolling="no"
        onLoad={() => setShowOverlay(false)}
        className="w-full border-0 bg-transparent"
        style={{ height: 900 }}
      />
    </div>
  );
}
