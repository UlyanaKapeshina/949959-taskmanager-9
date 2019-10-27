import Task from "./../components/task";
import TaskEdit from "./../components/task-edit";
import Button from "./../components/button";
import Board from "./../components/board";
import Message from "./../components/message";

import BoardFilters from "./../components/board-filters";
import {
  COLORS,
  isActiveCards
} from "./../data.js";
import {
  render,
  remove,
  Position,

} from "./../util.js";
const CARD_COUNT = 18;
const CARD_LOAD_COUNT = 8;
let showCards = CARD_LOAD_COUNT;

export default class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._board = new Board();
    this._button = new Button();
    this._boardFilters = new BoardFilters();
  }
  init() {
    render(this._container, this._board.getElement(), Position.BEFOREEND);

    if (isActiveCards(this._tasks)) {
      render(this._board.getElement(), this._boardFilters.getElement(), Position.AFTERBEGIN);
      this._renderTasks(this._tasks, 0, CARD_LOAD_COUNT, this._board.getElement().querySelector(`.board__tasks`), COLORS);
      this._renderButton(this._board.getElement());

    } else {
      this._renderMessage(this._container);
    }
  }


  _renderTask(taskMock, container, colors) {
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
  }

  _renderTasks(cards, countStart, countEnd, container, colors) {
    cards.slice(countStart, countEnd).forEach((card) => this._renderTask(card, container, colors));
  }
  _renderMessage(container) {
    const message = new Message();
    render(container, message.getElement(), Position.BEFOREEND);
  }

  _renderButton(container) {
    const buttonElement = this._button.getElement();
    const onLoadMoreButtonClick = () => {
      this._renderTasks(this._tasks, showCards, (showCards + CARD_LOAD_COUNT), this._board.getElement().querySelector(`.board__tasks`), COLORS);
      showCards = showCards + CARD_LOAD_COUNT;
      if (showCards >= CARD_COUNT) {
        remove(buttonElement);
      }
    };
    buttonElement.addEventListener(`click`, onLoadMoreButtonClick);
    render(container, buttonElement, Position.BEFOREEND);
  }
}
