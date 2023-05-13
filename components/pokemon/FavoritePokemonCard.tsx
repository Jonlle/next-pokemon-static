import { FC } from 'react';
import { useRouter } from 'next/router';
import { Grid, Card } from '@nextui-org/react';

interface Props {
  pokemonId: number;
}

export const FavoritePokemonCard: FC<Props> = ({ pokemonId }) => {
  const router = useRouter();

  const handleClick = () => router.push(`/pokemon/${pokemonId}`);

  return (
    <Grid
      xs={6}
      sm={3}
      md={2}
      xl={1}
      onClick={handleClick}>
      <Card
        isHoverable
        isPressable
        css={{ padding: '30px' }}>
        <Card.Body css={{ p: 0 }}>
          <Card.Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
            width='100%'
            height={'140px'}
          />
        </Card.Body>
      </Card>
    </Grid>
  );
};
