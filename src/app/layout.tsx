import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://clicksoncommand.com";
const TITLE = "Clicks On Command — Predictable Prepays for Body Contouring Clinics";
const DESCRIPTION =
  "Clicks On Command engineers paid advertising, conversion systems, and DocuMarketing frameworks that turn body contouring clinics into predictable prepay machines. Preferred vendor for Contour Light® Research LLC.";

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
      className={`${inter.variable} ${instrument.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="min-h-screen min-h-[100dvh] bg-background text-foreground selection:bg-accent/40">
        {children}
      </body>
    </html>
  );
}
