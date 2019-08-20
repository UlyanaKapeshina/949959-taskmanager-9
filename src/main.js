const CARD_COUNT = 18;
const CARD_LOAD_COUNT = 8;

import {
  getMenuTemplate
} from "./components/menu.js";
import {
  getSearchTemplate
} from "./components/search.js";
import {
  getFiltersContainer
} from "./components/filters.js";
import {
  getBoard
} from "./components/board";
import {
  getCardsData
} from "./data.js";
import {
  getCardsTemplate
} from "./components/board";

// функция добавления компонент в разметку
const renderComponent = function (container, component) {
  return container.insertAdjacentHTML(`beforeend`, component);
};

const main = document.querySelector(`.main`);
const cards = getCardsData(CARD_COUNT);

// добавление компонент в разметку
renderComponent(main.querySelector(`.main__control`), getMenuTemplate()); // добавление меню
renderComponent(main, getSearchTemplate()); // добавление поиска
renderComponent(main, getFiltersContainer(cards)); // добавление фильтров
renderComponent(main, getBoard(cards.slice(0, CARD_LOAD_COUNT))); // добавление контейнера скарточеками


const loadMoreButton = main.querySelector(`.load-more`);
const tasksBoard = main.querySelector(`.board__tasks`);

let SHOWN_CARDS = 0;
SHOWN_CARDS = SHOWN_CARDS + CARD_LOAD_COUNT;

const onLoadMoreButtonClick = () => {
  renderComponent(tasksBoard, getCardsTemplate(cards.slice(SHOWN_CARDS, (SHOWN_CARDS + CARD_LOAD_COUNT))));
  SHOWN_CARDS = SHOWN_CARDS + CARD_LOAD_COUNT;
  if (SHOWN_CARDS >= CARD_COUNT) {
    loadMoreButton.classList.add(`visually-hidden`);
    loadMoreButton.removeEventListener(`click`, onLoadMoreButtonClick);
  }
};


loadMoreButton.addEventListener(`click`, onLoadMoreButtonClick);

