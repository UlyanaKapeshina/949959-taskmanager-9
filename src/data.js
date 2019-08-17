const DAYS_COUNT = 7;
const TAGS_COUNT_MIN = 0;
const TAGS_COUNT_MAX = 3;
const TIME_IN_MS = 60 * 60 * 24 * 1000;
const DESCRIPTIONS = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
];
const COLORS = [
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`,
];

const TAGS = [
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`,
];

// случайное целое число из диапазона
const getRandomInteger = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

// дата в диапазоне от сегодняшнего
const getRandomDate = (days) => {
  return Date.now() + (getRandomInteger(-days, days)) * TIME_IN_MS;
};

// случайное булево значение
const getRandomBoolean = () => {
  return Boolean(Math.round(Math.random()));
};

// случайный элемент из массива
const getRandomElement = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

// массив случайных элементов из набора
const getRandomArray = (min, max, array) => {
  const newArray = [];
  for (let i = 0; i < getRandomInteger(min, max); i++) {
    newArray.push(getRandomElement(array));
  }
  return newArray;
};

export const getTask = () => ({
  description: getRandomElement(DESCRIPTIONS),
  dueDate: getRandomDate(DAYS_COUNT),
  tags: new Set(getRandomArray(TAGS_COUNT_MIN, TAGS_COUNT_MAX, TAGS)),
  repeatingDays: {
    mo: false,
    tu: getRandomBoolean(),
    we: false,
    th: false,
    fr: false,
    sa: false,
    su: false,
  },
  color: getRandomElement(COLORS),
  isFavorite: getRandomBoolean(),
  isArchive: getRandomBoolean(),
});
