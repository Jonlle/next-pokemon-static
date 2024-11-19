import React from 'react';
import { Layout } from '../../components/layouts';

const PokemonPage = ({ pokemon }) => {
  return (
    <Layout title='Pokémon not found'>
      <h1>The pokémon was not found</h1>
    </Layout>
  );
};

export default PokemonPage;
