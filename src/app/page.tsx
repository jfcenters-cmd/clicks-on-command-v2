import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CalendlyProvider } from "@/components/CalendlyProvider";
import { Hero } from "@/components/sections/Hero";
import { PreferredVendor } from "@/components/sections/PreferredVendor";
import { Results } from "@/components/sections/Results";
import { DocuMarketing } from "@/components/sections/DocuMarketing";
import { FinalCTA } from "@/components/sections/FinalCTA";

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ??
  "https://calendly.com/clicksoncommand/30min";

export default function Home() {
  return (
    <CalendlyProvider url={CALENDLY_URL}>
      <Navbar />
      <main className="relative">
        <Hero />
        <PreferredVendor />
        <Results />
        <DocuMarketing />
        <FinalCTA />
      </main>
      <Footer />
    </CalendlyProvider>
  );
}
