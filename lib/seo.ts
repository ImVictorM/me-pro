import { contact } from "@/data";
import type { AvailableLocale } from "@/localization";

type LocaleMeta = {
  title: string;
  description: string;
  jobTitle: string;
  ogImage: string;
  ogImageAlt: string;
};

export const commonMeta = {
  author: "Victor Mendes",
  prodUrl: "https://victor-mendes.dev",
};

export const seoByLocale = {
  "en-US": {
    title: "Victor Mendes | Freelance Software Developer",
    description:
      "Freelance software developer building websites, web applications, mobile apps, and custom software",
    jobTitle: "Freelance Software Developer",
    ogImage: "/metadata/og-en.png",
    ogImageAlt: "Victor Mendes, digital solutions for your business",
  },
  "pt-BR": {
    title: "Victor Mendes | Desenvolvedor de Software Freelancer",
    description:
      "Desenvolvedor de software freelancer criando sites, aplicações web, aplicativos mobile e soluções personalizadas",
    jobTitle: "Desenvolvedor de Software Freelancer",
    ogImage: "/metadata/og-pt.png",
    ogImageAlt: "Victor Mendes, solução digital para seu negócio",
  },
} satisfies Record<AvailableLocale, LocaleMeta>;

export function createJsonLd(lang: AvailableLocale) {
  const current = seoByLocale[lang];

  const pageUrl = `${commonMeta.prodUrl}/${lang}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${commonMeta.prodUrl}/#person`,
        name: commonMeta.author,
        url: commonMeta.prodUrl,
        jobTitle: current.jobTitle,
        sameAs: [contact.social.github, contact.social.linkedIn],
      },
      {
        "@type": "WebSite",
        "@id": `${commonMeta.prodUrl}/#website`,
        url: commonMeta.prodUrl,
        name: commonMeta.author,
        inLanguage: ["en-US", "pt-BR"],
        publisher: {
          "@id": `${commonMeta.prodUrl}/#person`,
        },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: current.title,
        description: current.description,
        inLanguage: lang,
        isPartOf: {
          "@id": `${commonMeta.prodUrl}/#website`,
        },
        about: {
          "@id": `${commonMeta.prodUrl}/#person`,
        },
      },
    ],
  };
}
