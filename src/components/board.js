import {
  getBoardFiltersTemplate
} from "./components/board-filters.js";
import {
  getTaskFormTemplate
} from "./components/task-form.js";
import {
  getCardTemplate
} from "./components/card.js";
import {
  getLoadMoreButtonTemplate
} from "./components/button.js";
import {
  getTask
} from "./data.js";

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
