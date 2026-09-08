import cantinhoCover from "@/assets/images/cantinho/cantinhoAbout.webp";
import cantinhoAbout from "@/assets/images/cantinho/cantinhoAbout.webp";
import cantinhoGallery from "@/assets/images/cantinho/cantinhoGallery.webp";
import cantinhoCTA from "@/assets/images/cantinho/cantinhoCTA.webp";
import cantinhoContact from "@/assets/images/cantinho/cantinhoContact.webp";

import meAndroidCover from "@/assets/images/me-android/meAndroidCover.webp";
import meAndroidIntro from "@/assets/images/me-android/meAndroidIntro.webp";
import meAndroidAbout from "@/assets/images/me-android/meAndroidAbout.webp";
import meAndroidExp from "@/assets/images/me-android/meAndroidExperiences.webp";
import meAndroidSkills from "@/assets/images/me-android/meAndroidSkills.webp";

import meerkatCover from "@/assets/images/meerkat/meerkatCover.webp";
import meerkatAuth from "@/assets/images/meerkat/meerkatAuth.webp";
import meerkatTablets from "@/assets/images/meerkat/meerkatTablets.webp";
import meerkatProduct from "@/assets/images/meerkat/meerkatProduct.webp";
import meerkatComm from "@/assets/images/meerkat/meerkatComm.webp";

import triviaCover from "@/assets/images/trivia/triviaCover.webp";
import triviaEnter from "@/assets/images/trivia/triviaEnter.webp";
import triviaWellDone from "@/assets/images/trivia/triviaWellDone.webp";
import triviaRanking from "@/assets/images/trivia/triviaRanking.webp";

import ecommerceCover from "@/assets/images/ecommerce/ecommerceCover.webp";
import tocataCover from "@/assets/images/tocata/tocataCover.webp";
import type { StaticImageData } from "next/image";

export type ProjectData = {
  cover: StaticImageData;
  images: StaticImageData[];
  technologies: string[];
  inDevelopment: boolean;
  links?: {
    demo?: string;
    source?: string;
  };
  devYear?: string;
};

export const PROJECTS = {
  cantinho: {
    cover: cantinhoCover,
    images: [
      cantinhoCover,
      cantinhoAbout,
      cantinhoGallery,
      cantinhoCTA,
      cantinhoContact,
    ],
    technologies: ["React", "TypeScript", "Tailwind"],
    inDevelopment: false,
    links: {
      demo: "https://cantinhodosbordados.com.br/",
    },
    devYear: "2026",
  },
  meerkat: {
    cover: meerkatCover,
    images: [
      meerkatCover,
      meerkatAuth,
      meerkatTablets,
      meerkatProduct,
      meerkatComm,
    ],
    technologies: ["React", "Tailwind", "NodeJS", "Express", "MongoDB"],
    inDevelopment: false,
    links: {
      demo: "https://meerkats.com.br/",
    },
    devYear: "2026",
  },
  tocata: {
    cover: tocataCover,
    images: [tocataCover],
    technologies: ["React Native", "TypeScript", "Expo"],
    inDevelopment: true,
  },
  ecommerce: {
    cover: ecommerceCover,
    images: [ecommerceCover],
    technologies: ["C#", "ASP.NET Core", "Entity Framework Core", "PostgreSQL"],
    inDevelopment: false,
    links: {
      source: "https://github.com/ImVictorM/ECommerceManagement",
    },
    devYear: "2025",
  },
  meAndroid: {
    cover: meAndroidCover,
    images: [
      meAndroidCover,
      meAndroidIntro,
      meAndroidAbout,
      meAndroidExp,
      meAndroidSkills,
    ],
    technologies: ["React", "TypeScript", "Tailwind"],
    inDevelopment: false,
    links: {
      source: "https://github.com/ImVictorM/MeAndroid-7V",
      demo: "https://me-android.vercel.app/",
    },
    devYear: "2025",
  },
  trivia: {
    cover: triviaCover,
    images: [triviaCover, triviaEnter, triviaWellDone, triviaRanking],
    technologies: ["React", "TypeScript", "Styled Components"],
    inDevelopment: false,
    links: {
      source: "https://github.com/ImVictorM/Trivia-Game",
      demo: "https://play-trivia-game.vercel.app/",
    },
    devYear: "2024",
  },
} satisfies Record<string, ProjectData>;

export type ProjectId = keyof typeof PROJECTS;
