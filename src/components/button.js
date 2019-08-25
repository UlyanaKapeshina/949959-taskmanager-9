import {createElement} from "./../util.js";

export class Button {
  constructor() {
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
  getTemplate() {
    return `<button class="load-more" type="button">load more</button>`;
  }
}


