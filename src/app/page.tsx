import dynamic from "next/dynamic";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { PreferredVendor } from "@/components/sections/PreferredVendor";

const Results = dynamic(() =>
  import("@/components/sections/Results").then((m) => ({
    default: m.Results,
  })),
);

const DocuMarketing = dynamic(() =>
  import("@/components/sections/DocuMarketing").then((m) => ({
    default: m.DocuMarketing,
  })),
);

const FinalCTA = dynamic(() =>
  import("@/components/sections/FinalCTA").then((m) => ({
    default: m.FinalCTA,
  })),
);

export default function Home() {
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
