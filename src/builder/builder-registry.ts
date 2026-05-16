"use client";

import type { RegisteredComponent } from "@builder.io/sdk-react-nextjs";
import { Hero } from "@/components/sections/Hero";
import { PreferredVendor } from "@/components/sections/PreferredVendor";
import { Results } from "@/components/sections/Results";
import { DocuMarketing } from "@/components/sections/DocuMarketing";
import { FinalCTA } from "@/components/sections/FinalCTA";

/**
 * Custom blocks for the Builder Visual Editor.
 * Drag/reorder these on a Page model entry with URL path `/`.
 */
export const customComponents: RegisteredComponent[] = [
  {
    component: Hero,
    name: "Hero",
    friendlyName: "Hero",
    inputs: [
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
  },
  {
    component: Results,
    name: "Results",
    friendlyName: "Client results",
  },
  {
    component: DocuMarketing,
    name: "DocuMarketing",
    friendlyName: "DocuMarketing",
  },
  {
    component: FinalCTA,
    name: "FinalCTA",
    friendlyName: "Final CTA",
    inputs: [
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
    ],
  },
];
