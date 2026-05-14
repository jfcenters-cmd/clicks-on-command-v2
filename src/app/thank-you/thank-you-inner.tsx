"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  appendCalendlyInlineParams,
  getCalendlyBaseUrl,
} from "@/lib/calendlyEmbed";
import { readBookingPrefill } from "@/lib/bookingPrefill";

const CALENDLY_BASE = getCalendlyBaseUrl();

export function ThankYouInner() {
  const [guestName, setGuestName] = useState<string | null>(null);
  const [embedSrc, setEmbedSrc] = useState<string | null>(null);

  useEffect(() => {
    const prefill = readBookingPrefill();
    setGuestName(prefill?.name ?? null);
    setEmbedSrc(appendCalendlyInlineParams(CALENDLY_BASE, prefill ?? undefined));
  }, []);

  const heading =
    guestName && guestName.length > 0
      ? `Thanks, ${guestName}.`
      : "You're all set.";

  return (
    <>
      <Navbar />
      <main className="relative pb-12 pt-24 sm:pb-20 sm:pt-32">
        <Container size="default" className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent/90">
              Clicks On Command
            </p>
            <h1 className="mx-auto mt-4 max-w-2xl font-display text-[clamp(1.85rem,4.5vw,2.75rem)] leading-[1.08] tracking-tight text-balance text-foreground">
              {heading}{" "}
              <span className="mt-1 block text-foreground/75 sm:mt-1.5">
                Pick a time for your strategy call below.
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-md text-pretty text-[14px] leading-relaxed text-muted sm:mt-5 sm:text-[15px]">
              Your name and email are carried over when you just came from the
              form. Need to start over? You can still edit inside the scheduler.
            </p>
          </motion.div>

          <motion.div
            id="schedule"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 scroll-mt-28 sm:mt-12 sm:scroll-mt-36"
          >
            <GlassCard className="overflow-hidden p-1 sm:p-2">
              <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0b0b0d] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
                <div className="border-b border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-transparent px-4 py-3.5 text-center sm:px-6 sm:py-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent/85">
                    30 minutes · Body contouring clinics
                  </p>
                  <p className="mt-1 font-display text-base text-foreground/95 sm:text-lg">
                    Schedule your call
                  </p>
                </div>
                <div className="relative min-h-[min(72dvh,640px)] w-full sm:min-h-[620px] lg:min-h-[640px]">
                  {embedSrc ? (
                    <iframe
                      title="Schedule a strategy call with Clicks On Command"
                      src={embedSrc}
                      className="absolute inset-0 h-full w-full border-0"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-[min(72dvh,640px)] items-center justify-center text-[14px] text-foreground/45">
                      Loading calendar…
                    </div>
                  )}
                </div>
              </div>
            </GlassCard>
          </motion.div>

          <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:justify-center">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto" href="/">
              Back to homepage
            </Button>
          </div>

          <p className="mx-auto mt-10 max-w-md text-center font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-foreground/35 sm:mt-12">
            Booking details stay in this browser until you complete scheduling
            or clear site data.
          </p>
        </Container>
      </main>
      <Footer />
    </>
  );
}
