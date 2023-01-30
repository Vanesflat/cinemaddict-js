import { createElement } from '../render.js';

function createListFilmsContainerTemplate() {
  return '<div class="films-list__container"></div>';
}

export default class ListFilmsContainerView {
  getTemplate() {
    return createListFilmsContainerTemplate();
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
