import Link from 'next/link';
import Head from 'next/head';
import { PropsWithChildren } from 'react';
import useDarkMode from 'use-dark-mode';

const Hamburger = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
    <path
      fillRule="evenodd"
      d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
    />
  </svg>
);

const Sun = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
  </svg>
);

const Moon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
    <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
  </svg>
);

const IconButton = ({ children, onClick }: PropsWithChildren<{ onClick?: () => void }>) => (
  <button
    className="h-8 w-8 self-center hover:bg-northone-lighter p-1 rounded-md focus:outline-none"
    onClick={onClick}
  >
    {children}
  </button>
);

const Nav = () => {
  const darkMode = useDarkMode(true, {
    classNameDark: 'dark',
    classNameLight: 'light',
    element: (process.browser && document.documentElement) || undefined,
  });

  return (
    <header className="p-4 w-screen md:w-2/3 lg:w-1/4 self-center lg:pb-12 xl:pb-20 lg:pt-8">
      <nav className="px-4 py-2 rounded-md text-center flex justify-between text-northtwo bg-northone shadow-sm transform transition ease-linear md:hover:shadow-md md:hover:scale-105">
        <IconButton>
          <Hamburger />
        </IconButton>
        <Link href="/">
          <a className="flex-grow inline text-xl font-bold leading-8 h-8 rounded-md">
            <img
              src="https://files.nrth.xyz/brand/logos/logo.png"
              alt="icon"
              className="inline w-8 h-8 rounded-full mr-2 mb-1"
            />
            NRTH Blog
          </a>
        </Link>
        <IconButton onClick={darkMode.toggle}>{darkMode.value ? <Moon /> : <Sun />}</IconButton>
      </nav>
    </header>
  );
};

const Footer = () => (
  <footer className="w-screen text-center p-2 lg:p-4 lg:mt-12 bg-gray-200 text-gray-900 dark:text-gray-300 dark:bg-gray-800">
    <span>© Northern Order {new Date().getFullYear()}</span>
  </footer>
);

export default function Layout({ children }: PropsWithChildren<any>) {
  return (
    <div className="h-full min-h-screen w-screen flex flex-col dark:bg-gray-900 bg-gray-300">
      <Head>
        <link rel="icon" href="https://files.nrth.xyz/brand/logos/logo.png" />
      </Head>
      <Nav />
      <div className="flex-grow h-full w-screen flex flex-col">
        <main className="w-screen md:w-5/6 lg:w-3/4 xl:w-2/3 2xl:w-1/2 flex-grow mx-auto px-4 mb-4">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
