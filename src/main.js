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
} from "./components/board";
import {
  getCardsTemplate
} from "./components/board";

// функция добавления компонент в разметку
const renderComponent = function (container, component) {
  return container.insertAdjacentHTML(`beforeend`, component);
};

const main = document.querySelector(`.main`);

// добавление компонент в разметку
renderComponent(main.querySelector(`.main__control`), getMenuTemplate()); // добавление меню
renderComponent(main, getSearchTemplate()); // добавление поиска
renderComponent(main, getFiltersContainer(getCardsData(CARD_COUNT))); // добавление фильтров
renderComponent(main, getBoard(CARD_LOAD_COUNT)); // добавление контейнера скарточеками
const loadMoreButton = main.querySelector(`.load-more`);
let remainder = CARD_COUNT - CARD_LOAD_COUNT;
const onLoadMoreButtonClick = () => {
  while (remainder > CARD_LOAD_COUNT) {
    renderComponent(main.querySelector(`.board__tasks`), getCardsTemplate(CARD_LOAD_COUNT));
    remainder = remainder - CARD_LOAD_COUNT;
  }
  renderComponent(main.querySelector(`.board__tasks`), getCardsTemplate(remainder));
  loadMoreButton.classList.add(`visually-hidden`);
  loadMoreButton.removeEventListener(`click`, onLoadMoreButtonClick);


};
loadMoreButton.addEventListener(`click`, onLoadMoreButtonClick);
