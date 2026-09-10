import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

const metadataByLocale = {
  "en-US": {
    title: "Victor Mendes | Freelance Software Developer",
    description:
      "Freelance software developer building websites, web applications, mobile apps, and custom software.",
  },

  "pt-BR": {
    title: "Victor Mendes | Desenvolvedor de Software Freelancer",
    description:
      "Desenvolvedor de software freelancer criando sites, aplicações web, aplicativos mobile e soluções personalizadas.",
  },
} as const;

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;

  const current = metadataByLocale[lang as keyof typeof metadataByLocale];

  return {
    metadataBase: new URL("https://victor-mendes.dev"),

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
      siteName: "Victor Mendes",
      locale: lang === "pt-BR" ? "pt_BR" : "en_US",
      alternateLocale: lang === "pt-BR" ? ["en_US"] : ["pt_BR"],
    },

    twitter: {
      card: "summary_large_image",
      title: current.title,
      description: current.description,
    },

    robots: {
      index: true,
      follow: true,
    },

    authors: [
      {
        name: "Victor Mendes",
      },
    ],

    creator: "Victor Mendes",
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider disableTransitionOnChange attribute="class">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
