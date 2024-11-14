import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { Layout } from '../../components/layouts';
import { PokemonDetail } from '../../components/pokemon';
import { Pokemon } from '../../interfaces';
import { getPokemonInfo } from '../../utils';

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  return (
    <Layout title={pokemon.name}>
      <PokemonDetail pokemon={pokemon} />
    </Layout>
  );
};

type PathParams = {
  id: string;
};

type Paths = {
  params: PathParams;
}[];

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const paths: Paths = Array.from({ length: 151 }, (_, i) => ({
    params: { id: `${i + 1}` },
  }));

  return {
    paths: paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const pokemon = await getPokemonInfo(id);
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
    revalidate: 86400, // 60 * 60 * 24, 24horas
  };
};

export default PokemonPage;
