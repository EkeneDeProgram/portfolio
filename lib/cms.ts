// Strapi GraphQL Client
// A simple & reusable function to send GraphQL queries to Strapi.

export async function strapiQuery<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  const endpoint = process.env.STRAPI_GRAPHQL_ENDPOINT;

  if (!endpoint) {
    throw new Error("Missing STRAPI_GRAPHQL_ENDPOINT in .env.local");
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 * 10 },
  });

  const json = await res.json();

  if (json.errors) {
    console.error("Strapi GraphQL Error:", json.errors);
    throw new Error("Failed to fetch data from Strapi");
  }

  return json.data as T;
}
