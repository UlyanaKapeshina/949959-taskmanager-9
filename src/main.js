const CARD_QUANTITY = 10;

import {
  getMenuTemplate
} from "./components/menu.js";
import {
  getSearchTemplate
} from "./components/search.js";
import {
  getFiltersTemplate
} from "./components/filters.js";
import {
  getBoard
} from "./components/board";

// функция добавления компонент в разметку
const renderComponent = function (container, component) {
  return container.insertAdjacentHTML(`beforeend`, component);
};

const main = document.querySelector(`.main`);

// добавление компонент в разметку
renderComponent(main.querySelector(`.main__control`), getMenuTemplate()); // добавление меню
renderComponent(main, getSearchTemplate()); // добавление поиска
renderComponent(main, getFiltersTemplate()); // добавление фильтров
renderComponent(main, getBoard(CARD_QUANTITY)); // добавление контейнера скарточеками
