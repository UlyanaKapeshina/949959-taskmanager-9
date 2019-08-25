import {createElement} from "./../util.js";

export class Filters {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    if (this._element) {
      this._element = null;
    }
    return this._element;
  }

  getFilter({title, count}) {
    return `<input
  type="radio"
  id="filter__${title.toLowerCase()}"
  class="filter__input visually-hidden"
  name="filter"
  ${title === `All` ? `checked` : ``}
  ${count === 0 ? `disabled` : ``}
/>
<label for="filter__${title.toLowerCase()}" class="filter__label">
  ${title} <span class="filter__${title.toLowerCase()}-count">${count}</span></label
>
`;
  }

  getTemplate() {
    return `<section class="main__filter filter container">
    ${this._filters.map((filter) => this.getFilter(filter)).join(``)}
    </section>`;
  }
}
