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

// Создание массива карточек
const getCards = (count) => {
  return new Array(count).fill(``).map(getTask).map(getCardTemplate).join(``);
};

// Создание всего борда с карточками и сортировкой
export const getBoard = (count) => ` <section class="board container">
${getBoardFiltersTemplate()}
<div class="board__tasks">
${getTaskFormTemplate()}
${getCards(count)}
</div>
${getLoadMoreButtonTemplate()}
</section>`;
