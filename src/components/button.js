import AbstractComponent from "./abstract-component.js";

export default class Button extends AbstractComponent {

  getTemplate() {
    return `<button class="load-more" type="button">load more</button>`;
  }
}


