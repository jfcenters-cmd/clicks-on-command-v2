export const BOOKING_PREFILL_KEY = "coc_booking_prefill_v1";

export type BookingPrefill = {
  /** Full name segment sent to Calendly `name` */
  name: string;
  email: string;
};

export function storeBookingPrefill(data: BookingPrefill): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(
      BOOKING_PREFILL_KEY,
      JSON.stringify({ name: data.name.trim(), email: data.email.trim() }),
    );
  } catch {
    /* private mode etc. */
  }
}

export function readBookingPrefill(): BookingPrefill | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(BOOKING_PREFILL_KEY);
    if (!raw) return null;
    const o = JSON.parse(raw) as unknown;
    if (
      typeof o === "object" &&
      o &&
      typeof (o as BookingPrefill).name === "string" &&
      typeof (o as BookingPrefill).email === "string"
    ) {
      return {
        name: (o as BookingPrefill).name.trim(),
        email: (o as BookingPrefill).email.trim(),
      };
    }
  } catch {
    /* ignore */
  }
  return null;
}

export function takeBookingPrefill(): BookingPrefill | null {
  const v = readBookingPrefill();
  if (typeof window !== "undefined" && v) {
    try {
      sessionStorage.removeItem(BOOKING_PREFILL_KEY);
    } catch {
      /* ignore */
    }
  }
  return v;
}
