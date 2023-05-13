import { useEffect, useState } from 'react';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { Button, Card, Container, Grid, Image, Row, Text } from '@nextui-org/react';

import { pokeApi } from '../../api';
import { Layout } from '../../components/layouts';
import { Pokemon, PokemonListResponse } from '../../interfaces';
import { getPokemonInfo, localFavorites } from '../../utils';
import confetti from 'canvas-confetti';

interface Props {
  pokemon: Pokemon;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
  const { id, name, sprites } = pokemon;
  const [isInFavorites, setIsInFavorites] = useState(false);
  const img =
    sprites.other?.dream_world.front_default ||
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/152.svg';

  const handleToggleFavorite = () => {
    localFavorites.toggleFavorite(id);
    setIsInFavorites(!isInFavorites);

    if (isInFavorites) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: { x: 1, y: 0 },
    });
  };

  useEffect(() => {
    setIsInFavorites(localFavorites.existInFavorites(id));
  }, []);

  return (
    <Layout title='Algun pokemon'>
      <Grid.Container
        css={{ marginTop: '5px' }}
        gap={2}>
        <Grid
          xs={12}
          sm={4}>
          <Card
            isHoverable
            css={{ padding: '30px' }}>
            <Card.Body css={{ p: 0 }}>
              <Card.Image
                src={img}
                width='100%'
                height={'200px'}
                alt={name}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid
          xs={12}
          sm={8}>
          <Card>
            <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
              <Row
                wrap='wrap'
                justify='space-between'
                align='center'>
                <Text
                  h1
                  transform='capitalize'>
                  {name}
                </Text>
                <Button
                  color={'gradient'}
                  bordered={isInFavorites}
                  onClick={handleToggleFavorite}>
                  {isInFavorites ? 'Eliminar de favoritos' : 'Guardar en favoritos'}
                </Button>
              </Row>
            </Card.Header>

            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container
                direction='row'
                display='flex'
                gap={0}>
                <Image
                  src={sprites.front_default}
                  alt={name}
                  width={100}
                  height={100}
                />
                <Image
                  src={sprites.back_default}
                  alt={name}
                  width={100}
                  height={100}
                />
                <Image
                  src={sprites.front_shiny}
                  alt={name}
                  width={100}
                  height={100}
                />
                <Image
                  src={sprites.back_shiny}
                  alt={name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

type PathParams = {
  name: string;
};

type Paths = {
  params: PathParams;
}[];

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
  const paths: Paths = data.results.map((pokemon, index) => ({
    params: { name: pokemon.name },
  }));

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };

  return {
    props: {
      pokemon: await getPokemonInfo(name),
    },
  };
};

export default PokemonByNamePage;
