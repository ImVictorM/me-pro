import { Button } from "@/components/ui/button";
import { getDictionary } from "./dictionaries";
import { ScrollableWrapper, Header } from "@/components/Header";

export default async function Home() {
  const dict = await getDictionary();

  return (
    <div>
      <ScrollableWrapper>
        <Header />
      </ScrollableWrapper>

      <main className="flex flex-col px-8">
        {/* Hero */}
        <section className="min-h-screen flex flex-col  justify-center gap-8">
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
        <section>
          <h2>{dict.services.title}</h2>
          <ul>
            {dict.services.items.map((service, index) => (
              <li key={index}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
