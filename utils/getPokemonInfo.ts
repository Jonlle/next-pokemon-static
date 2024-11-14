import { pokeApi } from '../api';
import { Pokemon } from '../interfaces';

export const getPokemonInfo = async (IdOrName: string) => {
  try {
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${IdOrName}`);

    return {
      id: data.id,
      name: data.name,
      sprites: data.sprites,
      types: data.types,
      stats: data.stats,
      weight: data.weight,
      height: data.height,
      base_experience: data.base_experience,
    };
  } catch (error) {
    return null;
  }
};
