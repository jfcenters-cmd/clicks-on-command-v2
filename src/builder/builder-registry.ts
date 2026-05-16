"use client";

import type { RegisteredComponent } from "@builder.io/sdk-react-nextjs";
import { Hero } from "@/components/sections/Hero";
import { PreferredVendor } from "@/components/sections/PreferredVendor";
import { Results } from "@/components/sections/Results";
import { DocuMarketing } from "@/components/sections/DocuMarketing";
import { FinalCTA } from "@/components/sections/FinalCTA";

/**
 * Custom blocks for the Builder Visual Editor.
 * Drag/reorder on a Page model entry with URL path `/`.
 * Click a block → Options panel to edit fields below.
 */
export const customComponents: RegisteredComponent[] = [
  {
    component: Hero,
    name: "Hero",
    friendlyName: "Hero",
    inputs: [
      { name: "headlineBefore", type: "string", defaultValue: "Predictable" },
      {
        name: "headlineAccent",
        type: "string",
        defaultValue: "prepaid sales",
      },
      {
        name: "headlineLine2",
        type: "string",
        defaultValue: "for body contouring clinics —",
      },
      {
        name: "headlineEmphasis",
        type: "string",
        defaultValue: "on command.",
      },
      {
        name: "subhead",
        type: "longText",
        defaultValue:
          "We get you paying customers that actually want your help — and we do all the heavy lifting.",
      },
      {
        name: "primaryCtaLabel",
        type: "string",
        defaultValue: "Book A Strategy Call",
      },
      {
        name: "secondaryCtaLabel",
        type: "string",
        defaultValue: "How DocuMarketing works →",
      },
    ],
  },
  {
    component: PreferredVendor,
    name: "PreferredVendor",
    friendlyName: "Preferred vendor",
    inputs: [
      {
        name: "sectionTitlePrefix",
        type: "string",
        defaultValue: "Preferred marketing vendor for",
      },
      {
        name: "sectionTitleHighlight",
        type: "string",
        defaultValue: "Contour Light® Research LLC.",
      },
      {
        name: "cardTitle",
        type: "string",
        defaultValue: "Preferred marketing vendor",
      },
      {
        name: "cardBody",
        type: "longText",
        defaultValue:
          "Named partner for clinics deploying Contour Light® — prepay funnels, acquisition, and patient education.",
      },
    ],
  },
  {
    component: Results,
    name: "Results",
    friendlyName: "Client results",
    inputs: [
      {
        name: "sectionTitleLine1",
        type: "string",
        defaultValue: "Built to put real revenue",
      },
      {
        name: "sectionTitleAccent",
        type: "string",
        defaultValue: "on the books.",
      },
      {
        name: "sectionDescription",
        type: "longText",
        defaultValue:
          "Aggregate figures from our body contouring accounts. Your results will depend on your market and execution.",
      },
      {
        name: "client1Metric",
        type: "string",
        defaultValue: "$100K",
      },
      {
        name: "client1MetricSub",
        type: "string",
        defaultValue: "first month at six figures",
      },
      {
        name: "client1Context",
        type: "longText",
        defaultValue:
          "Hit his first $100K month after installing the Clicks On Command prepay system.",
      },
      {
        name: "client1Name",
        type: "string",
        defaultValue: "Dr. Hartman",
      },
      {
        name: "client1Role",
        type: "string",
        defaultValue: "Body Contouring Clinic Owner",
      },
      {
        name: "client2Metric",
        type: "string",
        defaultValue: "$16K",
      },
      {
        name: "client2MetricSub",
        type: "string",
        defaultValue: "in just a few weeks",
      },
      {
        name: "client2Context",
        type: "longText",
        defaultValue:
          "Generated $16K within weeks of starting with us — after firing her previous agency for not delivering.",
      },
      {
        name: "client2Name",
        type: "string",
        defaultValue: "Haley",
      },
      {
        name: "client2Role",
        type: "string",
        defaultValue: "Body Contouring Clinic Owner",
      },
      {
        name: "disclaimer",
        type: "string",
        defaultValue:
          "Individual results vary · Outcomes depend on clinic, market, and execution",
      },
    ],
  },
  {
    component: DocuMarketing,
    name: "DocuMarketing",
    friendlyName: "DocuMarketing",
    inputs: [
      { name: "eyebrow", type: "string", defaultValue: "DocuMarketing" },
      {
        name: "headlineMain",
        type: "string",
        defaultValue: "I spent 7 years figuring out why most marketing sucks",
      },
      {
        name: "headlineAccent",
        type: "string",
        defaultValue: "(so you don't have to).",
      },
      {
        name: "paragraph1",
        type: "longText",
        defaultValue:
          "After studying every marketing method I could get my hands on for 7 years, I realized something that pissed me off: they were all the same system with different names. Everyone was just repackaging the same stuff and calling it their own. But here's what mattered — the foundation actually worked when you stripped away the BS.",
      },
      {
        name: "paragraph2",
        type: "longText",
        defaultValue:
          'The problem? Most people were executing it wrong. Marketing became this aggressive, overly persuasive mess of "BUY MY STUFF NOW" that attracted garbage leads and crap appointments. I saw body contouring clinics burning money on ads that brought in tire-kickers who never showed up or people who wanted discounts instead of results.',
      },
      {
        name: "quoteLead",
        type: "string",
        defaultValue: "So I built DocuMarketing. Simple concept:",
      },
      {
        name: "quoteAccent",
        type: "longText",
        defaultValue:
          "stop trying to sell and start documenting what you actually do.",
      },
      {
        name: "quoteRest",
        type: "longText",
        defaultValue:
          "Show how body contouring works. Explain why someone would want it. Let the machine and the results do the talking. No trying to sound smart. No marketer gimmicks. Just real documentation of a real process that builds trust faster than any sales pitch ever could.",
      },
      {
        name: "paragraph3",
        type: "longText",
        defaultValue:
          "Before I ever touched a client's business with this, I tested it myself. Built two entirely new businesses on it — including a family member's company that hit a million in revenue the first year. Been running this in body contouring since 2019 because it works and these are clients I actually want to work with.",
      },
      {
        name: "outcome1Title",
        type: "string",
        defaultValue: "Ads that don't read gimmicky",
      },
      {
        name: "outcome1Body",
        type: "longText",
        defaultValue:
          "Creative and positioning match a serious clinical offer — not discount-bin energy.",
      },
      {
        name: "outcome2Title",
        type: "string",
        defaultValue: "Pages that match premium buyers",
      },
      {
        name: "outcome2Body",
        type: "longText",
        defaultValue:
          "Landing experiences line up with who you actually want on the schedule.",
      },
      {
        name: "outcome3Title",
        type: "string",
        defaultValue: "Pre-paid, pre-sold, ready",
      },
      {
        name: "outcome3Body",
        type: "longText",
        defaultValue:
          "When people book, they've already bought in — not tire-kickers hunting a coupon.",
      },
      {
        name: "disclaimer",
        type: "string",
        defaultValue: "Past performance is not a guarantee of your results.",
      },
    ],
  },
  {
    component: FinalCTA,
    name: "FinalCTA",
    friendlyName: "Final CTA",
    inputs: [
      {
        name: "headlineLine1",
        type: "string",
        defaultValue: "Stop chasing leads.",
      },
      {
        name: "headlineAccent",
        type: "string",
        defaultValue: "Start collecting prepays.",
      },
      {
        name: "subhead",
        type: "longText",
        defaultValue:
          "If you run a body contouring clinic and want a prepay system installed, we'll map what we'd build for you — in 30 minutes on a call.",
      },
      {
        name: "primaryCtaLabel",
        type: "string",
        defaultValue: "Book A Strategy Call",
      },
      {
        name: "secondaryCtaLabel",
        type: "string",
        defaultValue: "Read the approach",
      },
      {
        name: "guarantee1",
        type: "string",
        defaultValue: "Body contouring only",
      },
      {
        name: "guarantee2",
        type: "string",
        defaultValue: "30 minutes",
      },
    ],
  },
];
