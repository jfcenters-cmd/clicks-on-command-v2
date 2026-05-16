# Builder.io CMS (this project)

This site uses **Builder.io as a visual CMS layer** on top of the existing Next.js app. It is **not** the AI App Builder / new-repo workflow.

## What stays in code

- Design system, animations, Calendly opt-in funnel, `/api/optin`, Close, Beehiiv
- `/thank-you`, `/thankyou`
- **Fallback homepage** if Builder has no published page or no API key

## What Builder controls

- **Page** model entry with URL path **`/`**
- Drag/reorder registered sections: Hero, PreferredVendor, Results, DocuMarketing, FinalCTA
- Editable fields on Hero and FinalCTA (see `src/builder/builder-registry.ts`)

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
