import { NextResponse } from "next/server";
import {
  syncBeehiivSubscription,
  syncCloseLead,
} from "@/lib/optinDestinations";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Loose E.164: +country + national digits, 10–17 chars total digits after + typical */
function isPlausibleE164(phone: string): boolean {
  return /^\+[1-9]\d{9,14}$/.test(phone.trim());
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
    const phone =
      typeof body.phone === "string" ? body.phone.trim().replace(/\s/g, "") : "";
    const phoneCountry =
      typeof body.phoneCountry === "string" ? body.phoneCountry.trim() : "";

    if (
      firstName.length < 1 ||
      firstName.length > 120 ||
      !isValidEmail(email) ||
      email.length > 254 ||
      !isPlausibleE164(phone) ||
      phone.length > 20
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
      ...(phoneCountry ? { phoneCountry } : {}),
      source: "clicks-on-command",
      submittedAt: new Date().toISOString(),
    };

    await Promise.allSettled([
      webhook
        ? fetch(webhook, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
        : Promise.resolve(),
      syncCloseLead({
        firstName,
        email,
        phone,
        ...(phoneCountry ? { phoneCountry } : {}),
      }),
      syncBeehiivSubscription({ firstName, email }),
    ]);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }
}
