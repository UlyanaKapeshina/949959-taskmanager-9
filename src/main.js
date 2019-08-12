const CARD_QUANTITY = 3;

import {getMenuTemplate} from "./components/menu.js";
import {getSearchTemplate} from "./components/search.js";
import {getFiltersTemplate} from "./components/filters.js";
import {getBoardTemplate} from "./components/board.js";
import {getBoardFiltersTemplate} from "./components/board-filters.js";
import {getTaskFormTemplate} from "./components/task-form.js";
import {getCardTemplate} from "./components/card.js";
import {getLoadMoreButtonTemplate} from "./components/button.js";

// функция добавления компонент в разметку

const renderComponent = function (container, component) {
  return container.insertAdjacentHTML(`beforeend`, component());
};

const main = document.querySelector(`.main`);

// добавление компонент в разметку

renderComponent(main.querySelector(`.main__control`), getMenuTemplate); // добавление меню
renderComponent(main, getSearchTemplate); // добавление поиска
renderComponent(main, getFiltersTemplate); // добавление фильтров
renderComponent(main, getBoardTemplate); // добавление контейнера для карточек
renderComponent(main.querySelector(`.board`), getBoardFiltersTemplate); // добавление сортировки карточек
renderComponent(main.querySelector(`.board__tasks`), getTaskFormTemplate); // добавление формы редактирования задачи
for (let i = 0; i < CARD_QUANTITY; i++) {
  renderComponent(main.querySelector(`.board__tasks`), getCardTemplate); // добавление трех карточек
}
renderComponent(main.querySelector(`.board`), getLoadMoreButtonTemplate); // добавление кнопки загрузки карточек

