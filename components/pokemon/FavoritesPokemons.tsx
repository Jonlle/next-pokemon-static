import { Grid } from '@nextui-org/react';
import { FC } from 'react';
import { FavoritePokemonCard } from './FavoritePokemonCard';

interface Props {
  favoritePokemons: number[];
}

export const FavoritesPokemons: FC<Props> = ({ favoritePokemons }) => {
  return (
    <Grid.Container
      gap={2}
      direction='row'
      justify='flex-start'>
      {favoritePokemons.map((id: number) => (
        <FavoritePokemonCard
          key={id}
          pokemonId={id}
        />
      ))}
    </Grid.Container>
  );
};
