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

// создание массива объектов с данными задач

export const getCardsData = (count) => {
  return new Array(count).fill(``).map(getTask);
};

// Преобразование массива с задач в разметку карточек
export const getCardsTemplate = (count) => {
  return getCardsData(count).slice(1).map(getCardTemplate).join(``);
};

// Создание всего борда с карточками и сортировкой
export const getBoard = (count) => `<section class="board container">
${getBoardFiltersTemplate()}
<div class="board__tasks">
${getTaskFormTemplate(getCardsData(count)[1])}
${getCardsTemplate(count)}
</div>
${getLoadMoreButtonTemplate()}
</section>`;
