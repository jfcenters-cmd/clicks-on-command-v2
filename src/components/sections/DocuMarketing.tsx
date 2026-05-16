"use client";

import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { GlassCard } from "../ui/GlassCard";

const prose =
  "mx-auto max-w-2xl text-center text-pretty text-[15px] leading-[1.72] text-foreground/75 sm:text-[16px] sm:leading-[1.75]";

export type DocuMarketingProps = {
  eyebrow?: string;
  headlineMain?: string;
  headlineAccent?: string;
  paragraph1?: string;
  paragraph2?: string;
  quoteLead?: string;
  quoteAccent?: string;
  quoteRest?: string;
  paragraph3?: string;
  outcome1Title?: string;
  outcome1Body?: string;
  outcome2Title?: string;
  outcome2Body?: string;
  outcome3Title?: string;
  outcome3Body?: string;
  disclaimer?: string;
};

export function DocuMarketing({
  eyebrow = "DocuMarketing",
  headlineMain = "I spent 7 years figuring out why most marketing sucks",
  headlineAccent = "(so you don't have to).",
  paragraph1 = "After studying every marketing method I could get my hands on for 7 years, I realized something that pissed me off: they were all the same system with different names. Everyone was just repackaging the same stuff and calling it their own. But here's what mattered — the foundation actually worked when you stripped away the BS.",
  paragraph2 = 'The problem? Most people were executing it wrong. Marketing became this aggressive, overly persuasive mess of "BUY MY STUFF NOW" that attracted garbage leads and crap appointments. I saw body contouring clinics burning money on ads that brought in tire-kickers who never showed up or people who wanted discounts instead of results.',
  quoteLead = "So I built DocuMarketing. Simple concept:",
  quoteAccent = "stop trying to sell and start documenting what you actually do.",
  quoteRest = "Show how body contouring works. Explain why someone would want it. Let the machine and the results do the talking. No trying to sound smart. No marketer gimmicks. Just real documentation of a real process that builds trust faster than any sales pitch ever could.",
  paragraph3 = "Before I ever touched a client's business with this, I tested it myself. Built two entirely new businesses on it — including a family member's company that hit a million in revenue the first year. Been running this in body contouring since 2019 because it works and these are clients I actually want to work with.",
  outcome1Title = "Ads that don't read gimmicky",
  outcome1Body = "Creative and positioning match a serious clinical offer — not discount-bin energy.",
  outcome2Title = "Pages that match premium buyers",
  outcome2Body = "Landing experiences line up with who you actually want on the schedule.",
  outcome3Title = "Pre-paid, pre-sold, ready",
  outcome3Body = "When people book, they've already bought in — not tire-kickers hunting a coupon.",
  disclaimer = "Past performance is not a guarantee of your results.",
}: DocuMarketingProps) {
  const outcomes = [
    { title: outcome1Title, body: outcome1Body },
    { title: outcome2Title, body: outcome2Body },
    { title: outcome3Title, body: outcome3Body },
  ];

  return (
    <section
      id="documarketing"
      className="scroll-mt-nav relative overflow-hidden py-12 sm:py-24"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-accent/40 to-transparent"
      />

      <Container size="narrow">
        <div className="mx-auto flex w-full max-w-2xl flex-col items-center text-center">
          <Eyebrow className="justify-center">{eyebrow}</Eyebrow>
          <h2 className="mt-3 w-full max-w-xl font-display text-[clamp(1.6rem,4.2vw,2.85rem)] leading-[1.1] tracking-tight text-balance sm:mt-4 sm:max-w-2xl sm:leading-[1.08]">
            {headlineMain}{" "}
            <span className="text-accent italic">{headlineAccent}</span>
          </h2>
        </div>

        <div className={`mt-6 space-y-4 sm:mt-10 sm:space-y-5 ${prose}`}>
          <p>{paragraph1}</p>
          <p>{paragraph2}</p>
        </div>

        <div className="mx-auto mt-6 max-w-2xl sm:mt-8">
          <GlassCard className="border-accent/25 bg-gradient-to-b from-accent/[0.06] to-transparent p-5 text-center sm:p-8">
            <p className="font-display text-xl leading-snug text-foreground text-balance sm:text-2xl">
              {quoteLead}{" "}
              <span className="text-accent italic">{quoteAccent}</span> {quoteRest}
            </p>
          </GlassCard>
        </div>

        <div className={`mt-5 sm:mt-8 ${prose}`}>
          <p>{paragraph3}</p>
        </div>

        <div className="mx-auto mt-7 grid max-w-4xl gap-2.5 text-center sm:mt-12 sm:gap-3 md:grid-cols-3">
          {outcomes.map((o) => (
            <div
              key={o.title}
              className="flex h-full flex-col items-center rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 sm:p-6"
            >
              <div className="h-px w-10 bg-accent/70" />
              <h3 className="mt-3 font-display text-base leading-snug tracking-tight text-foreground sm:mt-4 sm:text-lg">
                {o.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-foreground/60">
                {o.body}
              </p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/40 sm:mt-8">
          {disclaimer}
        </p>
      </Container>
    </section>
  );
}
