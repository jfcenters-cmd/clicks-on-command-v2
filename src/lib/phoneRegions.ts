export type PhoneRegion = {
  iso: string;
  dial: string;
  label: string;
};

/** Narrow list — dropdown can be extended later */
export const PHONE_REGIONS: PhoneRegion[] = [
  { iso: "US", dial: "+1", label: "United States (+1)" },
  { iso: "CA", dial: "+1", label: "Canada (+1)" },
  { iso: "GB", dial: "+44", label: "United Kingdom (+44)" },
  { iso: "AU", dial: "+61", label: "Australia (+61)" },
  { iso: "NZ", dial: "+64", label: "New Zealand (+64)" },
  { iso: "IE", dial: "+353", label: "Ireland (+353)" },
];

/** Pick a sensible region from the browser locale (defaults US). */
export function defaultPhoneIso(): string {
  if (typeof window === "undefined") return "US";
  try {
    const tag =
      navigator.languages?.[0] ??
      navigator.language ??
      ("en-US" as string);
    const upper = tag.toUpperCase();

    let region =
      upper.split("-")[1] ||
      upper.split("_")[1] ||
      (upper.includes("_") ? upper.split("_")[1] : undefined);

    if (upper.startsWith("EN-GB")) region = "GB";

    if (region && PHONE_REGIONS.some((r) => r.iso === region)) {
      return region;
    }

    if (upper.startsWith("EN-IE")) return "IE";
  } catch {
    /* ignore */
  }
  return "US";
}

export function digitsOnly(s: string): string {
  return s.replace(/\D/g, "");
}

/** National number only (no country code); US/CA require 10 digits. */
export function isValidNationalNumber(iso: string, digits: string): boolean {
  if (digits.length < 8 || digits.length > 14) return false;
  if (iso === "US" || iso === "CA") return digits.length === 10;
  return true;
}

export function buildE164(dial: string, nationalDigits: string): string {
  const d = dial.startsWith("+") ? dial.slice(1) : dial.replace(/\D/g, "");
  return `+${d}${nationalDigits}`;
}
