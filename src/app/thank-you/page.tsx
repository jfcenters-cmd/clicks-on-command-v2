import type { Metadata } from "next";
import { ThankYouInner } from "./thank-you-inner";

export const metadata: Metadata = {
  title: "Thank you",
};

export default function ThankYouPage() {
  return <ThankYouInner />;
}
