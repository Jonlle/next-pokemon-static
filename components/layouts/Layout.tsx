import { FC, ReactNode } from 'react';
import Head from 'next/head';

import { NavbarApp } from '../ui/Navbar';

type Props = {
  children?: ReactNode;
  title?: string;
};

export const Layout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || 'Pokemon app'}</title>
        <meta name='description' content={`Information about the Pokémon ${title}`} />
        <meta name='keywords' content={`${title}, pokemon, pokedex, pokedex pokemon, pokedex pokemon ${title}`} />
        <meta property='og:title' content={`Information about the Pokémon ${title}`} />
        <meta property='og:description' content={`This is the page about the Pokémon ${title}`} />
      </Head>
      <NavbarApp />

      <main>{children}</main>
    </>
  );
};
