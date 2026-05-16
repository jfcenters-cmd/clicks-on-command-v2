# Builder.io CMS (this project)

This site uses **Builder.io as a visual CMS layer** on top of the existing Next.js app. It is **not** the AI App Builder / new-repo workflow.

## What stays in code

- Design system, animations, Calendly opt-in funnel, `/api/optin`, Close, Beehiiv
- `/thank-you`, `/thankyou`
- **Fallback homepage** if Builder has no published page or no API key

## What Builder controls

- **Page** model entry with URL path **`/`**
- Drag/reorder registered sections: Hero, PreferredVendor, Results, DocuMarketing, FinalCTA
- **Editable copy** on all five sections (headlines, paragraphs, CTAs, client result cards, etc.) — see `src/builder/builder-registry.ts`

## How to edit copy (important)

The preview iframe shows your live site. **You only edit text when you select a Builder block** (not the whole page at once).

1. Open **Insert** → add **Hero**, **Results**, etc. (one block per section).
2. Click the block on the canvas (or in **Layers**).
3. Open the **Options** tab on the right — fields like `subhead`, `headlineAccent`, `paragraph1` appear there.
4. **Publish** when done.

If you only see the normal homepage and clicking does nothing, you have not inserted Builder blocks yet — use **Insert**, not **Generate**.

## Setup

1. Create a [Builder.io](https://builder.io) space.
2. Copy the **Public API Key** (Cmd/Ctrl+K → “API” in Builder).
3. Add to Vercel (and `.env.local` for dev):
   ```
   NEXT_PUBLIC_BUILDER_API_KEY=your_key_here
   ```
4. In Builder → **Models** → **page** → set **Preview URL** to:
   - Dev: `http://localhost:3000`
   - Prod: `https://clicksoncommand.com`
5. **Content** → New **Page** → URL **`/`** → add your custom blocks → **Publish**.

Until you publish a page for `/`, the site shows the static homepage (`HomePageStatic`).

## Local dev

```bash
npm run dev
```

Open Builder’s visual editor; it loads your site in an iframe with preview query params.

## Deploy

Unchanged: push to `main` → Vercel. Only **component/code** changes need git; **content/order** changes are published in Builder (revalidate every 60s on homepage).
