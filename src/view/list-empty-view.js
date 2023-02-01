import { createElement } from '../render.js';

function createListEmptyTemplate() {
  return '<h2 class="films-list__title">There are no movies in our database</h2>';
}

export default class ListEmptyView {
  #element = null;

  get template() {
    return createListEmptyTemplate();
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
