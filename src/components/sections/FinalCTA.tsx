"use client";

import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { useCalendly } from "../CalendlyProvider";

const guarantees = ["Body contouring only", "30 minutes"];

export function FinalCTA() {
  const { open } = useCalendly();

  return (
    <section className="relative overflow-hidden py-12 sm:py-28">
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute left-1/2 top-1/2 hidden h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[140px] sm:block" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      </div>

      <Container size="default">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px", amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center"
        >
          <h2 className="max-w-4xl font-display text-[clamp(2rem,6vw,5rem)] leading-[0.98] text-balance sm:text-[clamp(2.5rem,6.5vw,5rem)]">
            Stop chasing leads.
            <br />
            <span className="text-accent italic">
              Start collecting prepays.
            </span>
          </h2>

          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted sm:mt-6 sm:text-lg">
            If you run a body contouring clinic and want a prepay system installed,
            we&apos;ll map what we&apos;d build for you — in 30 minutes on a call.
          </p>

          <div className="mt-6 flex flex-col items-center gap-3 sm:mt-8 sm:flex-row sm:gap-4">
            <Button
              variant="primary"
              size="lg"
              withArrow
              onClick={() => open()}
            >
              Book A Strategy Call
            </Button>
            <Button variant="secondary" size="lg" href="#documarketing">
              Read the approach
            </Button>
          </div>

          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:mt-8 sm:gap-x-5 sm:gap-y-3">
            {guarantees.map((g) => (
              <li
                key={g}
                className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/50"
              >
                <span className="h-1 w-1 rounded-full bg-accent" />
                {g}
              </li>
            ))}
          </ul>
        </motion.div>
      </Container>
    </section>
  );
}
