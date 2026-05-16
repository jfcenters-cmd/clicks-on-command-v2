import {
  Content,
  fetchOneEntry,
  getBuilderSearchParams,
  isPreviewing,
} from "@builder.io/sdk-react-nextjs";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HomePageStatic } from "@/components/home/HomePageStatic";
import { customComponents } from "@/builder/builder-registry";
import { getBuilderApiKey, toBuilderQuery } from "@/lib/builder";

export const revalidate = 60;

type HomePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Home({ searchParams }: HomePageProps) {
  const apiKey = getBuilderApiKey();

  if (!apiKey) {
    return <HomePageStatic />;
  }

  const resolvedSearch = toBuilderQuery(await searchParams);
  const content = await fetchOneEntry({
    model: "page",
    apiKey,
    options: getBuilderSearchParams(resolvedSearch),
    userAttributes: { urlPath: "/" },
  });

  const preview = isPreviewing(resolvedSearch);

  if (!content && !preview) {
    return <HomePageStatic />;
  }

  return (
    <>
      <Navbar />
      <main className="relative">
        <Content
          content={content}
          apiKey={apiKey}
          model="page"
          customComponents={customComponents}
        />
      </main>
      <Footer />
    </>
  );
}
