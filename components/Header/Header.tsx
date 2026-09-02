import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getDictionary } from "@/app/[lang]/dictionaries";

export default async function Header() {
  const dict = await getDictionary();

  return (
    <header className="flex justify-between items-center px-5 h-17.5">
      <div>
        <Link href="/" prefetch={false}>
          <span className="truncate text-lg font-medium md:text-xl">
            {dict.header.name}
            <span className="text-primary text-2xl">.</span>
          </span>
        </Link>
      </div>

      <div>
        <nav>
          <ul className="flex gap-4 text-sm">
            <li>
              <Link prefetch={false} href="#" className="link">
                {dict.header.navigationList.work}
              </Link>
            </li>
            <li>
              <Link prefetch={false} href="#" className="link">
                {dict.header.navigationList.services}
              </Link>
            </li>
            <li>
              <Link prefetch={false} href="#" className="link">
                {dict.header.navigationList.about}
              </Link>
            </li>
            <li>
              <Link prefetch={false} href="#" className="link">
                {dict.header.navigationList.contact}
              </Link>
            </li>
            <li>
              <Link prefetch={false} href="#" className="link">
                {dict.header.navigationList.faq}
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div>
        <Button size="lg" type="button">
          {dict.header.cta.startProject}
        </Button>
      </div>
    </header>
  );
}
