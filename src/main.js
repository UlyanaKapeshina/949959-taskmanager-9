import Menu from "./components/menu.js";
import Search from "./components/search.js";
import Filters from "./components/filters.js";
import Board from "./components/board";
import BoardFilters from "./components/board-filters";
import Task from "./components/task";
import TaskEdit from "./components/task-edit";
import Button from "./components/button";
import Message from "./components/message";
import {
  getCardsData,
  getFiltersData,
  isActiveCards,
  COLORS
} from "./data.js";

import {
  render,
  remove,
  Position,

} from "./util.js";

const CARD_COUNT = 18;
const CARD_LOAD_COUNT = 8;
let showCards = CARD_LOAD_COUNT;
const main = document.querySelector(`.main`);
const cardsData = getCardsData(CARD_COUNT);
const filtersData = getFiltersData(cardsData);

const renderMenu = () => {
  const menu = new Menu();
  render(main.querySelector(`.main__control`), menu.getElement(), Position.BEFOREEND); // добавление меню
};
const renderSearch = () => {
  const search = new Search();
  render(main, search.getElement(), Position.BEFOREEND); // добавление поиска
};
const renderFilters = () => {
  const filters = new Filters(filtersData);
  render(main, filters.getElement(), Position.BEFOREEND); // добавление фильтров
};
const renderBoard = () => {
  const board = new Board();
  render(main, board.getElement(), Position.BEFOREEND);
  return board.getElement();
};
const renderBoardFilters = () => {
  const boardFilters = new BoardFilters();
  render(boardContainer, boardFilters.getElement(), Position.AFTERBEGIN);
};

const renderTask = (taskMock, container, colors) => {
  const task = new Task(taskMock);
  const taskElement = task.getElement();
  const taskEdit = new TaskEdit(taskMock, colors);
  const taskEditElement = taskEdit.getElement();

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      container.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };
  taskElement.querySelector(`.card__text`).addEventListener(`blur`, () => {
    document.addEventListener(`keydown`, onEscKeyDown);
  });
  taskEditElement.querySelector(`.card__text`).addEventListener(`focus`, () => {
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  taskElement.querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
    container.replaceChild(taskEditElement, taskElement);
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskEditElement.querySelector(`.card__form`).addEventListener(`submit`, () => {
    container.replaceChild(taskElement, taskEditElement);
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(container, task.getElement(), Position.BEFOREEND);
};

const renderTasks = (cards, countStart, countEnd, container, colors) => {
  cards.slice(countStart, countEnd).forEach((card) => renderTask(card, container, colors));
};

const renderButton = () => {
  const button = new Button();
  const buttonElement = button.getElement();
  const onLoadMoreButtonClick = () => {
    renderTasks(cardsData, showCards, (showCards + CARD_LOAD_COUNT), tasksContainer, COLORS);
    showCards = showCards + CARD_LOAD_COUNT;
    if (showCards >= CARD_COUNT) {
      remove(buttonElement);
    }
  };
  buttonElement.addEventListener(`click`, onLoadMoreButtonClick);
  render(boardContainer, buttonElement, Position.BEFOREEND);
};
const renderMessage = () => {
  const message = new Message();
  render(tasksContainer, message.getElement(), Position.BEFOREEND);
};

renderMenu();
renderSearch();
renderFilters();
const boardContainer = renderBoard();
const tasksContainer = boardContainer.querySelector(`.board__tasks`);

if (isActiveCards(cardsData)) {
  renderBoardFilters();
  renderTasks(cardsData, 0, CARD_LOAD_COUNT, tasksContainer, COLORS);
  renderButton();
} else {
  renderMessage(cardsData);
}
