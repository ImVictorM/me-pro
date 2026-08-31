import Link from "next/link";
import { getDictionary } from "./dictionaries";

export default async function Home() {
  const dict = await getDictionary();

  return (
    <div>
      <header>
        <div>
          <p>{dict.header.name}</p>
        </div>

        <div>
          <nav>
            <ul>
              <li>
                <Link prefetch={false} href="#">
                  {dict.header.navigationList.work}
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="#">
                  {dict.header.navigationList.services}
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="#">
                  {dict.header.navigationList.about}
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="#">
                  {dict.header.navigationList.contact}
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="#">
                  {dict.header.navigationList.faq}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div>
          <button>Começar um projeto</button>
        </div>
      </header>

      <main></main>
    </div>
  );
}
