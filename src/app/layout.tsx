import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CalendlyProvider } from "@/components/CalendlyProvider";
import "./globals.css";

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ??
  "https://calendly.com/clicksoncommand/30min";
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

/** Canonical site URL (Open Graph, metadataBase). Use your *.vercel.app until custom DNS is connected. */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://clicksoncommand.com";
const TITLE = "Clicks On Command — Predictable Prepays for Body Contouring Clinics";
const DESCRIPTION =
  "We get body contouring clinics paying customers who actually want their help — and we do the heavy lifting (ads, conversion, DocuMarketing). Preferred vendor for Contour Light® Research LLC.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · Clicks On Command",
  },
  description: DESCRIPTION,
  applicationName: "Clicks On Command",
  keywords: [
    "body contouring marketing",
    "Contour Light",
    "prepaid consultations",
    "Meta advertising for clinics",
    "DocuMarketing",
    "med spa lead generation",
    "clinic conversion systems",
  ],
  authors: [{ name: "Clicks On Command" }],
  creator: "Clicks On Command",
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Clicks On Command",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: "#060607",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrument.variable} antialiased`}
    >
      <body className="min-h-screen min-h-[100dvh] bg-background text-foreground selection:bg-accent/40">
        {META_PIXEL_ID ? (
          <>
            <Script
              id="meta-pixel-base"
              strategy="lazyOnload"
              dangerouslySetInnerHTML={{
                __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`,
              }}
            />
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        ) : null}
        <CalendlyProvider url={CALENDLY_URL}>{children}</CalendlyProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
