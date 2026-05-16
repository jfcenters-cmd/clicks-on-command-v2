"use client";

import Image from "next/image";
import { Award } from "lucide-react";
import { Container } from "../ui/Container";
import { GlassCard } from "../ui/GlassCard";

export function PreferredVendor() {
  return (
    <section
      id="partner"
      className="scroll-mt-nav relative overflow-hidden border-y border-white/[0.05] py-12 sm:py-24"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 hidden h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.05] blur-3xl sm:block" />
        <div className="absolute inset-x-0 top-0 mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      </div>

      <Container size="wide">
        <div className="flex flex-col items-center">
          <h2 className="max-w-3xl text-center font-display text-[clamp(1.75rem,5.5vw,3.4rem)] leading-[1.08] text-balance sm:text-5xl md:text-[3.4rem]">
            Preferred marketing vendor for{" "}
            <span className="text-accent italic">Contour Light® Research LLC.</span>
          </h2>

          <div className="mt-8 w-full sm:mt-11">
            <PartnerLockup />
          </div>
        </div>
      </Container>
    </section>
  );
}

function PartnerLockup() {
  return (
    <GlassCard className="relative overflow-hidden px-5 py-7 sm:px-10 sm:py-11">
      <div className="mx-auto flex max-w-lg flex-col items-center text-center">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/35 bg-accent/[0.08] text-accent"
          aria-hidden
        >
          <Award className="h-5 w-5" strokeWidth={1.5} />
        </div>

        <p className="mt-4 font-display text-xl leading-tight tracking-tight text-foreground sm:mt-6 sm:text-2xl md:text-3xl">
          Preferred marketing vendor
        </p>
        <p className="mt-2 max-w-md text-[15px] leading-relaxed text-foreground/65 sm:text-base">
          Named partner for clinics deploying Contour Light® — prepay funnels,
          acquisition, and patient education.
        </p>

        <div className="mt-6 w-full border-t border-white/[0.08] pt-6 sm:mt-8 sm:pt-8">
          <ContourLightLogo />
        </div>
      </div>
    </GlassCard>
  );
}

function ContourLightLogo() {
  return (
    <div className="relative mx-auto flex w-full max-w-[260px] justify-center">
      <Image
        src="/partners/contour-light-logo.png"
        alt="Contour Light® — Red Light Therapy"
        width={200}
        height={103}
        sizes="(max-width: 768px) 200px, 260px"
        className="h-auto w-full max-w-[220px] object-contain object-center"
        quality={82}
      />
    </div>
  );
}
