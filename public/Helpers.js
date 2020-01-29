// Methods for creating random item sizes

export const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
