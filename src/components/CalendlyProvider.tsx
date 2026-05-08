"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { CalendlyModal } from "./CalendlyModal";

type CalendlyContextValue = {
  open: (prefill?: { name?: string; email?: string }) => void;
  close: () => void;
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
  const [isOpen, setOpen] = useState(false);
  const [prefill, setPrefill] = useState<{ name?: string; email?: string }>({});

  const open = useCallback((p?: { name?: string; email?: string }) => {
    if (p) setPrefill(p);
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);

  const value = useMemo(() => ({ open, close, isOpen }), [open, close, isOpen]);

  return (
    <CalendlyContext.Provider value={value}>
      {children}
      <CalendlyModal isOpen={isOpen} onClose={close} url={url} prefill={prefill} />
    </CalendlyContext.Provider>
  );
}

export function useCalendly() {
  const ctx = useContext(CalendlyContext);
  if (!ctx) throw new Error("useCalendly must be used within CalendlyProvider");
  return ctx;
}
