"use client";

import { useState } from "react";

import Link from "next/link";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { APP_SECTIONS } from "@/data";
import { DictionaryHeader } from "@/app/[lang]/dictionaries";

type MobileNavigationProps = {
  dictionary: DictionaryHeader;
};

export default function MobileNavigation({
  dictionary,
}: MobileNavigationProps) {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        type="button"
        className="md:hidden"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <X /> : <Menu />}
      </Button>

      {
        <div
          id="mobile-navigation"
          className={`
            fixed inset-x-0 top-17.5 z-20
            grid bg-background
            transition-[grid-template-rows,opacity] duration-200 ease-out
            md:hidden
            ${
              open
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] pointer-events-none opacity-0"
            }
          `}
          aria-hidden={!open}
          inert={!open}
        >
          <nav className="max-w-layout border-y pl-10 px-5 py-6 shadow-lg">
            <ul className="flex flex-col">
              <li>
                <Link
                  href={`#${APP_SECTIONS.services}`}
                  onClick={closeMenu}
                  className="block py-4 font-medium hover:text-primary"
                  prefetch={false}
                >
                  {dictionary.navigationList.services}
                </Link>
              </li>

              <li>
                <Link
                  href={`#${APP_SECTIONS.projects}`}
                  onClick={closeMenu}
                  className="block py-4 font-medium hover:text-primary"
                  prefetch={false}
                >
                  {dictionary.navigationList.work}
                </Link>
              </li>

              <li>
                <Link
                  href={`#${APP_SECTIONS.benefits}`}
                  onClick={closeMenu}
                  className="block py-4 font-medium hover:text-primary"
                  prefetch={false}
                >
                  {dictionary.navigationList.about}
                </Link>
              </li>

              <li>
                <Link
                  href={`#${APP_SECTIONS.contact}`}
                  onClick={closeMenu}
                  className="block py-4 font-medium hover:text-primary"
                  prefetch={false}
                >
                  {dictionary.navigationList.contact}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      }
    </>
  );
}
