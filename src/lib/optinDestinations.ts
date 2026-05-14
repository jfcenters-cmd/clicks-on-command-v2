/**
 * Server-only: push validated opt-ins to Close CRM and/or Beehiiv.
 * Configure with env vars (never commit real keys).
 */

type OptInPayload = {
  firstName: string;
  email: string;
  phone: string;
  phoneCountry?: string;
};

/** Close: HTTP Basic — API key as username, empty password. */
export async function syncCloseLead(data: OptInPayload): Promise<void> {
  const apiKey = process.env.CLOSE_API_KEY?.trim();
  if (!apiKey) return;

  const auth = Buffer.from(`${apiKey}:`, "utf8").toString("base64");

  const body = {
    name: `${data.firstName} · Clicks On Command`,
    contacts: [
      {
        name: data.firstName,
        emails: [{ email: data.email, type: "office" as const }],
        phones: [{ phone: data.phone, type: "mobile" as const }],
      },
    ],
    ...(data.phoneCountry
      ? {
          description: `Phone country (ISO): ${data.phoneCountry}\nSource: clicks-on-command opt-in`,
        }
      : {
          description: "Source: clicks-on-command opt-in",
        }),
  };

  const res = await fetch("https://api.close.com/api/v1/lead/", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error(
      "[optin] Close CRM error:",
      res.status,
      text.slice(0, 500),
    );
  }
}

/** Beehiiv v2: Bearer token + publication id in path. */
export async function syncBeehiivSubscription(
  data: Pick<OptInPayload, "firstName" | "email">,
): Promise<void> {
  const token = process.env.BEEHIIV_API_KEY?.trim();
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID?.trim();
  if (!token || !publicationId) return;

  const body: Record<string, unknown> = {
    email: data.email,
    reactivate_existing: true,
    send_welcome_email: false,
    utm_source: "clicks-on-command",
  };

  const fieldName = process.env.BEEHIIV_FIRST_NAME_FIELD_NAME?.trim();
  if (fieldName) {
    body.custom_fields = [{ name: fieldName, value: data.firstName }];
  }

  const res = await fetch(
    `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error(
      "[optin] Beehiiv error:",
      res.status,
      text.slice(0, 500),
    );
  }
}
