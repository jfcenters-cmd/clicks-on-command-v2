"use client";

import { motion } from "framer-motion";
import { TrendingUp, Flame } from "lucide-react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { AnimatedNumber } from "../ui/AnimatedNumber";
import { GlassCard } from "../ui/GlassCard";

type Stat = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  format?: (n: number) => string;
};

const stats: Stat[] = [
  { label: "Prepays Generated", value: 11400, suffix: "+" },
  { label: "Clinics Served", value: 87 },
  {
    label: "Revenue Generated",
    value: 42,
    prefix: "$",
    suffix: "M+",
    format: (n) => n.toString(),
  },
  {
    label: "Ad Spend Managed",
    value: 18,
    prefix: "$",
    suffix: "M+",
    format: (n) => n.toString(),
  },
];

type ClientResult = {
  icon: typeof Flame;
  metric: string;
  metricSub: string;
  client: string;
  role: string;
  context: string;
};

const clientResults: ClientResult[] = [
  {
    icon: Flame,
    metric: "$100K",
    metricSub: "first month at six figures",
    client: "Dr. Hartman",
    role: "Body Contouring Clinic Owner",
    context:
      "Hit his first $100K month after installing the Clicks On Command prepay system.",
  },
  {
    icon: TrendingUp,
    metric: "$16K",
    metricSub: "in just a few weeks",
    client: "Haley",
    role: "Body Contouring Clinic Owner",
    context:
      "Generated $16K within weeks of starting with us — after firing her previous agency for not delivering.",
  },
];

export function Results() {
  return (
    <section
      id="results"
      className="scroll-mt-nav relative overflow-hidden border-y border-white/[0.05] py-20 sm:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.04] blur-3xl" />
      </div>

      <Container size="wide">
        <SectionHeading
          title={
            <>
              Built to put real revenue
              <br />
              <span className="text-accent italic">on the books.</span>
            </>
          }
          description="Aggregate figures from our body contouring accounts. Your results will depend on your market and execution."
        />

        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] sm:mt-12 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-background/40 px-5 py-8 transition-colors hover:bg-white/[0.02] sm:px-7 sm:py-9"
            >
              <div className="mt-1 flex items-baseline gap-1 font-display text-5xl leading-none tracking-tight sm:text-6xl">
                {s.prefix && (
                  <span className="text-accent/90">{s.prefix}</span>
                )}
                <AnimatedNumber value={s.value} format={s.format} />
                {s.suffix && (
                  <span className="text-foreground/60">{s.suffix}</span>
                )}
              </div>
              <p className="mt-3 text-[13px] tracking-tight text-foreground/65">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 sm:mt-14">
          <div className="grid gap-4 md:grid-cols-2">
            {clientResults.map((r, i) => {
              const Icon = r.icon;
              return (
                <motion.div
                  key={r.client}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <GlassCard className="relative flex h-full flex-col p-7 sm:p-8">
                    <div className="flex items-start justify-start">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/30 bg-accent/[0.08] text-accent">
                        <Icon className="h-5 w-5" strokeWidth={1.6} />
                      </span>
                    </div>

                    <div className="mt-6">
                      <div className="flex items-baseline gap-3 font-display text-[clamp(3.5rem,7vw,5.5rem)] leading-none tracking-tight">
                        <span className="text-foreground">{r.metric}</span>
                      </div>
                      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                        {r.metricSub}
                      </p>
                    </div>

                    <p className="mt-5 max-w-md text-pretty text-[15px] leading-relaxed text-foreground/75">
                      {r.context}
                    </p>

                    <div className="mt-auto flex items-center gap-4 border-t border-white/[0.06] pt-5 sm:pt-6">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-white/[0.08] to-transparent font-display text-lg text-accent">
                        {r.client
                          .replace(/^Dr\.\s*/i, "")
                          .split(" ")
                          .map((p) => p[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[14px] font-medium tracking-tight text-foreground">
                          {r.client}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/45">
                          {r.role}
                        </span>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>

          <p className="mx-auto mt-8 max-w-xl text-center font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/35">
            Individual results vary · Outcomes depend on clinic, market, and execution
          </p>
        </div>
      </Container>
    </section>
  );
}
