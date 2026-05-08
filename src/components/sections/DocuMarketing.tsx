"use client";

import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { GlassCard } from "../ui/GlassCard";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const outcomes = [
  {
    title: "Ads that don’t read gimmicky",
    body: "Creative and positioning match a serious clinical offer — not discount-bin energy.",
  },
  {
    title: "Pages that match premium buyers",
    body: "Landing experiences line up with who you actually want on the schedule.",
  },
  {
    title: "Pre-paid, pre-sold, ready",
    body: "When people book, they’ve already bought in — not tire-kickers hunting a coupon.",
  },
];

export function DocuMarketing() {
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
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
          >
            <Eyebrow>DocuMarketing</Eyebrow>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.05, ease }}
            className="mt-3 font-display text-[clamp(1.6rem,4.2vw,2.85rem)] leading-[1.08] tracking-tight text-balance sm:mt-4"
          >
            I spent 7 years figuring out why most marketing sucks{" "}
            <span className="text-accent italic">(so you don&apos;t have to).</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, delay: 0.1, ease }}
          className="mx-auto mt-6 max-w-2xl space-y-4 text-pretty text-[15px] leading-[1.72] text-foreground/75 sm:mt-10 sm:space-y-5 sm:leading-[1.75] sm:text-[16px]"
        >
          <p>
            After studying every marketing method I could get my hands on for 7
            years, I realized something that pissed me off: they were all the same
            system with different names. Everyone was just repackaging the same
            stuff and calling it their own. But here&apos;s what mattered — the
            foundation actually worked when you stripped away the BS.
          </p>
          <p>
            The problem? Most people were executing it wrong. Marketing became
            this aggressive, overly persuasive mess of &ldquo;BUY MY STUFF
            NOW&rdquo; that attracted garbage leads and crap appointments. I saw
            body contouring clinics burning money on ads that brought in
            tire-kickers who never showed up or people who wanted discounts
            instead of results.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, delay: 0.15, ease }}
          className="mx-auto mt-6 max-w-2xl sm:mt-8"
        >
          <GlassCard className="border-accent/25 bg-gradient-to-b from-accent/[0.06] to-transparent p-5 sm:p-8">
            <p className="font-display text-xl leading-snug text-foreground sm:text-2xl">
              So I built DocuMarketing. Simple concept:{" "}
              <span className="text-accent italic">
                stop trying to sell and start documenting what you actually do.
              </span>{" "}
              Show how body contouring works. Explain why someone would want it.
              Let the machine and the results do the talking. No trying to sound
              smart. No marketer gimmicks. Just real documentation of a real
              process that builds trust faster than any sales pitch ever could.
            </p>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, delay: 0.2, ease }}
          className="mx-auto mt-5 max-w-2xl space-y-4 text-pretty text-[15px] leading-[1.72] text-foreground/75 sm:mt-8 sm:space-y-5 sm:text-[16px]"
        >
          <p>
            Before I ever touched a client&apos;s business with this, I tested it
            myself. Built two entirely new businesses on it — including a family
            member&apos;s company that hit a million in revenue the first year.
            Been running this in body contouring since 2019 because it works and
            these are clients I actually want to work with.
          </p>
        </motion.div>

        <div className="mx-auto mt-7 grid max-w-4xl gap-2.5 sm:mt-12 sm:gap-3 md:grid-cols-3">
          {outcomes.map((o, i) => (
            <motion.div
              key={o.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: 0.25 + i * 0.07, ease }}
            >
              <div className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 sm:p-6">
                <div className="h-px w-10 bg-accent/70" />
                <h3 className="mt-3 font-display text-base leading-snug tracking-tight text-foreground sm:mt-4 sm:text-lg">
                  {o.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-foreground/60">
                  {o.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mx-auto mt-6 max-w-2xl text-center font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/40 sm:mt-8"
        >
          Past performance is not a guarantee of your results.
        </motion.p>
      </Container>
    </section>
  );
}
