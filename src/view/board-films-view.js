import { createElement } from '../render.js';

function createBoardFilmsTemplate() {
  return '<section class="films"></section>';
}

export default class BoardFilmsView {
  getTemplate() {
    return createBoardFilmsTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
