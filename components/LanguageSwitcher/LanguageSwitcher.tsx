"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { locales, type AvailableLocale } from "@/localization";

const localeLabels: Record<AvailableLocale, string> = {
  "en-US": "EN",
  "pt-BR": "PT",
};

export default function LanguageSwitcher({}) {
  const pathname = usePathname();

  const currentLocale = locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  function getLocalizedPath(locale: AvailableLocale) {
    if (!currentLocale) {
      return `/${locale}`;
    }

    return pathname.replace(`/${currentLocale}`, `/${locale}`);
  }

  return (
    <nav aria-label="language">
      <ul className="flex items-center gap-1 text-xs">
        {locales.map((locale, index) => {
          const active = locale === currentLocale;

          return (
            <li key={locale} className="flex items-center gap-1">
              {index > 0 && (
                <span aria-hidden="true" className="text-muted-foreground">
                  /
                </span>
              )}

              {active ? (
                <span aria-current="page" className="font-medium">
                  {localeLabels[locale]}
                </span>
              ) : (
                <Link
                  href={getLocalizedPath(locale)}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {localeLabels[locale]}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
