export const summaryKey = (url: string) =>
  `summary:${Buffer.from(url).toString("base64")}`;
