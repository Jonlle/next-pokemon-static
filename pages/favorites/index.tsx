import { useEffect, useState } from 'react';
import { Layout } from '../../components/layouts';
import { FavoritesPokemons } from '../../components/pokemon';
import { NoFavorites } from '../../components/ui';
import { localFavorites } from '../../utils';

const FavoritesPage = () => {
  const [favoritePokemons, setfavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    const favorites = localFavorites.pokemons();
    setfavoritePokemons(favorites);
  }, []);

  return (
    <Layout title='Pokemon - Favoritos'>
      {favoritePokemons.length === 0 ? <NoFavorites /> : <FavoritesPokemons favoritePokemons={favoritePokemons} />}
    </Layout>
  );
};

export default FavoritesPage;
