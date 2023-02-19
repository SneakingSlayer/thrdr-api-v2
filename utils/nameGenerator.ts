import { adjectives, animalNames } from "../fixtures/fixtures";

export const nameGenerator = (): string => {
  const randomAnimal =
    animalNames[Math.floor(Math.random() * animalNames.length)];
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNumber = Math.floor(Math.random() * 99);
  return randomAnimal + "-" + randomAdjective + "-" + randomNumber;
};
