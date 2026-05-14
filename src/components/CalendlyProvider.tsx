"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { OptInModal } from "./OptInModal";

type CalendlyContextValue = {
  /** Opens the opt-in form (booking funnel start). */
  open: () => void;
  close: () => void;
};

const CalendlyContext = createContext<CalendlyContextValue | null>(null);

export function CalendlyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [optInOpen, setOptInOpen] = useState(false);

  const open = useCallback(() => {
    setOptInOpen(true);
  }, []);

  const close = useCallback(() => {
    setOptInOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      open,
      close,
    }),
    [open, close],
  );

  return (
    <CalendlyContext.Provider value={value}>
      {children}
      <OptInModal isOpen={optInOpen} onClose={close} />
    </CalendlyContext.Provider>
  );
}

export function useCalendly() {
  const ctx = useContext(CalendlyContext);
  if (!ctx) throw new Error("useCalendly must be used within CalendlyProvider");
  return ctx;
}
