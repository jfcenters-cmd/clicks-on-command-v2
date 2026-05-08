"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "./ui/Logo";
import { Button } from "./ui/Button";
import { cn } from "@/lib/cn";
import { useCalendly } from "./CalendlyProvider";

const links = [
  { href: "#partner", label: "Partner" },
  { href: "#results", label: "Results" },
  { href: "#documarketing", label: "DocuMarketing" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { open: openCalendly } = useCalendly();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex justify-center pt-2.5 sm:pt-4">
      <motion.nav
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "flex w-[min(96%,1100px)] items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500",
          scrolled
            ? "border border-white/10 bg-background/70 backdrop-blur-xl shadow-[0_20px_40px_-25px_rgba(0,0,0,0.8)]"
            : "border border-transparent bg-transparent",
        )}
      >
        <Logo />

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3.5 py-2 text-[13px] text-foreground/70 transition-colors hover:bg-white/[0.04] hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <Button
            size="sm"
            variant="primary"
            withArrow
            onClick={() => openCalendly()}
          >
            Book A Strategy Call
          </Button>
        </div>

        <button
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-foreground/80 transition-colors hover:bg-white/[0.07] md:hidden"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-[64px] z-30 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-8">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                  className="border-b border-white/[0.06] py-4 font-display text-3xl text-foreground/90"
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="pt-6"
              >
                <Button
                  variant="primary"
                  size="lg"
                  withArrow
                  className="w-full"
                  onClick={() => {
                    setOpen(false);
                    openCalendly();
                  }}
                >
                  Book A Strategy Call
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
