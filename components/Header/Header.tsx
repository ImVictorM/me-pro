import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { getDictionary } from "@/app/[lang]/dictionaries";
import MobileNavigation from "./MobileNavigation";
import { APP_SECTIONS } from "@/data";

export default async function Header() {
  const dict = await getDictionary();

  return (
    <header className="w-full max-w-layout mx-auto z-50">
      <div className="flex justify-between items-center px-5 h-17.5">
        <div>
          <Link href={`#${APP_SECTIONS.hero}`} prefetch={false}>
            <span className="truncate text-lg font-bold md:text-xl">
              {dict.header.name}
              <span className="text-primary text-2xl">.</span>
            </span>
          </Link>
        </div>

        <nav className="hidden sm:block">
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

        <div className="flex flex-row items-center gap-4">
          <Link
            className={buttonVariants({ variant: "default", size: "lg" })}
            prefetch={false}
            href={`#${APP_SECTIONS.contact}`}
          >
            {dict.header.cta.startProject}
          </Link>

          <MobileNavigation dictionary={dict.header} />
        </div>
      </div>
    </header>
  );
}
