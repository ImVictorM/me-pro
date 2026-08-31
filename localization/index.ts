export const locales = ["en-US", "pt-BR"] as const;

export type AvailableLocale = (typeof locales)[number];

export const defaultLocale: AvailableLocale = "en-US";
