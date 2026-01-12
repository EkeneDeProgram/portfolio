import { Redis } from "@upstash/redis";
import { summaryKey } from "./redisKeys";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function getOrCreateSummary(
  article: { title: string; description?: string; content?: string; url: string }
) {
  const key = summaryKey(article.url);

  const cached = await redis.get<string>(key);
  if (cached) return cached;

  const summary = `
  Editorial Summary:
  ${article.description ?? article.title}
  `.trim();

  await redis.set(key, summary, { ex: 60 * 60 * 24 * 3 });
  return summary;
}
