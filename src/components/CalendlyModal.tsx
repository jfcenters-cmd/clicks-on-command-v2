"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

type CalendlyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  prefill?: { name?: string; email?: string };
};

export function CalendlyModal({ isOpen, onClose, url, prefill }: CalendlyModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  const params = new URLSearchParams({
    hide_event_type_details: "0",
    hide_gdpr_banner: "0",
    background_color: "0b0b0d",
    text_color: "f5f5f4",
    primary_color: "c9a66b",
    embed_type: "Inline",
  });
  if (prefill?.name) params.set("name", prefill.name);
  if (prefill?.email) params.set("email", prefill.email);

  const calendlyUrl = `${url}${url.includes("?") ? "&" : "?"}${params.toString()}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={cn(
            "fixed inset-0 z-[60] flex min-h-0 flex-col overflow-hidden",
            "max-sm:justify-start",
            "sm:items-center sm:justify-center sm:p-4 sm:pb-[max(1rem,env(safe-area-inset-bottom))]",
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="calendly-dialog-title"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "relative z-10 flex min-h-0 w-full max-w-4xl flex-col overflow-hidden bg-surface/95 backdrop-blur-2xl",
              "border border-white/10 shadow-[0_50px_120px_-20px_rgba(0,0,0,0.9)]",
              /* Mobile: full-screen sheet so Calendly gets height; no empty band above */
              "max-sm:flex-1 max-sm:rounded-none max-sm:border-x-0 max-sm:border-b-0",
              "max-sm:pt-[env(safe-area-inset-top)]",
              "sm:h-[min(90dvh,880px)] sm:max-h-[min(90dvh,880px)] sm:flex-none sm:rounded-3xl",
            )}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-32 left-1/2 hidden h-64 w-[140%] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl sm:block"
            />

            <div className="relative flex shrink-0 items-center justify-between gap-2 border-b border-white/[0.06] px-3 py-2.5 sm:items-start sm:gap-4 sm:px-8 sm:py-5">
              <div className="min-w-0 pr-2">
                <p className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-accent/80 sm:block">
                  30 minutes · Body contouring clinics
                </p>
                <h3
                  id="calendly-dialog-title"
                  className="font-display text-lg leading-tight text-balance sm:mt-1.5 sm:text-3xl"
                >
                  Book a strategy call
                </h3>
                <div className="mt-1 hidden text-[12px] leading-snug text-foreground/60 sm:mt-3 sm:block">
                  Pick a time below. Same prepay funnel conversation we run with
                  Contour Light® partners.
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-foreground/70 transition-colors hover:bg-white/[0.08] hover:text-foreground active:scale-95 sm:h-11 sm:w-11"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <div
              className={cn(
                "relative flex min-h-0 flex-1 flex-col overflow-hidden bg-[#0b0b0d]",
                "pb-[env(safe-area-inset-bottom)]",
              )}
            >
              <iframe
                title="Calendly scheduling"
                src={calendlyUrl}
                className="min-h-0 w-full flex-1 border-0"
                loading="lazy"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
