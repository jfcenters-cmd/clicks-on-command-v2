"use client";

import { Container } from "./ui/Container";
import { Logo } from "./ui/Logo";

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] py-10 sm:py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-accent/40 to-transparent"
      />
      <Container className="flex flex-col gap-6 sm:gap-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center md:gap-6">
          <Logo />
          <p className="max-w-md text-[13px] leading-relaxed text-foreground/50">
            Preferred marketing vendor for Contour Light® Research LLC. Results
            vary by clinic and market.
          </p>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-white/[0.06] pt-5 text-[12px] text-foreground/40 md:flex-row md:items-center md:gap-4 md:pt-6">
          <span className="font-mono uppercase tracking-[0.18em]">
            © {new Date().getFullYear()} Clicks On Command, LLC
          </span>
          <div className="flex items-center gap-6">
            <a href="#partner" className="transition-colors hover:text-foreground/70">
              Partner
            </a>
            <a href="#documarketing" className="transition-colors hover:text-foreground/70">
              DocuMarketing
            </a>
            <a href="#results" className="transition-colors hover:text-foreground/70">
              Results
            </a>
            <a
              href="mailto:hello@clicksoncommand.com"
              className="transition-colors hover:text-foreground/70"
            >
              hello@clicksoncommand.com
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
