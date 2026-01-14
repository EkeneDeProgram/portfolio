export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID!;

type GtagEvent = {
  action: string;
  category: string;
  label: string;
  value?: number;
};

export const event = ({ action, category, label, value }: GtagEvent) => {
  if (typeof window === "undefined") return;

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
};
