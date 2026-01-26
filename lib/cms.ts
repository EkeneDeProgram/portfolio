// Strapi GraphQL Client
// A simple & reusable function to send GraphQL queries to Strapi.

// export async function strapiQuery<T>(
//   query: string,
//   variables: Record<string, unknown> = {}
// ): Promise<T> {
//   const endpoint = process.env.STRAPI_GRAPHQL_ENDPOINT;

//   if (!endpoint) {
//     throw new Error("Missing STRAPI_GRAPHQL_ENDPOINT in .env.local");
//   }

//   const res = await fetch(endpoint, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ query, variables }),
//     next: { revalidate: 60 * 10 },
//   });

//   const json = await res.json();

//   if (json.errors) {
//     console.error("Strapi GraphQL Error:", json.errors);
//     throw new Error("Failed to fetch data from Strapi");
//   }

//   return json.data as T;
// }










export async function strapiQuery<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  const endpoint = process.env.STRAPI_GRAPHQL_ENDPOINT;

  if (!endpoint) {
    throw new Error("Missing STRAPI_GRAPHQL_ENDPOINT");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000); // 8s max wait

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
      signal: controller.signal,
      next: { revalidate: 60 * 10 },
    });

    if (!res.ok) {
      throw new Error(`Strapi responded ${res.status}`);
    }

    const json = await res.json();

    if (json.errors) {
      console.error("Strapi GraphQL errors:", json.errors);
      throw new Error("GraphQL error");
    }

    return json.data as T;
  } catch (error) {
    console.error("Strapi fetch timeout or error:", error);

    // ✅ Safe fallback to keep page rendering
    return {
      projectUpdates: [],
      careerGrowths: [],
      engineeringNotes: [],
    } as T;
  } finally {
    clearTimeout(timeout);
  }
}
