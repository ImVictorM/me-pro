import Link from "next/link";

import { getDictionary } from "@/app/[lang]/dictionaries";
import MobileNavigation from "./MobileNavigation";
import { APP_SECTIONS } from "@/data";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { ThemeToggle } from "../ThemeToggle";

export default async function Header() {
  const dict = await getDictionary();

  return (
    <header className="w-full max-w-layout mx-auto z-50">
      <div className="flex justify-between items-center gap-4 px-5 h-17.5 md:grid-cols-[1fr_auto_1fr] md:grid ">
        <div className="md:justify-self-start">
          <Link href={`#${APP_SECTIONS.hero}`} prefetch={false}>
            <span className="truncate text-lg font-bold md:text-xl">
              {dict.header.name}
              <span className="text-primary text-2xl">.</span>
            </span>
          </Link>
        </div>

        <nav className="hidden md:justify-self-center md:block">
          <ul className="flex gap-4 text-sm">
            <li>
              <Link
                prefetch={false}
                href={`#${APP_SECTIONS.services}`}
                className="hover:text-primary"
              >
                {dict.header.navigationList.services}
              </Link>
            </li>

            <li>
              <Link
                prefetch={false}
                href={`#${APP_SECTIONS.projects}`}
                className="text-bold hover:text-primary"
              >
                {dict.header.navigationList.work}
              </Link>
            </li>

            <li>
              <Link
                prefetch={false}
                href={`#${APP_SECTIONS.benefits}`}
                className="hover:text-primary"
              >
                {dict.header.navigationList.about}
              </Link>
            </li>
            <li>
              <Link
                prefetch={false}
                href={`#${APP_SECTIONS.contact}`}
                className="hover:text-primary"
              >
                {dict.header.navigationList.contact}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex flex-row items-center gap-3 md:justify-self-end">
          <div className="hidden md:flex justify-end items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          <Button
            nativeButton={false}
            render={<Link prefetch={false} href={`#${APP_SECTIONS.contact}`} />}
            size="lg"
          >
            {dict.header.cta.startProject}
          </Button>

          <MobileNavigation dictionary={dict.header} />
        </div>
      </div>
    </header>
  );
}
