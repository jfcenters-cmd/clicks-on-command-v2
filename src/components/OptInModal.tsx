"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { storeBookingPrefill } from "@/lib/bookingPrefill";
import {
  PHONE_REGIONS,
  buildE164,
  defaultPhoneIso,
  digitsOnly,
  isValidNationalNumber,
} from "@/lib/phoneRegions";

type OptInModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function OptInModal({ isOpen, onClose }: OptInModalProps) {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const submittingRef = useRef(false);
  const [nationalPhone, setNationalPhone] = useState("");
  const [phoneIso, setPhoneIso] = useState("US");
  const [website, setWebsite] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setFirstName("");
    setLastName("");
    setEmail("");
    setNationalPhone("");
    setPhoneIso(defaultPhoneIso());
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

  const region = PHONE_REGIONS.find((r) => r.iso === phoneIso) ?? PHONE_REGIONS[0];
  const nationalDigits = digitsOnly(nationalPhone);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submittingRef.current || pending) return;
    setError(null);

    if (!isValidNationalNumber(phoneIso, nationalDigits)) {
      const hint =
        phoneIso === "US" || phoneIso === "CA"
          ? "Enter a valid 10-digit phone number."
          : "Enter a valid phone number (digits only).";
      setError(hint);
      return;
    }

    const phone = buildE164(region.dial, nationalDigits);

    submittingRef.current = true;
    setPending(true);

    try {
      const trimmedFirst = firstName.trim();
      const trimmedLast = lastName.trim();
      const res = await fetch("/api/optin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: trimmedFirst,
          ...(trimmedLast ? { lastName: trimmedLast } : {}),
          email,
          phone,
          website,
          phoneCountry: phoneIso,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Try again.");
        submittingRef.current = false;
        setPending(false);
        return;
      }

      const calendlyName = [trimmedFirst, trimmedLast].filter(Boolean).join(" ");
      storeBookingPrefill({
        name: calendlyName,
        email: email.trim(),
      });
      submittingRef.current = false;
      setPending(false);
      onClose();
      router.push("/thank-you");
    } catch {
      setError("Could not reach the server. Check your connection.");
      submittingRef.current = false;
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
              "rounded-t-[1.25rem] border border-white/10 border-b-0 bg-surface/[0.97] backdrop-blur-xl",
              "shadow-[0_50px_120px_-20px_rgba(0,0,0,0.9)]",
              "max-h-[min(92dvh,720px)] sm:rounded-3xl sm:border-b",
            )}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 h-56 w-[120%] max-md:hidden -translate-x-1/2 rounded-full bg-accent/12 blur-3xl"
            />

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-foreground/80 transition-colors hover:bg-white/[0.12] hover:text-foreground active:scale-95 sm:right-5 sm:top-5"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>

            <div className="relative shrink-0 border-b border-white/[0.08] px-6 pb-5 pl-14 pr-14 pt-7 text-center sm:px-10 sm:pb-6 sm:pt-8">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                Before you pick a time
              </p>
              <h3
                id="optin-dialog-title"
                className="mx-auto mt-3 max-w-sm font-display text-[1.65rem] leading-[1.12] tracking-tight text-balance text-foreground sm:text-[1.85rem]"
              >
                A few{" "}
                <strong className="font-semibold text-accent">quick details</strong>
              </h3>
              <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-foreground/80 sm:mt-4 sm:text-base sm:leading-relaxed">
                We&apos;ll <strong className="font-semibold text-foreground">confirm</strong>{" "}
                your info on the next screen, then open your{" "}
                <strong className="font-semibold text-foreground">calendar</strong>{" "}
                so you can grab a slot.
              </p>
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

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                    Last name
                  </span>
                  <input
                    name="lastName"
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-[15px] text-foreground outline-none ring-accent/30 transition-[border-color,box-shadow] placeholder:text-foreground/25 focus:border-accent/40 focus:ring-2"
                    placeholder="Lee"
                  />
                </label>
              </div>

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

              <div className="block">
                <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/45">
                  Phone
                </span>
                <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                  <select
                    name="phoneCountry"
                    value={phoneIso}
                    aria-label="Country"
                    onChange={(e) => setPhoneIso(e.target.value)}
                    className={cn(
                      "shrink-0 cursor-pointer rounded-xl border border-white/[0.1] bg-white/[0.03]",
                      "px-3 py-3 text-[14px] text-foreground outline-none ring-accent/30 sm:max-w-[min(210px,100%)]",
                      "focus:border-accent/40 focus:ring-2",
                    )}
                  >
                    {PHONE_REGIONS.map((r) => (
                      <option key={r.iso} value={r.iso}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                  <input
                    required
                    type="tel"
                    name="phoneNational"
                    inputMode="tel"
                    autoComplete="tel-national"
                    value={nationalPhone}
                    onChange={(e) => setNationalPhone(e.target.value)}
                    className={cn(
                      "min-h-11 min-w-0 flex-1 rounded-xl border border-white/[0.1]",
                      "bg-white/[0.03] px-4 py-3 text-[15px] text-foreground outline-none ring-accent/30",
                      "placeholder:text-foreground/25 focus:border-accent/40 focus:ring-2",
                    )}
                    placeholder={
                      phoneIso === "US" || phoneIso === "CA"
                        ? "5551234567"
                        : "Mobile number"
                    }
                  />
                </div>
                <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/30">
                  Code defaults to your device region ({region.dial}).
                </p>
              </div>

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
                Next you&apos;ll see a short thank-you screen, then the calendar.
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
                  "Continue"
                )}
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
