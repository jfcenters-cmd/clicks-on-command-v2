/**
 * Server-only: push validated opt-ins to Close CRM and/or Beehiiv.
 * Configure with env vars (never commit real keys).
 */

type OptInPayload = {
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  phoneCountry?: string;
};

function closeLeadDisplayName(firstName: string, lastName?: string): string {
  const parts = [firstName.trim(), lastName?.trim()].filter(
    (p): p is string => Boolean(p && p.length > 0),
  );
  return parts.join(" ");
}

function closeOptInDescription(phoneCountry?: string): string {
  return phoneCountry
    ? `Phone country (ISO): ${phoneCountry}\nSource: clicks-on-command opt-in`
    : "Source: clicks-on-command opt-in";
}

function closeAuthHeader(apiKey: string): string {
  return `Basic ${Buffer.from(`${apiKey}:`, "utf8").toString("base64")}`;
}

type CloseContactHit = { id: string; lead_id: string; name?: string };

/** Find an existing lead via contact email (avoids duplicate leads on repeat opt-ins). */
async function findCloseContactByEmail(
  apiKey: string,
  email: string,
): Promise<CloseContactHit | null> {
  const res = await fetch("https://api.close.com/api/v1/data/search/", {
    method: "POST",
    headers: {
      Authorization: closeAuthHeader(apiKey),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: {
        type: "and",
        queries: [
          { type: "object_type", object_type: "contact" },
          {
            type: "has_related",
            this_object_type: "contact",
            related_object_type: "contact_email",
            related_query: {
              type: "field_condition",
              field: {
                type: "regular_field",
                object_type: "contact_email",
                field_name: "email",
              },
              condition: {
                type: "text",
                mode: "phrase",
                value: email,
              },
            },
          },
        ],
      },
      _fields: { contact: ["id", "lead_id", "name"] },
      results_limit: 1,
    }),
  });

  if (!res.ok) return null;

  const json = (await res.json().catch(() => null)) as {
    data?: Array<{ id?: string; lead_id?: string; name?: string }>;
  } | null;

  const row = json?.data?.[0];
  if (!row?.id || !row.lead_id) return null;
  return { id: row.id, lead_id: row.lead_id, name: row.name };
}

/** Close: HTTP Basic — API key as username, empty password. */
export async function syncCloseLead(data: OptInPayload): Promise<void> {
  const apiKey = process.env.CLOSE_API_KEY?.trim();
  if (!apiKey) return;

  const displayName = closeLeadDisplayName(data.firstName, data.lastName);
  const description = closeOptInDescription(data.phoneCountry);
  const headers = {
    Authorization: closeAuthHeader(apiKey),
    "Content-Type": "application/json",
  };

  const existing = await findCloseContactByEmail(apiKey, data.email);

  if (existing) {
    const res = await fetch(
      `https://api.close.com/api/v1/lead/${existing.lead_id}/`,
      {
        method: "PUT",
        headers,
        body: JSON.stringify({
          name: displayName,
          description,
          contacts: [
            {
              id: existing.id,
              name: displayName,
              emails: [{ email: data.email, type: "office" as const }],
              phones: [{ phone: data.phone, type: "mobile" as const }],
            },
          ],
        }),
      },
    );

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error(
        "[optin] Close CRM update error:",
        res.status,
        text.slice(0, 500),
      );
    }
    return;
  }

  const res = await fetch("https://api.close.com/api/v1/lead/", {
    method: "POST",
    headers,
    body: JSON.stringify({
      name: displayName,
      contacts: [
        {
          name: displayName,
          emails: [{ email: data.email, type: "office" as const }],
          phones: [{ phone: data.phone, type: "mobile" as const }],
        },
      ],
      description,
    }),
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
  if (!token || !publicationId) {
    console.warn(
      "[optin] Beehiiv skipped: set BEEHIIV_API_KEY and BEEHIIV_PUBLICATION_ID for production.",
    );
    return;
  }

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
