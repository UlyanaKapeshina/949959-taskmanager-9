const CARD_QUANTITY = 3;

import {getMenuTemplate} from "./components/menu.js";
import {getSearchTemplate} from "./components/search.js";
import {getFiltersTemplate} from "./components/filters.js";
import {getBoardFiltersTemplate} from "./components/board-filters.js";
import {getTaskFormTemplate} from "./components/task-form.js";
import {getCardTemplate} from "./components/card.js";
import {getLoadMoreButtonTemplate} from "./components/button.js";

// функция добавления компонент в разметку

const renderComponent = function (container, component) {
  return container.insertAdjacentHTML(`beforeend`, component);
};

const main = document.querySelector(`.main`);

// const getCards = (count) => {
//   const cards = [];
//   for (let i = 0; i < count; i++) {
//     cards.push(getCardTemplate());
//   }
//   return cards.join(``);
// };

const getCards = (count) => {
  const cards = new Array(count).fill(getCardTemplate()).join(``);
  return cards;
};

const getBoard = (count) => ` <section class="board container">
${getBoardFiltersTemplate()}
<div class="board__tasks">
${getTaskFormTemplate()}
${getCards(count)}
</div>
${getLoadMoreButtonTemplate()}
</section>`;

// добавление компонент в разметку

renderComponent(main.querySelector(`.main__control`), getMenuTemplate()); // добавление меню
renderComponent(main, getSearchTemplate()); // добавление поиска
renderComponent(main, getFiltersTemplate()); // добавление фильтров
renderComponent(main, getBoard(CARD_QUANTITY)); // добавление контейнера для карточек
