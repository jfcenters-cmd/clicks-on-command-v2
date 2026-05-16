import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { PreferredVendor } from "@/components/sections/PreferredVendor";
import { Results } from "@/components/sections/Results";
import { DocuMarketing } from "@/components/sections/DocuMarketing";
import { FinalCTA } from "@/components/sections/FinalCTA";

/** Default homepage when Builder has no published page for `/`. */
export function HomePageStatic() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <Hero />
        <PreferredVendor />
        <Results />
        <DocuMarketing />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
