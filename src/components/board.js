import {
  getBoardFiltersTemplate
} from "./board-filters.js";
import {
  getTaskFormTemplate
} from "./task-form.js";
import {
  getCardTemplate
} from "./card.js";
import {
  getLoadMoreButtonTemplate
} from "./button.js";
import {
  getTask
} from "./../data.js";

export const getCards = (count) => {
  return new Array(count).fill(``).map(getTask);
};
// Создание массива карточек
const getCardsTemplate = (count) => {
  return getCards(count).map(getCardTemplate).join(``);
};

// export const cards = getCards;

// Создание всего борда с карточками и сортировкой
export const getBoard = (count) => ` <section class="board container">
${getBoardFiltersTemplate()}
<div class="board__tasks">
${getTaskFormTemplate()}
${getCardsTemplate(count)}
</div>
${getLoadMoreButtonTemplate()}
</section>`;
