"use client";

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
  { label: "Clients Served", value: 200, suffix: "+" },
  {
    label: "Revenue Generated",
    value: 42,
    prefix: "$",
    suffix: "M+",
    format: (n) => n.toString(),
  },
  {
    label: "Ad Spend Managed",
    value: 1,
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
      className="scroll-mt-nav relative overflow-hidden border-y border-white/[0.05] py-12 sm:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-1/2 hidden h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.04] blur-3xl sm:block" />
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

        <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] sm:mt-12 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="relative bg-background/40 px-3.5 py-5 transition-colors hover:bg-white/[0.02] sm:px-7 sm:py-9"
            >
              <div className="mt-0.5 flex items-baseline gap-1 font-display text-4xl leading-none tracking-tight sm:mt-1 sm:text-6xl">
                {s.prefix && (
                  <span className="text-accent/90">{s.prefix}</span>
                )}
                <AnimatedNumber value={s.value} format={s.format} />
                {s.suffix && (
                  <span className="text-foreground/60">{s.suffix}</span>
                )}
              </div>
              <p className="mt-2 text-[12px] tracking-tight text-foreground/65 sm:mt-3 sm:text-[13px]">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-14">
          <div className="grid gap-3 md:grid-cols-2 md:gap-4">
            {clientResults.map((r) => {
              const Icon = r.icon;
              return (
                <div key={r.client}>
                  <GlassCard className="relative flex h-full flex-col p-5 sm:p-8">
                    <div className="flex items-start justify-start">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/30 bg-accent/[0.08] text-accent">
                        <Icon className="h-5 w-5" strokeWidth={1.6} />
                      </span>
                    </div>

                    <div className="mt-4 sm:mt-6">
                      <div className="flex items-baseline gap-2 font-display text-[clamp(2.65rem,11vw,5.5rem)] leading-none tracking-tight sm:gap-3 sm:text-[clamp(3.5rem,7vw,5.5rem)]">
                        <span className="text-foreground">{r.metric}</span>
                      </div>
                      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                        {r.metricSub}
                      </p>
                    </div>

                    <p className="mt-3 max-w-md text-pretty text-[14px] leading-relaxed text-foreground/75 sm:mt-5 sm:text-[15px]">
                      {r.context}
                    </p>

                    <div className="mt-auto flex items-center gap-3 border-t border-white/[0.06] pt-4 sm:gap-4 sm:pt-6">
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
                </div>
              );
            })}
          </div>

          <p className="mx-auto mt-6 max-w-xl text-center font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/35 sm:mt-8">
            Individual results vary · Outcomes depend on clinic, market, and execution
          </p>
        </div>
      </Container>
    </section>
  );
}
