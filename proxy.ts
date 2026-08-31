import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";

const locales = ["en-US", "pt-BR"];

function getLocale() {
  const headers = { "accept-language": "pt-BR,pt;q=0.8,en-US;q=0.6,en;q=0.4" };
  const languages = new Negotiator({ headers }).languages();

  const defaultLocale = locales[0];

  return match(languages, locales, defaultLocale);
}

export default function Proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  const locale = getLocale();

  request.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
}
