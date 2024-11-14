import { GetStaticProps, GetStaticPaths, NextPage } from 'next';

import { pokeApi } from '../../api';
import { Layout } from '../../components/layouts';
import { Pokemon, PokemonListResponse } from '../../interfaces';
import { getPokemonInfo } from '../../utils';
import { PokemonDetail } from '../../components/pokemon';

interface Props {
  pokemon: Pokemon;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
  return (
    <Layout title={pokemon.name}>
      <PokemonDetail pokemon={pokemon} />
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
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };
  const pokemon = await getPokemonInfo(name);

  if (!pokemon) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {
      pokemon: pokemon,
    },
  };
};

export default PokemonByNamePage;
