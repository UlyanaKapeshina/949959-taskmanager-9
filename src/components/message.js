import AbstractComponent from "./abstract-component.js";

export default class Message extends AbstractComponent {

  getTemplate() {
    return `<p class="board__no-tasks">
    Congratulations, all tasks were completed! To create a new click on
    «add new task» button.
  </p>`;
  }
}
