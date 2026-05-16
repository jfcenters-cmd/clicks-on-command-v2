"use client";

import { TrendingUp, Flame } from "lucide-react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { AnimatedNumber } from "../ui/AnimatedNumber";
import { GlassCard } from "../ui/GlassCard";

type Stat =
  | {
      kind: "number";
      label: string;
      value: number;
      prefix?: string;
      suffix?: string;
      format?: (n: number) => string;
    }
  | {
      kind: "text";
      label: string;
      headline: string;
    };

const stats: Stat[] = [
  {
    kind: "number",
    label: "Paying customers",
    value: 100_000,
    suffix: "+",
    format: (n) =>
      n >= 1_000_000
        ? `${Math.floor(n / 1_000_000)}M`
        : n >= 1_000
          ? `${Math.floor(n / 1_000)}K`
          : n.toLocaleString("en-US"),
  },
  { kind: "number", label: "Clients served", value: 200, suffix: "+" },
  {
    kind: "text",
    label: "Client revenue (aggregate)",
    headline: "Millions+",
  },
  {
    kind: "number",
    label: "Ad spend managed",
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

export type ResultsProps = {
  sectionTitleLine1?: string;
  sectionTitleAccent?: string;
  sectionDescription?: string;
  client1Metric?: string;
  client1MetricSub?: string;
  client1Context?: string;
  client1Name?: string;
  client1Role?: string;
  client2Metric?: string;
  client2MetricSub?: string;
  client2Context?: string;
  client2Name?: string;
  client2Role?: string;
  disclaimer?: string;
};

export function Results({
  sectionTitleLine1 = "Built to put real revenue",
  sectionTitleAccent = "on the books.",
  sectionDescription = "Aggregate figures from our body contouring accounts. Your results will depend on your market and execution.",
  client1Metric = "$100K",
  client1MetricSub = "first month at six figures",
  client1Context = "Hit his first $100K month after installing the Clicks On Command prepay system.",
  client1Name = "Dr. Hartman",
  client1Role = "Body Contouring Clinic Owner",
  client2Metric = "$16K",
  client2MetricSub = "in just a few weeks",
  client2Context = "Generated $16K within weeks of starting with us — after firing her previous agency for not delivering.",
  client2Name = "Haley",
  client2Role = "Body Contouring Clinic Owner",
  disclaimer = "Individual results vary · Outcomes depend on clinic, market, and execution",
}: ResultsProps) {
  const clientResults: ClientResult[] = [
    {
      icon: Flame,
      metric: client1Metric,
      metricSub: client1MetricSub,
      client: client1Name,
      role: client1Role,
      context: client1Context,
    },
    {
      icon: TrendingUp,
      metric: client2Metric,
      metricSub: client2MetricSub,
      client: client2Name,
      role: client2Role,
      context: client2Context,
    },
  ];
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
              {sectionTitleLine1}
              <br />
              <span className="text-accent italic">{sectionTitleAccent}</span>
            </>
          }
          description={sectionDescription}
        />

        <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] sm:mt-12 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="relative bg-background/40 px-3.5 py-5 transition-colors hover:bg-white/[0.02] sm:px-7 sm:py-9"
            >
              <div className="mt-0.5 flex flex-wrap items-baseline gap-1 font-display text-4xl leading-none tracking-tight sm:mt-1 sm:text-6xl">
                {s.kind === "text" ? (
                  <span className="text-foreground">{s.headline}</span>
                ) : (
                  <>
                    {s.prefix && (
                      <span className="text-accent/90">{s.prefix}</span>
                    )}
                    <AnimatedNumber value={s.value} format={s.format} />
                    {s.suffix && (
                      <span className="text-foreground/60">{s.suffix}</span>
                    )}
                  </>
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
            {disclaimer}
          </p>
        </div>
      </Container>
    </section>
  );
}
