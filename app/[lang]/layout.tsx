import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "../globals.css";
import { commonMeta, createJsonLd, seoByLocale } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { AvailableLocale } from "@/localization";
import { hasLocale } from "./dictionaries";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;

  const current = seoByLocale[lang as keyof typeof seoByLocale];

  return {
    metadataBase: new URL(commonMeta.prodUrl),
    title: current.title,
    description: current.description,

    alternates: {
      canonical: `/${lang}`,
      languages: {
        "en-US": "/en-US",
        "pt-BR": "/pt-BR",
      },
    },

    openGraph: {
      type: "website",
      title: current.title,
      description: current.description,
      url: `/${lang}`,
      siteName: commonMeta.author,
      locale: lang === "pt-BR" ? "pt_BR" : "en_US",
      alternateLocale: lang === "pt-BR" ? ["en_US"] : ["pt_BR"],
      images: [
        {
          url: current.ogImage,
          width: 1200,
          height: 630,
          alt: current.ogImageAlt,
          type: "image/png",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: current.title,
      description: current.description,
      images: [current.ogImage],
    },

    robots: {
      index: true,
      follow: true,
    },

    authors: [
      {
        name: commonMeta.author,
        url: commonMeta.prodUrl,
      },
    ],

    creator: commonMeta.author,
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  const isLocaleValid = hasLocale(lang);
  const jsonLd = isLocaleValid ? createJsonLd(lang as AvailableLocale) : null;

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {jsonLd && <JsonLd data={jsonLd} />}

        <ThemeProvider disableTransitionOnChange attribute="class">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
