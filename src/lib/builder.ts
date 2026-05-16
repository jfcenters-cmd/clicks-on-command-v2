/** Public Builder space API key (safe for browser + server fetch). */
export function getBuilderApiKey(): string | undefined {
  return process.env.NEXT_PUBLIC_BUILDER_API_KEY?.trim() || undefined;
}

/** Next.js `searchParams` → Builder `QueryObject`. */
export function toBuilderQuery(
  search: Record<string, string | string[] | undefined>,
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(search)) {
    if (value === undefined) continue;
    out[key] = Array.isArray(value) ? (value[0] ?? "") : value;
  }
  return out;
}
