"use client";

import { useLayoutEffect, useState } from "react";
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
  /** Set in useLayoutEffect so `embed_domain` matches `window.location.host` (required for hide_gdpr_banner in iframe). */
  const [embedSrc, setEmbedSrc] = useState<string | null>(null);

  useLayoutEffect(() => {
    const prefill = readBookingPrefill();
    setGuestName(prefill?.name ?? null);
    const next = appendCalendlyInlineParams(CALENDLY_BASE, {
      prefill: prefill ?? undefined,
      embedDomain: window.location.host,
    });
    setEmbedSrc((prev) => (prev === next ? prev : next));
  }, []);

  const heading =
    guestName && guestName.length > 0
      ? `Thanks, ${guestName}.`
      : "You're all set.";

  return (
    <>
      <Navbar />
      <main className="relative pb-12 pt-20 sm:pb-20 sm:pt-28">
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
          </motion.div>

          <motion.div
            id="schedule"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 scroll-mt-24 sm:mt-8 sm:scroll-mt-32"
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
                <div className="relative min-h-[min(72dvh,620px)] w-full sm:min-h-[580px] lg:min-h-[600px]">
                  {embedSrc ? (
                    <iframe
                      title="Schedule a strategy call with Clicks On Command"
                      src={embedSrc}
                      className="absolute inset-0 h-full w-full border-0"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 animate-pulse bg-white/[0.04]"
                      aria-hidden
                    />
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
        </Container>
      </main>
      <Footer />
    </>
  );
}
