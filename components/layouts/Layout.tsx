import { FC, ReactNode } from 'react';
import Head from 'next/head';

import { NavbarApp } from '../ui/Navbar';
import { useRouter } from 'next/router';

type Props = {
  children?: ReactNode;
  title?: string;
};

const origin = typeof window === 'undefined' ? '' : window.location.origin;

export const Layout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || 'Pokemon app'}</title>
        <meta
          name='author'
          content='Jhonatan Llerena'
        />
        <meta
          name='description'
          content={`Información sobre el pokemon ${title}`}
        />
        <meta
          name='keywords'
          content={`${title}, pokemon, pokedex, pokedex pokemon, pokedex pokemon ${title}`}
        />
        <meta
          property='og:title'
          content={`Información sobre el pokemon ${title}`}
        />
        <meta
          property='og:description'
          content={`Esta es la pagina sobre el pokemon ${title}`}
        />
        <meta
          property='og:image'
          content={`${origin}/img/banner.png`}
        />
      </Head>
      <NavbarApp />

      <main>{children}</main>
    </>
  );
};
