import { lang } from "next/root-params";
import { notFound } from "next/navigation";

const dicts = {
  en: () =>
    import("@/localization/dictionaries/en.json").then(
      (module) => module.default,
    ),
  ptBr: () =>
    import("@/localization/dictionaries/pt-br.json").then(
      (module) => module.default,
    ),
};

export type Locale = keyof typeof dicts;

export const hasLocale = (locale: string): locale is Locale => locale in dicts;

export const getDictionary = async () => {
  const locale = await lang();
  if (!hasLocale(locale)) return notFound();

  return dicts[locale]();
};
