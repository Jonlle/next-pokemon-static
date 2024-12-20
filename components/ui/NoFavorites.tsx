import { Container, Text, Image } from '@nextui-org/react';

export const NoFavorites = () => {
  return (
    <Container
      css={{
        height: 'calc(100vh - 100px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
      }}>
      <Text h1>There are no favorites</Text>
      <Image
        src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/152.svg'}
        width={250}
        height={250}
        css={{ opacity: 0.1 }}
      />
    </Container>
  );
};
