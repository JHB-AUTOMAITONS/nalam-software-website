"use client";

import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

interface PopupSelectOption {
  value: string;
  label: string;
}

interface PopupSelectProps {
  id: string;
  value: string;
  options: readonly PopupSelectOption[];
  onChange: (value: string) => void;
  hasError?: boolean;
  "aria-invalid"?: boolean;
  labelId?: string;
}

export function PopupSelect({
  id,
  value,
  options,
  onChange,
  hasError = false,
  labelId,
}: PopupSelectProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(
      0,
      options.findIndex((option) => option.value === value)
    )
  );
  const shouldReduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

  const selected = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  useLayoutEffect(() => {
    if (!open) return;
    listRef.current?.focus();
    optionRefs.current[activeIndex]?.scrollIntoView({ block: "nearest" });
    // Only re-run when the list opens — activeIndex changes afterward via keyboard
    // navigation and shouldn't re-trigger the initial focus/scroll.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function openWithCurrentSelection() {
    const currentIndex = Math.max(
      0,
      options.findIndex((option) => option.value === value)
    );
    setActiveIndex(currentIndex);
    setOpen(true);
  }

  function commitSelection(index: number) {
    const option = options[index];
    if (!option) return;
    onChange(option.value);
    setOpen(false);
    triggerRef.current?.focus();
  }

  function handleTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openWithCurrentSelection();
      return;
    }

    // Guards against the brief window where the listbox is open but focus hasn't
    // yet moved onto it — without this, Escape here would bubble to the modal's
    // own Escape handler and close the entire popup instead of just this dropdown.
    if (event.key === "Escape" && open) {
      event.preventDefault();
      event.stopPropagation();
      setOpen(false);
    }
  }

  function handleListKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, options.length - 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(options.length - 1);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        commitSelection(activeIndex);
        break;
      case "Escape":
        event.preventDefault();
        event.stopPropagation();
        setOpen(false);
        triggerRef.current?.focus();
        break;
      case "Tab":
        setOpen(false);
        break;
      default:
        break;
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-listbox`}
        aria-labelledby={labelId}
        aria-invalid={hasError}
        onClick={() => (open ? setOpen(false) : openWithCurrentSelection())}
        onKeyDown={handleTriggerKeyDown}
        className={`flex min-h-[46px] w-full items-center justify-between gap-2 rounded-xl border bg-[rgba(255,255,255,0.55)] px-3.5 py-2.5 text-left text-sm text-navy-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-sm transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-teal-500/[0.14] ${
          hasError
            ? "border-signal-coral/60"
            : open
              ? "border-teal-500/55"
              : "border-ice-500/25"
        }`}
      >
        <span className="truncate">{selected?.label}</span>
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          aria-hidden
          className={`shrink-0 text-slate-500 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        >
          <path d="M1 1.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.ul
            id={`${id}-listbox`}
            role="listbox"
            tabIndex={-1}
            aria-activedescendant={`${id}-option-${activeIndex}`}
            onKeyDown={handleListKeyDown}
            ref={listRef}
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
            transition={{ duration: shouldReduceMotion ? 0.1 : 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-[calc(100%+6px)] z-20 max-h-56 w-full overflow-y-auto rounded-xl border border-ice-500/25 bg-white/95 p-1.5 shadow-[0_16px_40px_rgba(16,35,27,0.18)] backdrop-blur-md focus-visible:outline-none"
          >
            {options.map((option, index) => {
              const isSelected = option.value === value;
              const isActive = index === activeIndex;
              return (
                <li
                  key={option.value}
                  id={`${id}-option-${index}`}
                  ref={(node) => {
                    optionRefs.current[index] = node;
                  }}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => commitSelection(index)}
                  className={`cursor-pointer rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    isSelected
                      ? "bg-teal-500 text-white"
                      : isActive
                        ? "bg-teal-500/[0.08] text-navy-950"
                        : "text-navy-950"
                  }`}
                >
                  {option.label}
                </li>
              );
            })}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
