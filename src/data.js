import {
  getRandomElement
} from "./util.js";
import {
  getRandomArray
} from "./util.js";
import {
  getRandomDate
} from "./util.js";
import {
  getRandomBoolean
} from "./util.js";

const DAYS_COUNT = 7;
const TAGS_COUNT_MIN = 0;
const TAGS_COUNT_MAX = 3;

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
const emptyFilters = {
  all: 0,
  today: 0,
  overdue: 0,
  favorites: 0,
  repeating: 0,
  tags: 0,
  archive: 0,
};

const getCount = (cards) => {
  const sumOfCardsValues = cards.reduce((sum, card) => {
    sum.all += 1;
    sum.today += +(card.dueDate > date);
    sum.overdue += +(card.dueDate && card.dueDate < date);
    sum.favorites += +(card.isFavorite);
    sum.repeating += +(Object.keys(card.repeatingDays).some((day) => card.repeatingDays[day]));
    sum.tags += +(card.tags.size > 0);
    sum.archive += +(card.isArchive);
    return sum;
  }, emptyFilters);
  return sumOfCardsValues;
};
export const isActiveCards = (cards) => {
  const sumOfCardsValues = getCount(cards);
  return sumOfCardsValues.all && sumOfCardsValues.all !== sumOfCardsValues.archive;
};


// ф-я создания массива объектов с названиями фильтров и вычисленным количесвом карточек для данного фильтра
export const getFiltersData = (cards) => {
  const filters = [];
  const sumOfCardsValues = getCount(cards);
  const names = Object.keys(emptyFilters);
  names.map((name) => {
    const filter = {
      title: name,
      count: sumOfCardsValues[name],
    };
    filters.push(filter);
  });
  return filters;
};

// создание массива объектов с данными задач

export const getCardsData = (count) => {
  return new Array(count).fill(``).map(getTask);
};

