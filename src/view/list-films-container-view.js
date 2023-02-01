import AbstractView from '../framework/view/abstract-view.js';

function createListFilmsContainerTemplate() {
  return '<div class="films-list__container"></div>';
}

export default class ListFilmsContainerView extends AbstractView {

  get template() {
    return createListFilmsContainerTemplate();
  }
}
