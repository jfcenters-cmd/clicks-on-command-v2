import { fetchOneEntry, getBuilderSearchParams } from "@builder.io/sdk-react-nextjs";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HomePageStatic } from "@/components/home/HomePageStatic";
import { BuilderHomeContent } from "@/components/builder/BuilderHomeContent";
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

  let content: Awaited<ReturnType<typeof fetchOneEntry>> = null;

  try {
    content = await fetchOneEntry({
      model: "page",
      apiKey,
      options: getBuilderSearchParams(resolvedSearch),
      userAttributes: { urlPath: "/" },
    });
  } catch (err) {
    console.error("[builder] fetchOneEntry failed:", err);
  }

  if (!content) {
    return <HomePageStatic />;
  }

  return (
    <>
      <Navbar />
      <main className="relative">
        <BuilderHomeContent content={content} apiKey={apiKey} />
      </main>
      <Footer />
    </>
  );
}
