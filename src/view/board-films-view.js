import AbstractView from '../framework/view/abstract-view';

function createBoardFilmsTemplate() {
  return '<section class="films"></section>';
}

export default class BoardFilmsView extends AbstractView {
  get template() {
    return createBoardFilmsTemplate();
  }
}
