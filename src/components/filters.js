import AbstractComponent from "./abstract-component.js";

export default class Filters extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
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
