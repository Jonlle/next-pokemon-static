import { useRouter } from 'next/router';
import Image from 'next/image';
import NextLink from 'next/link';
import { Navbar, Text } from '@nextui-org/react';

export const NavbarApp = () => {
  const { asPath } = useRouter();

  return (
    <>
      <Navbar isBordered>
        {/* <LinkApp href={'/'}> */}
        <Navbar.Brand
          href={'/'}
          as={NextLink}>
          <Image
            src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png'}
            alt='icono de la app'
            width={70}
            height={70}
          />
          <Text
            h2
            hideIn='xs'>
            P
          </Text>
          <Text
            h3
            hideIn='xs'>
            okemon
          </Text>
        </Navbar.Brand>
        {/* </LinkApp> */}
        <Navbar.Content hideIn='xs'>
          <Navbar.Link
            href={'/favorites'}
            as={NextLink}
            isActive={asPath === '/favorites'}>
            Favoritos
          </Navbar.Link>
          {/* <Navbar.Link href='#'>Pricing</Navbar.Link> */}
        </Navbar.Content>
      </Navbar>
    </>
  );
};
