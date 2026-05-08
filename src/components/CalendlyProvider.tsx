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

type Phase = "idle" | "optin" | "calendly";

type CalendlyContextValue = {
  open: () => void;
  close: () => void;
  /** True when the Calendly scheduler is visible */
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

  const afterOptIn = useCallback(
    (data: { firstName: string; email: string }) => {
      setPrefill({ name: data.firstName, email: data.email });
      setPhase("calendly");
    },
    [],
  );

  const value = useMemo(
    () => ({
      open,
      close,
      isOpen: phase === "calendly",
    }),
    [open, close, phase],
  );

  return (
    <CalendlyContext.Provider value={value}>
      {children}
      <OptInModal
        isOpen={phase === "optin"}
        onClose={close}
        onSuccess={afterOptIn}
      />
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
