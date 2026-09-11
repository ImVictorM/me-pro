import { Button } from "@/components/ui/button";
import { getDictionary } from "./dictionaries";
import { ScrollableWrapper, Header } from "@/components/Header";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ContactForm } from "@/components/ContactForm";
import { APP_SECTIONS, contact, copyrightYear } from "@/data";
import LinkedInIcon from "@/assets/icons/LinkedInIcon";
import GitHubIcon from "@/assets/icons/GitHubIcon";
import { AnimationContainer } from "@/components/AnimationContainer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectId, PROJECTS } from "@/data/projects";
import { ProjectDialogCard } from "@/components/ProjectDialogCard";

export default async function Home() {
  const dict = await getDictionary();

  const projects = Object.entries(PROJECTS).map(([id, project]) => ({
    id,
    ...project,
    content: dict.projects.items[id as ProjectId],
  }));

  return (
    <div>
      <ScrollableWrapper>
        <Header />
      </ScrollableWrapper>

      <AnimationContainer>
        <main className="flex flex-col gap-10">
          {/* Hero */}

          <section
            id={APP_SECTIONS.hero}
            className="section min-h-screen flex flex-col justify-center gap-8"
          >
            <h1 data-reveal-hero className="text-7xl font-bold leading-none">
              {dict.hero.title}
            </h1>
            <p
              data-reveal-hero
              className="max-w-2xl text-2xl text-muted-foreground leading-relaxed font-light"
            >
              {dict.hero.subtitle}
            </p>

            <div data-reveal-hero className="flex flex-col mt-4 gap-6">
              <div className="w-full flex-col flex sm:flex-row gap-4">
                <Button
                  nativeButton={false}
                  render={
                    <Link href={`#${APP_SECTIONS.contact}`} prefetch={false} />
                  }
                  className="text-lg px-8 py-7"
                >
                  {dict.hero.cta.primaryAction}
                </Button>

                <Button
                  className="text-lg px-8 py-7"
                  nativeButton={false}
                  variant="outline"
                  render={
                    <Link href={`#${APP_SECTIONS.projects}`} prefetch={false} />
                  }
                >
                  {dict.hero.cta.secondaryAction}
                </Button>
              </div>

              <nav className="flex flex-row gap-4 ml-2">
                <a
                  className="text-muted-foreground hover:text-primary transition-all"
                  href={contact.social.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInIcon className="size-5" />
                </a>

                <a
                  className="text-muted-foreground hover:text-primary transition-all"
                  href={contact.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubIcon className="size-5" />
                </a>
              </nav>
            </div>
          </section>

          {/* Services */}
          <section
            id={APP_SECTIONS.services}
            data-reveal-section
            className="section"
          >
            <h2 data-reveal className="section-title">
              {dict.services.title}
            </h2>

            <p data-reveal className="section-description">
              {dict.services.description}
            </p>

            <ul
              data-reveal
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {dict.services.items.map((service, index) => (
                <li key={index}>
                  <Card className="h-full bg-card dark:bg-card/60 border border-border transition-colors hover:border-primary/60">
                    <CardHeader>
                      <div className="mb-2">
                        <span className="font-mono text-sm text-primary">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="mb-auto">
                      <p className="leading-relaxed text-muted-foreground">
                        {service.description}
                      </p>
                    </CardContent>
                    <CardFooter className="ml-auto">
                      <Link
                        className="flex flex-row items-center gap-1 text-xs text-primary hover:underline"
                        prefetch={false}
                        href={`#${APP_SECTIONS.contact}`}
                      >
                        {dict.services.cta} {<ArrowRight size={14} />}
                      </Link>
                    </CardFooter>
                  </Card>
                </li>
              ))}
            </ul>
          </section>

          {/* Projects */}
          <div id={APP_SECTIONS.projects} className="bg-surface">
            <section data-reveal-section className="section">
              <h2 data-reveal className="section-title">
                {dict.projects.title}
              </h2>

              <p data-reveal className="section-description">
                {dict.projects.description}
              </p>

              <ul
                data-reveal
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {projects.map(({ id, ...project }) => (
                  <li className="group" key={id}>
                    <ProjectDialogCard
                      project={project}
                      dictionary={dict.projects.details}
                    />
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* About 1 */}
          <section
            id={APP_SECTIONS.benefits}
            className="section"
            data-reveal-section
          >
            <div className="grid gap-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-24">
              <div className="lg:sticky lg:top-32 lg:self-start">
                <h2 data-reveal className="section-title">
                  {dict.about.benefitsSection.title}
                </h2>

                <p
                  data-reveal
                  className="max-w-md text-lg leading-relaxed text-muted-foreground"
                >
                  {dict.about.benefitsSection.description}
                </p>
              </div>

              <ul data-reveal className="divide-y divide-border">
                {dict.about.benefitsSection.benefits.map(
                  ({ title, description }, index) => (
                    <li
                      key={title}
                      className="grid gap-4 py-8 first:pt-0 sm:grid-cols-[3rem_1fr]"
                    >
                      <span className="font-mono text-sm text-primary">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div>
                        <h3 className="text-xl font-medium">{title}</h3>

                        <p className="mt-2 max-w-lg leading-relaxed text-muted-foreground">
                          {description}
                        </p>
                      </div>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </section>

          {/* About 2 */}
          <section
            id={APP_SECTIONS.workProcess}
            className="section"
            data-reveal-section
          >
            <h2 data-reveal className="section-title">
              {dict.about.workProcessSection.title}
            </h2>

            <p data-reveal className="section-description">
              {dict.about.workProcessSection.description}
            </p>

            <ol
              data-reveal
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {dict.about.workProcessSection.items.map(
                ({ description, title }, index) => (
                  <li key={index} className=" pt-5">
                    <span className="font-mono text-sm text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-5 text-lg font-medium">{title}</h3>
                    <p className="mt-2 max-w-sm leading-6 text-muted-foreground">
                      {description}
                    </p>
                  </li>
                ),
              )}
            </ol>
          </section>

          {/* Contact */}
          <div>
            <section
              id={APP_SECTIONS.contact}
              className="section"
              data-reveal-section
            >
              <div className="w-full" data-reveal>
                <ContactForm dictionary={dict.contact.form} />
              </div>
            </section>
          </div>
        </main>
      </AnimationContainer>

      <footer className="border-t py-8">
        <div className="max-w-layout mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 items-center justify-center sm:flex-row sm:justify-between">
            <p className="text-muted-foreground text-sm">
              {copyrightYear} Victor Mendes · {dict.contact.form.data.country}
            </p>

            <nav className="flex flex-row gap-3">
              <a
                className="text-muted-foreground hover:text-primary transition-all"
                href={contact.social.linkedIn}
                target="_blank"
              >
                <LinkedInIcon className="size-5" />
              </a>

              <a
                className="text-muted-foreground hover:text-primary transition-all"
                href={contact.social.github}
                target="_blank"
              >
                <GitHubIcon className="size-5" />
              </a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
