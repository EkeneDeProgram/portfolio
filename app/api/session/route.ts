import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies(); // await here

  let sessionId = cookieStore.get("news_session")?.value;

  if (!sessionId) {
    sessionId = randomUUID();

    cookieStore.set("news_session", sessionId, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });
  }

  return NextResponse.json({ sessionId });
}

