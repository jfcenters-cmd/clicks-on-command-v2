"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { CalendlyModal } from "./CalendlyModal";
import { OptInModal } from "./OptInModal";
import { takeBookingPrefill } from "@/lib/bookingPrefill";

type Phase = "idle" | "optin" | "calendly";

type CalendlyContextValue = {
  /** Opens the opt-in form (booking funnel start). */
  open: () => void;
  close: () => void;
  /** After `/thank-you`, opens Calendly using stored name/email when present. Returns true when the calendar opens. */
  tryOpenStoredCalendarBooking: () => boolean;
  /** True when the Calendly iframe is visible */
  isOpen: boolean;
};

const CalendlyContext = createContext<CalendlyContextValue | null>(null);

export function CalendlyProvider({
  children,
  url,
}: {
  children: React.ReactNode;
  url: string;
}) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [prefill, setPrefill] = useState<{ name?: string; email?: string }>(
    {},
  );

  const open = useCallback(() => {
    setPrefill({});
    setPhase("optin");
  }, []);

  const close = useCallback(() => {
    setPhase("idle");
    setPrefill({});
  }, []);

  const tryOpenStoredCalendarBooking = useCallback(() => {
    const data = takeBookingPrefill();
    if (!data || !data.name || !data.email) return false;
    setPrefill({ name: data.name, email: data.email });
    setPhase("calendly");
    return true;
  }, []);

  const value = useMemo(
    () => ({
      open,
      close,
      tryOpenStoredCalendarBooking,
      isOpen: phase === "calendly",
    }),
    [open, close, tryOpenStoredCalendarBooking, phase],
  );

  return (
    <CalendlyContext.Provider value={value}>
      {children}
      <OptInModal isOpen={phase === "optin"} onClose={close} />
      <CalendlyModal
        isOpen={phase === "calendly"}
        onClose={close}
        url={url}
        prefill={prefill}
      />
    </CalendlyContext.Provider>
  );
}

export function useCalendly() {
  const ctx = useContext(CalendlyContext);
  if (!ctx) throw new Error("useCalendly must be used within CalendlyProvider");
  return ctx;
}
