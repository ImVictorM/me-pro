import { Button } from "@/components/ui/button";
import { getDictionary } from "./dictionaries";
import { ScrollableWrapper, Header } from "@/components/Header";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import placeholderImg from "@/assets/images/placeholder.png";
import { ContactForm } from "@/components/ContactForm";

export default async function Home() {
  const dict = await getDictionary();

  return (
    <div>
      <ScrollableWrapper>
        <Header />
      </ScrollableWrapper>

      <main className="flex flex-col gap-10">
        {/* Hero */}
        <section className="section min-h-screen flex flex-col justify-center gap-8">
          <h1 className="text-7xl font-bold leading-none">{dict.hero.title}</h1>
          <p className="text-2xl text-muted-foreground leading-relaxed font-light">
            {dict.hero.subtitle}
          </p>

          <div className="flex gap-4 mt-4">
            <Button className="text-lg px-8 py-7" type="button">
              {dict.hero.cta.primaryAction}
            </Button>
            <Button
              className="text-lg px-8 py-7"
              type="button"
              variant="outline"
            >
              {dict.hero.cta.secondaryAction}
            </Button>
          </div>
        </section>

        {/* Services */}
        <section className="section">
          <h2 className="section-title">{dict.services.title}</h2>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dict.services.items.map((service, index) => (
              <li key={index}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </section>

        {/* Projects */}
        <div className="bg-surface">
          <section className="section">
            <h2 className="section-title">{dict.projects.title}</h2>

            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {dict.projects.items.map(
                ({ description, role, subject, title }, index) => (
                  <li key={index}>
                    <Card className="h-full relative mx-auto w-full pt-0">
                      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
                      <Image
                        src={placeholderImg}
                        alt=""
                        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
                      />
                      <CardHeader className="flex flex-col gap-2">
                        <div className="flex flex-col">
                          <CardTitle>{title}</CardTitle>

                          <CardDescription>{description}</CardDescription>
                        </div>

                        <CardAction className="flex flex-row gap-2">
                          <Badge variant="secondary">{role}</Badge>
                          <Badge variant="secondary">{subject}</Badge>
                        </CardAction>
                      </CardHeader>
                    </Card>
                  </li>
                ),
              )}
            </ul>
          </section>
        </div>

        {/* About 1 */}
        <section className="section max-w-225 mx-auto">
          <h2 className="flex justify-center">
            <span className="block w-fit section-title">
              {dict.about.benefitsSection.title}
            </span>
          </h2>

          <ul className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {dict.about.benefitsSection.benefits.map(
              ({ description, title }, index) => (
                <li
                  className="border-l-2 border-foreground pl-5 py-2"
                  key={index}
                >
                  <div>
                    <h3 className="text-lg mb-2 sm:text-xl">{title}</h3>
                    <p className="text-muted-foreground">{description}</p>
                  </div>
                </li>
              ),
            )}
          </ul>
        </section>

        {/* About 2 */}
        <section className="section">
          <h2 className="section-title">
            {dict.about.workProcessSection.title}
          </h2>

          <ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
        <section>
          <ContactForm />
        </section>
      </main>

      <footer className="mt-50">Footer</footer>
    </div>
  );
}
