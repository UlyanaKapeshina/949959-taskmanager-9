const TIME_IN_MS = 60 * 60 * 24 * 1000;

// случайное целое число из диапазона
export const getRandomInteger = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

// дата в диапазоне от сегодняшнего
export const getRandomDate = (days) => {
  return Date.now() + (getRandomInteger(-days, days)) * TIME_IN_MS;
};

// случайное булево значение
export const getRandomBoolean = () => {
  return Boolean(Math.round(Math.random()));
};

// случайный элемент из массива
export const getRandomElement = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

// массив случайных элементов из набора
export const getRandomArray = (min, max, array) => {
  const newArray = [];
  const newArrayLength = getRandomInteger(min, max);
  for (let i = 0; i < newArrayLength; i++) {
    newArray.push(getRandomElement(array));
  }
  return newArray;
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

// Рендер и анрендер для компонент

export const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const render = (container, element, place) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
  }
};

export const remove = (element) => {
  if (element) {
    element.remove();
  }
}
