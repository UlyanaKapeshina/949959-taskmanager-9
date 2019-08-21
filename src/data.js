const DAYS_COUNT = 7;
const TAGS_COUNT_MIN = 0;
const TAGS_COUNT_MAX = 3;
const TIME_IN_MS = 60 * 60 * 24 * 1000;
const DESCRIPTIONS = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
];
export const COLORS = [
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
const FILTER_NAMES = [
  `All`,
  `Overdue`,
  `Today`,
  `Favorites`,
  `Repeating`,
  `Tags`,
  `Archive`,
];

// случайное целое число из диапазона
const getRandomInteger = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);
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
  const newArrayLength = getRandomInteger(min, max);
  for (let i = 0; i < newArrayLength; i++) {
    newArray.push(getRandomElement(array));
  }
  return newArray;
};

export const getTask = () => {
  const isRepeat = getRandomBoolean();
  return {
    description: getRandomElement(DESCRIPTIONS),
    dueDate: isRepeat ? `` : getRandomDate(DAYS_COUNT),
    tags: new Set(getRandomArray(TAGS_COUNT_MIN, TAGS_COUNT_MAX, TAGS)),
    repeatingDays: {
      mo: false,
      tu: isRepeat,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false,
    },
    color: getRandomElement(COLORS),
    isFavorite: getRandomBoolean(),
    isArchive: getRandomBoolean(),
  };
};


const date = Date.now();

// создаем объект с расчетом количества карточек

const getCount = (cards) => {
  const emptyFilters = {
    all: 0,
    today: 0,
    overdue: 0,
    favorites: 0,
    repeating: 0,
    tags: 0,
    archive: 0,
  };
  let sumOfCardsValues = cards.reduce((sum, card) => {
    sum.all += 1;
    sum.today += +(card.dueDate > date);
    sum.overdue += +(card.dueDate && card.dueDate < date);
    sum.favorites += +(card.isFavorite);
    sum.repeating += +(Object.keys(card.repeatingDays).some((day) => card.repeatingDays[day]));
    sum.tags += +(card.tags.size > 0);
    sum.archive += +(card.isArchive);
    return sum;
  }, emptyFilters);

  // for (let i = 0; i < cards.length; i++) {
  //   let card = cards[i];
  //   sum.all += 1;
  //   sum.today += +(card.dueDate > date);
  //   sum.overdue += +(card.dueDate && card.dueDate < date);
  //   sum.favorites += +(card.isFavorite);
  //   sum.repeating += +(Object.keys(card.repeatingDays).some((day) => card.repeatingDays[day]));
  //   sum.tags += +(card.tags.size > 0);
  //   sum.archive += +(card.isArchive);
  // }
  return sumOfCardsValues;
};


// ф-я создания массива объектов с названиями фильтров и вычисленным количесвом карточек для данного фильтра
export const getFilters = (cards) => {
  const filters = [];
  // const sumOfCardsValues = getCount(cards);
  const sumOfCardsValues = getCount(cards);
  const counts = FILTER_NAMES.map((name) => sumOfCardsValues[name.toLocaleLowerCase()]);
  for (let i = 0; i < FILTER_NAMES.length; i++) {
    const filter = {
      title: FILTER_NAMES[i],
      count: counts[i],
    };
    filters.push(filter);
  }
  return filters;
};

// создание массива объектов с данными задач

export const getCardsData = (count) => {
  return new Array(count).fill(``).map(getTask);
};
