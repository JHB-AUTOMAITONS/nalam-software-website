"use client";

import { useEffect, useRef, useState } from "react";

const FORM_URL = "https://connect.automationclub.in/widget/form/ubInACG4r1dH4FnSTh6P";
const FORM_ORIGIN = "https://connect.automationclub.in";

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
 * We listen for a postMessage from the iframe as a best-effort signal (some
 * GHL forms post one on submit); this is not officially documented or
 * guaranteed, so nothing here depends on it firing.
 */
export function ExternalLeadForm({ onSubmitDetected, className = "" }: ExternalLeadFormProps) {
  const [loaded, setLoaded] = useState(false);
  const firedRef = useRef(false);

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
      {!loaded ? (
        <div className="flex h-[900px] items-center justify-center">
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-slate-500">
            Loading form…
          </span>
        </div>
      ) : null}
      <iframe
        src={FORM_URL}
        title="Nalam requirements form"
        scrolling="no"
        onLoad={() => setLoaded(true)}
        className={`w-full border-0 bg-transparent transition-opacity duration-300 ${loaded ? "block opacity-100" : "hidden opacity-0"}`}
        style={{ height: 900 }}
      />
    </div>
  );
}
