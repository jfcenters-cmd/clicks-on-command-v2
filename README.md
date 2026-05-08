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
    layout.tsx          # Fonts, metadata, viewport — wraps CalendlyProvider
    page.tsx            # Homepage sections
    thank-you/          # Post–opt-in confirmation + calendar CTA
    globals.css         # Tailwind v4 @theme + design tokens
  components/
    Navbar.tsx
    Footer.tsx
    CalendlyProvider.tsx  # Booking context (opt-in + Calendly)
    OptInModal.tsx        # Lead capture → /thank-you
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
    bookingPrefill.ts
    phoneRegions.ts
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

- Primary CTA — **Book A Strategy Call** — opens `OptInModal` (country code + national phone, bundled as **E.164** client-side → **`/api/optin`**). Successful submit stores name/email in `sessionStorage` and routes to **`/thank-you`**. **Pick a time** (thank-you screen or navbar on that route) consumes that payload and opens **Calendly** with prefilled invitee fields.
- `CalendlyProvider` wraps **`src/app/layout.tsx`** so scheduling works across `/` and `/thank-you`.
- Optionally set **`OPTIN_WEBHOOK_URL`** (e.g. Zapier/Make webhook) so each opt-in POSTs JSON including `{ firstName, email, phone, phoneCountry?, source, submittedAt }` (`phone` is E.164).
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
