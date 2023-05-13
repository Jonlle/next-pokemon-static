import { useRouter } from 'next/router';
import { FC } from 'react';
import { Grid, Card, Row, Text } from '@nextui-org/react';
import { SmallPokemon } from '../../interfaces';

interface Props {
  pokemon: SmallPokemon;
}

export const PokemonCard: FC<Props> = ({ pokemon }) => {
  const { id, name, img } = pokemon;
  const router = useRouter();

  const handleClick = () => router.push(`/name/${name}`);

  return (
    <Grid
      xs={6}
      sm={3}
      md={2}
      xl={1}>
      <Card
        isHoverable
        isPressable
        onClick={handleClick}>
        <Card.Body css={{ p: 0 }}>
          <Card.Image
            src={img}
            width='100%'
            height={140}
            alt={name}
          />
        </Card.Body>
        <Card.Footer>
          <Row
            wrap='wrap'
            justify='space-between'
            align='center'>
            <Text
              transform='capitalize'
              b>
              {name}
            </Text>
            <Text b>#{id}</Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
};
