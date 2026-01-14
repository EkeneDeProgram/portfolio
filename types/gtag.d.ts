export {};

declare global {
  interface Window {
    gtag: (
      command: "event" | "config" | "js",
      action: string | Date,
      params?: {
        event_category?: string;
        event_label?: string;
        value?: number;
        [key: string]: unknown; // changed from any to unknown
      }
    ) => void;
  }
}
