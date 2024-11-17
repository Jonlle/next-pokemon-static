import { Other } from '../interfaces/pokemon-full';

export const getSpriteImages = (spritesOther: Other): string[] => {
  const images: string[] = [];

  Object.entries(spritesOther).forEach(([sectionKey, sectionValue]) => {
    if (sectionKey === 'showdown') return;

    if (sectionValue && typeof sectionValue === 'object') {
      Object.values(sectionValue).forEach((imageUrl) => {
        if (typeof imageUrl === 'string') images.push(imageUrl);
      });
    }
  });

  return images;
};
