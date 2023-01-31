import { createElement } from '../render.js';

function createListFilmsContainerTemplate() {
  return '<div class="films-list__container"></div>';
}

export default class ListFilmsContainerView {
  #element = null;

  get template() {
    return createListFilmsContainerTemplate();
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
