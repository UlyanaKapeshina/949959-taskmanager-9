import {createElement} from './../util.js'
export default class AbstractComponent {
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
  }
  getTemplate() {
    throw Error(`Abstract method not implemented`);
  }
}