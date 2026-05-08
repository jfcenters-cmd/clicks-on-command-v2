# Clicks On Command

Premium high-converting marketing site for **Clicks On Command** — a preferred marketing vendor for Contour Light® Research LLC, building predictable prepay systems for body contouring clinics.

Designed and engineered with Apple-level spacing, military-precision energy, and a dark luxury aesthetic. No cliché agency gradients. No vanity metrics.

## Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4** (CSS-first theme tokens)
- **Framer Motion** for cinematic, restrained motion
- **lucide-react** for hairline iconography
- **Inter / Instrument Serif / JetBrains Mono** via `next/font`

## Architecture

```
src/
  app/
    layout.tsx          # Fonts, metadata, viewport
    page.tsx            # Composes the whole site
    globals.css         # Tailwind v4 @theme + design tokens
  components/
    Navbar.tsx
    Footer.tsx
    CalendlyProvider.tsx  # Global modal trigger context
    CalendlyModal.tsx     # Glassmorphism Calendly popup
    sections/
      Hero.tsx
      PreferredVendor.tsx
      Results.tsx          # Stats + client outcomes
      DocuMarketing.tsx    # Narrative + approach
      FinalCTA.tsx
    ui/
      Button.tsx
      Container.tsx
      Eyebrow.tsx
      GlassCard.tsx
      Logo.tsx
      SectionHeading.tsx
      AnimatedNumber.tsx
  lib/
    cn.ts
```

Sections are isolated, composable, and can be reordered or A/B tested without touching shared primitives.

## Getting started

```bash
cp .env.example .env.local
# Edit NEXT_PUBLIC_CALENDLY_URL with your real Calendly link

npm install
npm run dev
```

Then open <http://localhost:3000>.

### Production build

```bash
npm run build && npm start
```

## Conversion mechanics

- Primary CTA — **Book A Strategy Call** — collects **first name, email, phone** in `OptInModal`, posts to **`/api/optin`**, then opens the Calendly modal with name + email prefilled (`CalendlyProvider`).
- Optionally set **`OPTIN_WEBHOOK_URL`** (e.g. Zapier/Make webhook) so each opt-in POSTs JSON `{ firstName, email, phone, source, submittedAt }` to your stack.
- Secondary links scroll to **DocuMarketing** or **Partner** for depth before the ask.
- Stat counters animate on scroll; client outcome cards carry social proof without fake quotes.

## Design tokens

All design tokens live in `src/app/globals.css` under `@theme`:

- `--color-background` `#060607`
- `--color-surface` `#0b0b0d`
- `--color-accent` `#c9a66b` (warm gold — the only signature color)
- `--font-display` Instrument Serif
- `--font-sans` Inter
- `--font-mono` JetBrains Mono

Single accent + editorial serif gives the brand its operator/luxury feel without leaning on gradients.
