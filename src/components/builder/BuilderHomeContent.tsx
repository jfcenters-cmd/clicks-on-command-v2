"use client";

import { Content, type BuilderContent } from "@builder.io/sdk-react-nextjs";
import { customComponents } from "@/builder/builder-registry";

type Props = {
  content: BuilderContent;
  apiKey: string;
};

/** Client boundary: registry imports interactive section components. */
export function BuilderHomeContent({ content, apiKey }: Props) {
  return (
    <Content
      content={content}
      apiKey={apiKey}
      model="page"
      customComponents={customComponents}
    />
  );
}
