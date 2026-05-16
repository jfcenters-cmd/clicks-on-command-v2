"use client";

import { motion, type Variants } from "framer-motion";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { useCalendly } from "../CalendlyProvider";

const trustItems = [
  { label: "Preferred Vendor", sub: "Contour Light® Research LLC" },
  { label: "Meta", sub: "Paid acquisition" },
  { label: "Revenue", sub: "Prepay focus" },
  { label: "Niche", sub: "Body contouring only" },
];

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.1 + i * 0.08, ease: EASE },
  }),
};

const DEFAULT_SUBHEAD =
  "We get you paying customers that actually want your help — and we do all the heavy lifting.";
const DEFAULT_PRIMARY_CTA = "Book A Strategy Call";
const DEFAULT_SECONDARY_CTA = "How DocuMarketing works →";

export type HeroProps = {
  headlineBefore?: string;
  headlineAccent?: string;
  headlineLine2?: string;
  headlineEmphasis?: string;
  subhead?: string;
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
};

export function Hero({
  headlineBefore = "Predictable",
  headlineAccent = "prepaid sales",
  headlineLine2 = "for body contouring clinics —",
  headlineEmphasis = "on command.",
  subhead = DEFAULT_SUBHEAD,
  primaryCtaLabel = DEFAULT_PRIMARY_CTA,
  secondaryCtaLabel = DEFAULT_SECONDARY_CTA,
}: HeroProps) {
  const { open } = useCalendly();

  return (
    <section
      id="top"
      className="relative isolate flex flex-col overflow-hidden pt-24 pb-12 max-sm:min-h-0 max-sm:justify-start sm:min-h-[100svh] sm:justify-center sm:pt-36 sm:pb-24"
    >
      <HeroBackground />

      <Container size="wide" className="relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="mt-0 max-w-5xl font-display text-[clamp(2rem,6.5vw,5.5rem)] leading-[0.98] tracking-tight text-balance text-shadow-luxe sm:text-[clamp(2.5rem,7vw,5.5rem)]"
          >
            {headlineBefore}{" "}
            <span className="text-accent">{headlineAccent}</span>
            <span className="block text-foreground/95">
              {headlineLine2}{" "}
              <em className="font-display italic text-foreground/70">
                {headlineEmphasis}
              </em>
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:mt-6 sm:text-lg"
          >
            {subhead}
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
          >
            <Button
              variant="primary"
              size="lg"
              withArrow
              onClick={() => open()}
            >
              {primaryCtaLabel}
            </Button>
            <Button variant="ghost" size="lg" href="#documarketing">
              {secondaryCtaLabel}
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-8 grid w-full max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] sm:mt-16 sm:grid-cols-4"
        >
          {trustItems.map((t) => (
            <div
              key={t.label}
              className="group relative bg-background/40 px-3 py-3 transition-colors hover:bg-white/[0.02] sm:px-5 sm:py-5"
            >
              <div className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_rgba(201,166,107,0.6)]" />
                <span className="text-[12px] font-medium tracking-tight text-foreground/90">
                  {t.label}
                </span>
              </div>
              <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/45">
                {t.sub}
              </p>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

function HeroBackground() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute left-1/2 top-[12%] h-[min(90vw,380px)] w-[min(90vw,380px)] -translate-x-1/2 rounded-full bg-accent/12 blur-[56px] sm:h-[480px] sm:w-[480px] sm:blur-[88px] md:h-[640px] md:w-[640px] md:bg-accent/15 md:blur-[120px]"
      />
      <div className="absolute left-1/2 top-[8%] h-[min(70vw,280px)] w-[min(70vw,280px)] -translate-x-1/2 rounded-full bg-accent/10 blur-[48px] sm:h-[360px] sm:w-[360px] sm:blur-[64px] md:blur-[80px]" />

      <div className="absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent md:hidden" />
      <motion.div
        animate={{ opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-x-0 top-1/3 hidden h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent md:block"
      />

      <div className="absolute inset-0 noise opacity-40 mix-blend-overlay" />

      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
