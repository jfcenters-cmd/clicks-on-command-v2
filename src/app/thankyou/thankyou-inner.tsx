"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";

export function ThankYouBookedInner() {
  return (
    <>
      <Navbar />
      <main className="relative pb-12 pt-20 sm:pb-20 sm:pt-28">
        <Container size="default" className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent/90">
              Clicks On Command
            </p>
            <h1 className="mx-auto mt-4 font-display text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.1] tracking-tight text-balance text-foreground">
              You&apos;re booked.
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-foreground/75">
              Thanks for scheduling your strategy call. You should get a calendar
              invite and confirmation email shortly. If anything looks off,
              reply to that email and we&apos;ll sort it out.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10"
          >
            <GlassCard className="p-6 text-center sm:p-8">
              <p className="text-sm leading-relaxed text-foreground/70">
                Want the homepage again while you wait?
              </p>
              <Button
                variant="primary"
                size="lg"
                className="mt-5 w-full sm:w-auto"
                href="/"
              >
                Back to homepage
              </Button>
            </GlassCard>
          </motion.div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
