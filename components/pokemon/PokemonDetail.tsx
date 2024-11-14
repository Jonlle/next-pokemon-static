import { Button, Card, Container, Grid, Image, Row, Text } from '@nextui-org/react';
import confetti from 'canvas-confetti';
import { useEffect, useState } from 'react';
import { Pokemon } from '../../interfaces';
import { localFavorites } from '../../utils';

interface Props {
  pokemon: Pokemon;
}

export const PokemonDetail: React.FC<Props> = ({ pokemon }) => {
  const { id, name, types, stats, weight, height, base_experience, sprites } = pokemon;
  const img = sprites.other?.dream_world.front_default || 'default-image-url.svg';
  const [isInFavorites, setIsInFavorites] = useState(false);

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
    <Grid.Container css={{ marginTop: '5px' }} gap={2}>
      <Grid xs={12} sm={4}>
        <Card isHoverable css={{ padding: '30px' }}>
          <Card.Body css={{ p: 0 }}>
            <Card.Image src={img} width='100%' height='200px' alt={name} />
          </Card.Body>
        </Card>
      </Grid>

      <Grid xs={12} sm={8}>
        <Card>
          <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
            <Row wrap='wrap' justify='space-between' align='center'>
              <Text h1 transform='capitalize'>
                {name}
              </Text>
              <Button color='gradient' bordered={isInFavorites} onClick={handleToggleFavorite}>
                {isInFavorites ? 'Remove from favorites' : 'Save to favorites'}
              </Button>
            </Row>
          </Card.Header>

          <Card.Body>
            <Text size={30} css={{ marginTop: '20px' }}>
              Galería de Sprites:
            </Text>
            <Container display='flex' direction='row' gap={1}>
              <Image src={sprites.front_default} alt={`${name} Front`} width={200} height={200} />
              <Image src={sprites.back_default} alt={`${name} Back`} width={200} height={200} />
              <Image src={sprites.front_shiny} alt={`${name} Front Shiny`} width={200} height={200} />
              <Image src={sprites.back_shiny} alt={`${name} Back Shiny`} width={200} height={200} />
            </Container>
            <Text size={30}>Information:</Text>
            <Container display='flex' direction='column' gap={1}>
              <Text>
                <strong>Type(s):</strong> {types.map((t) => t.type.name).join(', ')}
              </Text>
              <Text>
                <strong>Weight:</strong> {`${weight / 10} kg`}
              </Text>
              <Text>
                <strong>Height:</strong> {`${height / 10} m`}
              </Text>
              <Text>
                <strong>Base Experience:</strong> {base_experience}
              </Text>
            </Container>

            <Text size={30} css={{ marginTop: '20px' }}>
              Stats:
            </Text>
            <Container display='flex' direction='column' gap={1}>
              {stats.map((stat) => (
                <Text key={stat.stat.name}>
                  <strong>{stat.stat.name.replace('-', ' ').toUpperCase()}:</strong> {stat.base_stat}
                </Text>
              ))}
            </Container>
          </Card.Body>
        </Card>
      </Grid>
    </Grid.Container>
  );
};
