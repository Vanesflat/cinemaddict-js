import { createElement } from '../render.js';

function createBoardFilmsTemplate() {
  return '<section class="films"></section>';
}

export default class BoardFilmsView {
  #element = null;

  get template() {
    return createBoardFilmsTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
