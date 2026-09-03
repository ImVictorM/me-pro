export const locales = ["en-US", "pt-BR"] as const;

export type AvailableLocale = (typeof locales)[number];

export const defaultLocale: AvailableLocale = "en-US";

type InterpolationValues = Record<string, string | number>;

export function interpolate(
  message: string,
  values: InterpolationValues,
): string {
  return message.replace(/\{(\w+)\}/g, (placeholder, key) => {
    const value = values[key];

    return value !== undefined ? String(value) : placeholder;
  });
}
