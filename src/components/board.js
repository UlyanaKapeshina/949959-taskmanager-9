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


// Преобразование массива с задач в разметку карточек
export const getCardsTemplate = (cards) => {
  return cards.map(getCardTemplate).join(``);
};

// Создание всего борда с карточками и сортировкой
export const getBoard = (cards) => `<section class="board container">
${getBoardFiltersTemplate()}
<div class="board__tasks">
${getTaskFormTemplate(cards[0])}
${getCardsTemplate(cards.slice(1))}
</div>
${getLoadMoreButtonTemplate()}
</section>`;
