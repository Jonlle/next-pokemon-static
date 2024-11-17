import { useEffect, useState } from 'react';
import { Button, Card, Container, Grid, Image, Progress, Row, Text } from '@nextui-org/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import confetti from 'canvas-confetti';
import { Pokemon } from '../../interfaces';
import { getSpriteImages, localFavorites } from '../../utils';
import 'swiper/css';
import 'swiper/css/navigation';

interface Props {
  pokemon: Pokemon;
}

export const PokemonDetail: React.FC<Props> = ({ pokemon }) => {
  const { id, name, types, stats, weight, height, base_experience, sprites } = pokemon;
  const [isInFavorites, setIsInFavorites] = useState(false);

  const images = sprites.other ? getSpriteImages(sprites.other) : [];
  const defaultImage = 'https://via.placeholder.com/200';

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
        <Card css={{ padding: '30px' }}>
          <Card.Body css={{ p: 0 }}>
            {images.length === 0 ? (
              <Card.Image src={defaultImage} width='100%' height='200px' alt={name} />
            ) : (
              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={10}
                slidesPerView={1}
                navigation
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                className='w-full'>
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <Card.Image src={image} height='200px' alt={`${name} sprite ${index}`} />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </Card.Body>
        </Card>
      </Grid>

      <Grid xs={12} sm={8}>
        <Card css={{ padding: '1rem' }}>
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
            <Text size={30}>Sprites:</Text>
            <Container direction='row' display='flex' gap={0}>
              <Image src={sprites.front_default} alt={name} />
              <Image src={sprites.back_default} alt={name} />
              <Image src={sprites.front_shiny} alt={name} />
              <Image src={sprites.back_shiny} alt={name} />
            </Container>

            <Text size={30} css={{ marginTop: '20px' }}>
              Information:
            </Text>
            <Container className='flex flex-col gap-2 md:flex-row'>
              <Text className='flex-grow'>
                <strong>Type(s):</strong> {types.map((t) => t.type.name)?.join(', ')}
              </Text>
              <Text className='flex-grow'>
                <strong>Weight:</strong> {`${weight / 10} kg`}
              </Text>
              <Text className='flex-grow'>
                <strong>Height:</strong> {`${height / 10} m`}
              </Text>
              <Text className='flex-grow'>
                <strong>Base Experience:</strong> {base_experience}
              </Text>
            </Container>

            <Text size={30} css={{ marginTop: '20px' }}>
              Stats:
            </Text>
            <Container className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
              {stats.map((stat) => (
                <Container key={stat.stat.name} className='p-0'>
                  <Text className='whitespace-nowrap'>
                    <strong>{stat.stat.name.replace('-', ' ').toUpperCase()}:</strong> {stat.base_stat}
                  </Text>
                  <Progress
                    value={stat.base_stat}
                    max={100}
                    css={{
                      marginTop: '4px',
                    }}
                  />
                </Container>
              ))}
            </Container>
          </Card.Body>
        </Card>
      </Grid>
    </Grid.Container>
  );
};
