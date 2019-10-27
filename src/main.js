import Menu from "./components/menu.js";
import Search from "./components/search.js";
import Filters from "./components/filters.js";

import {
  getCardsData,
  getFiltersData
} from "./data.js";

import {
  render,
  remove,
  Position,

} from "./util.js";
import BoardController from "./controllers/board-controller.js";

const CARD_COUNT = 18;
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

renderMenu();
renderSearch();
renderFilters();

const boardController = new BoardController(main, cardsData);
boardController.init();

