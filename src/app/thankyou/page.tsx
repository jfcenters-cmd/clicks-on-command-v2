import type { Metadata } from "next";
import { ThankYouBookedInner } from "./thankyou-inner";

export const metadata: Metadata = {
  title: "You're booked",
  description:
    "Your Clicks On Command strategy call is scheduled. Confirmation details are on the way.",
};

export default function ThankYouBookedPage() {
  return <ThankYouBookedInner />;
}
