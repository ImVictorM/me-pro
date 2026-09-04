const launchYear = 2026;
const currentYear = new Date().getFullYear();

export const copyrightYear =
  launchYear === currentYear
    ? `© ${launchYear}`
    : `© ${launchYear}-${currentYear}`;

export const contact = {
  email: "victor.fmendes7@gmail.com",
  phone: {
    display: "19 98157-7937",
  },
  social: {
    github: "https://github.com/ImVictorM",
    linkedIn: "https://www.linkedin.com/in/victor-figueiredo-mendes/",
  },
};

export const APP_SECTIONS = {
  hero: "hero",
  services: "services",
  projects: "projects",
  benefits: "benefits",
  workProcess: "workProcess",
  contact: "contact",
} as const;
