/** Base scheduling URL (matches `layout.tsx` / `CalendlyProvider` default). */
export function getCalendlyBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_CALENDLY_URL?.trim() ??
    "https://calendly.com/clicksoncommand/30min"
  );
}

export type CalendlyInlineEmbedOptions = {
  prefill?: { name?: string; email?: string };
  /**
   * Host only (e.g. `clicksoncommand.com`). Calendly requires this on raw iframe
   * URLs together with `embed_type` so `hide_gdpr_banner` applies on every step
   * inside the embed — same behavior their widget.js injects.
   * @see https://community.calendly.com/developer-faq-62/embed-i-am-not-receiving-parent-window-notifications-i-cannot-hide-the-cookie-banner-629
   */
  embedDomain?: string;
};

/** Calendly inline embed query string (dark theme + optional name/email prefill). */
export function appendCalendlyInlineParams(
  url: string,
  options?: CalendlyInlineEmbedOptions,
): string {
  const params = new URLSearchParams({
    hide_event_type_details: "0",
    /** Hides Calendly’s cookie / data-sharing banner inside the embed (you handle site-level consent). */
    hide_gdpr_banner: "1",
    background_color: "0b0b0d",
    text_color: "f5f5f4",
    primary_color: "c9a66b",
    embed_type: "Inline",
  });

  const host = options?.embedDomain?.trim();
  if (host) params.set("embed_domain", host);

  const prefill = options?.prefill;
  if (prefill?.name) params.set("name", prefill.name);
  if (prefill?.email) params.set("email", prefill.email);
  return `${url}${url.includes("?") ? "&" : "?"}${params.toString()}`;
}
