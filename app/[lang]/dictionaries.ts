import { lang } from "next/root-params";
import { notFound } from "next/navigation";

const dicts = {
  "en-US": () =>
    import("@/localization/dictionaries/en-us.json").then(
      (module) => module.default,
    ),
  "pt-BR": () =>
    import("@/localization/dictionaries/pt-br.json").then(
      (module) => module.default,
    ),
};

export type LocaleDictionary = keyof typeof dicts;

type Dictionary = Awaited<ReturnType<(typeof dicts)["en-US"]>>;

export type ContactFormDictionary = Dictionary["contact"]["form"];

export type DictionaryHeader = Dictionary["header"];

export const hasLocale = (locale: string): locale is LocaleDictionary =>
  locale in dicts;

export const getDictionary = async () => {
  const locale = await lang();
  if (!hasLocale(locale)) return notFound();

  return dicts[locale]();
};
