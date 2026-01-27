// import { getTopNews } from "@/lib/news/fetchNews";
// import { revalidatePath } from "next/cache";

// export async function GET(req: Request) {
//   const auth = req.headers.get("authorization");

//   if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
//     return new Response("Unauthorized", { status: 401 });
//   }

//   await getTopNews("cron", {
//     dedupe: false,
//     forceRefresh: true,
//   });

//   revalidatePath("/blog");
//   revalidatePath("/blog/news");

//   return Response.json({ ok: true, refreshed: true });
// }







import { getTopNews } from "@/lib/news/fetchNews";
import { revalidatePath } from "next/cache";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");

  if (secret !== process.env.CRON_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  await getTopNews("cron", {
    dedupe: false,
    forceRefresh: true,
  });

  revalidatePath("/blog");
  revalidatePath("/blog/news");

  return Response.json({ ok: true, refreshed: true });
}
