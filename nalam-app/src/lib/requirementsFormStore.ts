"use client";

import { requirementsFormSchema, type RequirementsFormValues } from "@/lib/validation";

// Single source of truth shared by the Contact-page form (RequirementsForm)
// and the automatic popup (RequirementsPopup) — both read/write the same
// field values and the same "has this visitor already completed the form"
// flag, so progress made in one is reflected in the other and a successful
// submission from either one permanently stops the popup's timers.

export const POPUP_INITIAL_DELAY_MS = 6_000;
export const POPUP_RECURRING_DELAY_MS = 35_000;

const COMPLETED_KEY = "nalam_form_completed";
const VALUES_KEY = "nalam_requirements_form_values";

export const initialFormValues: RequirementsFormValues = {
  name: "",
  phone: "",
  organizationType: "hospital",
  requirements: "",
  source: "contact_page",
  website: "",
};

function readCompleted(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return window.localStorage.getItem(COMPLETED_KEY) === "1";
  } catch {
    return false;
  }
}

function readValues(): RequirementsFormValues {
  if (typeof window === "undefined") return initialFormValues;
  try {
    const raw = window.sessionStorage.getItem(VALUES_KEY);
    if (!raw) return initialFormValues;
    const parsed = requirementsFormSchema.partial().safeParse(JSON.parse(raw));
    if (!parsed.success) return initialFormValues;
    return { ...initialFormValues, ...parsed.data };
  } catch {
    return initialFormValues;
  }
}

type Listener = () => void;

class RequirementsFormStore {
  private listeners = new Set<Listener>();
  private completed = readCompleted();
  private values = readValues();
  private timerId: number | null = null;
  private popupOpen = false;
  private popupOpenListeners = new Set<(open: boolean) => void>();

  subscribe = (listener: Listener) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  subscribeOpen = (listener: (open: boolean) => void) => {
    this.popupOpenListeners.add(listener);
    return () => {
      this.popupOpenListeners.delete(listener);
    };
  };

  private emit() {
    this.listeners.forEach((listener) => listener());
  }

  private emitOpen() {
    this.popupOpenListeners.forEach((listener) => listener(this.popupOpen));
  }

  getValues = () => this.values;

  getCompleted = () => this.completed;

  isPopupOpen = () => this.popupOpen;

  updateField<K extends keyof RequirementsFormValues>(key: K, value: RequirementsFormValues[K]) {
    this.values = { ...this.values, [key]: value };
    this.emit();
    try {
      window.sessionStorage.setItem(VALUES_KEY, JSON.stringify(this.values));
    } catch {
      // sessionStorage unavailable (private mode) — in-memory sync still works.
    }
  }

  resetValues() {
    this.values = initialFormValues;
    this.emit();
    try {
      window.sessionStorage.removeItem(VALUES_KEY);
    } catch {
      // ignore
    }
  }

  openPopup() {
    if (this.completed) return;
    this.popupOpen = true;
    this.clearTimer();
    this.emitOpen();
  }

  closePopup() {
    this.popupOpen = false;
    this.emitOpen();
    if (!this.completed) {
      this.scheduleNextPopup(POPUP_RECURRING_DELAY_MS);
    }
  }

  scheduleInitialTimer() {
    if (this.completed || this.popupOpen) return;
    this.scheduleNextPopup(POPUP_INITIAL_DELAY_MS);
  }

  private scheduleNextPopup(delayMs: number) {
    this.clearTimer();
    this.timerId = window.setTimeout(() => {
      this.timerId = null;
      this.openPopup();
    }, delayMs);
  }

  clearTimer() {
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  markCompleted() {
    this.completed = true;
    this.popupOpen = false;
    this.clearTimer();
    this.emit();
    this.emitOpen();
    try {
      window.localStorage.setItem(COMPLETED_KEY, "1");
      window.sessionStorage.removeItem(VALUES_KEY);
    } catch {
      // localStorage/sessionStorage unavailable — in-memory completed flag
      // still prevents the popup timer from being (re)scheduled this session.
    }
  }
}

export const requirementsFormStore = new RequirementsFormStore();
