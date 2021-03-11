import Link from 'next/link';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <div>
      <header>
        <nav>
          <Link href="/">
            <a>NRTH Blog</a>
          </Link>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <span>Northern Order {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}
