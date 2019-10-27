import AbstractComponent from "./abstract-component.js";

export default class Board extends AbstractComponent {

  getTemplate() {
    return `<section class="board container">

    <div class="board__tasks">
    </div>
    </section>`;
  }
}
