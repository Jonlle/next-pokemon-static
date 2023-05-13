import React from 'react';
import { Layout } from '../../components/layouts';

const PokemonPage = ({ pokemon }) => {
  return (
    <Layout title='Pokemon no encontrado'>
      <h1>No fue encontrado el pokemon</h1>
    </Layout>
  );
};

export default PokemonPage;
