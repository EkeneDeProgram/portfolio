import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const secret = req.headers.get("x-revalidate-secret");

    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    const body = await req.json();
    const entry = body.entry;
    const slug = entry?.slug;
    const model = body.model;

    // Debug log (safe for local development)
    console.log("Webhook received:", {
      model: body.model,
      slug,
      event: body.event,
    });

    let categorySlug: string | null = null;

    if (model === "api::project-update.project-update") {
      categorySlug = "project-updates";
    } else if (model === "api::career-growth.career-growth") {
      categorySlug = "career-growth";
    } else if (model === "api::engineering-note.engineering-note") {
      categorySlug = "engineering-notes";
    }

    // Blog detail page
    if (slug) {
      revalidatePath(`/blog/${slug}`);
    }

    // Category page
    if (categorySlug) {
      revalidatePath(`/blog/category/${categorySlug}`);
    }

    // Blog index
    revalidatePath("/blog");

    return NextResponse.json({
      revalidated: true,
      slug,
      categorySlug,
      event: body.event,
    });
  } catch (error) {
    console.error("ISR webhook error:", error);
    return NextResponse.json(
      { message: "Revalidation failed" },
      { status: 500 }
    );
  }
}

