"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { useCalendly } from "@/components/CalendlyProvider";
import { readBookingPrefill } from "@/lib/bookingPrefill";

export function ThankYouInner() {
  const { open, tryOpenStoredCalendarBooking } = useCalendly();
  const [guestName, setGuestName] = useState<string | null>(null);

  useEffect(() => {
    const p = readBookingPrefill();
    setGuestName(p?.name ?? null);
  }, []);

  function pickTime() {
    if (!tryOpenStoredCalendarBooking()) open();
  }

  const heading =
    guestName && guestName.length > 0
      ? `Thanks, ${guestName}.`
      : "You're all set.";

  return (
    <>
      <Navbar />
      <main className="relative pt-28 pb-16 sm:pt-36 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex min-h-[50svh] max-w-lg flex-col items-center px-5 text-center"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent/80">
            Clicks On Command
          </p>
          <h1 className="mt-5 font-display text-[clamp(1.95rem,5vw,2.85rem)] leading-[1.1] tracking-tight text-balance">
            {heading}{" "}
            <span className="block text-foreground/80 sm:mt-1">
              Grab a slot for your strategy call.
            </span>
          </h1>
          <p className="mt-6 text-pretty text-[15px] leading-relaxed text-muted sm:text-[16px]">
            Opening the scheduler uses the name and email you just submitted.
            Prefer to browse first? Head back anytime.
          </p>

          <div className="mt-10 flex w-full flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
            <Button
              variant="primary"
              size="lg"
              withArrow
              className="w-full sm:w-auto"
              type="button"
              onClick={pickTime}
            >
              Pick a time
            </Button>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto" href="/">
              Back to homepage
            </Button>
          </div>

          <p className="mt-12 max-w-sm font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-foreground/35">
            Booking details stay in this browser only until you open the calendar
            or share them with us.
          </p>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
