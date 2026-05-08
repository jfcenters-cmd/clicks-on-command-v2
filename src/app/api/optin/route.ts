import { NextResponse } from "next/server";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** US-ish phone: digits + optional formatting, at least 10 digits preferred */
function normalizePhone(raw: string): string {
  return raw.trim();
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    const honeypot =
      typeof body.website === "string" ? body.website.trim() : "";
    if (honeypot.length > 0) {
      return NextResponse.json({ ok: true });
    }

    const firstName =
      typeof body.firstName === "string" ? body.firstName.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const phone = normalizePhone(
      typeof body.phone === "string" ? body.phone : "",
    );

    if (
      firstName.length < 1 ||
      firstName.length > 120 ||
      !isValidEmail(email) ||
      email.length > 254 ||
      phone.length < 7 ||
      phone.length > 40
    ) {
      return NextResponse.json(
        { error: "Invalid name, email, or phone." },
        { status: 400 },
      );
    }

    const webhook = process.env.OPTIN_WEBHOOK_URL?.trim();

    const payload = {
      firstName,
      email,
      phone,
      source: "clicks-on-command",
      submittedAt: new Date().toISOString(),
    };

    if (webhook) {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => {
        /* still let them book — capture failure is logged in Vercel if needed */
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }
}
