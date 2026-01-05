import { cookies } from "next/headers";
import { randomUUID } from "crypto";

export async function getSessionId(): Promise<string> {
  const cookieStore = await cookies();

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

  return sessionId;
}
