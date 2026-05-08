"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type OptInModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: { firstName: string; email: string }) => void;
};

export function OptInModal({ isOpen, onClose, onSuccess }: OptInModalProps) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setFirstName("");
    setEmail("");
    setPhone("");
    setWebsite("");
    setError(null);
    setPending(false);
  }, [isOpen]);

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

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);

    try {
      const res = await fetch("/api/optin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          email,
          phone,
          website,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Try again.");
        setPending(false);
        return;
      }

      setPending(false);
      onSuccess({ firstName: firstName.trim(), email: email.trim() });
    } catch {
      setError("Could not reach the server. Check your connection.");
      setPending(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center px-0 pb-0 pt-[max(0.75rem,env(safe-area-inset-top))] sm:items-center sm:p-4 sm:pb-[max(1rem,env(safe-area-inset-bottom))]"
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
            aria-labelledby="optin-dialog-title"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "relative z-10 flex w-full max-w-md flex-col overflow-hidden",
              "rounded-t-[1.25rem] border border-white/10 border-b-0 bg-surface/95 backdrop-blur-2xl",
              "shadow-[0_50px_120px_-20px_rgba(0,0,0,0.9)]",
              "max-h-[min(92dvh,720px)] sm:rounded-3xl sm:border-b",
            )}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[140%] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
            />

            <div className="relative flex shrink-0 items-start justify-between gap-3 border-b border-white/[0.06] px-4 py-4 sm:gap-4 sm:px-8 sm:py-5">
              <div className="min-w-0 pr-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent/80">
                  Before you pick a time
                </p>
                <h3
                  id="optin-dialog-title"
                  className="mt-1.5 font-display text-xl text-balance sm:text-2xl"
                >
                  Quick details
                </h3>
                <p className="mt-2 text-[12px] leading-snug text-foreground/60 sm:mt-2.5">
                  First name, email, and phone — then you&apos;ll choose a slot
                  on the calendar.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-foreground/70 transition-colors hover:bg-white/[0.08] hover:text-foreground active:scale-95"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <form
              onSubmit={onSubmit}
              className="relative flex flex-col gap-4 overflow-y-auto px-4 py-5 sm:px-8 sm:py-6"
            >
              <input
                type="text"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                className="pointer-events-none absolute left-0 top-0 h-0 w-0 opacity-0"
              />

              <label className="block">
                <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/45">
                  First name
                </span>
                <input
                  required
                  name="firstName"
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-[15px] text-foreground outline-none ring-accent/30 transition-[border-color,box-shadow] placeholder:text-foreground/25 focus:border-accent/40 focus:ring-2"
                  placeholder="Jordan"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/45">
                  Email
                </span>
                <input
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-[15px] text-foreground outline-none ring-accent/30 transition-[border-color,box-shadow] placeholder:text-foreground/25 focus:border-accent/40 focus:ring-2"
                  placeholder="you@clinic.com"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/45">
                  Phone
                </span>
                <input
                  required
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-[15px] text-foreground outline-none ring-accent/30 transition-[border-color,box-shadow] placeholder:text-foreground/25 focus:border-accent/40 focus:ring-2"
                  placeholder="(555) 123-4567"
                />
              </label>

              {error && (
                <p
                  role="alert"
                  className="text-center text-[13px] text-red-300/90"
                >
                  {error}
                </p>
              )}

              <p className="text-center text-[11px] leading-relaxed text-foreground/40">
                By continuing, you agree we may contact you about this request.
                You&apos;ll open our scheduling page next.
              </p>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={pending}
              >
                {pending ? (
                  <>
                    <Loader2
                      className="h-4 w-4 shrink-0 animate-spin"
                      aria-hidden
                    />
                    Saving…
                  </>
                ) : (
                  "Continue to calendar"
                )}
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
