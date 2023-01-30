import { render } from '../render.js';
import BoardFilmsView from '../view/board-films-view.js';
import FilmCardView from '../view/film-card-view.js';
import ListFilmsContainerView from '../view/list-films-container-view.js';
import ListFilmsView from '../view/list-films-view.js';
import PopupView from '../view/popup-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';

export default class BoardPresenter {
  boardComponent = new BoardFilmsView();
  filmListComponent = new ListFilmsView();
  filmListContainer = new ListFilmsContainerView();

  constructor({ boardContainer }) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(this.boardComponent, this.boardContainer);
    render(this.filmListComponent, this.boardComponent.getElement());
    render(this.filmListContainer, this.filmListComponent.getElement());

    for (let i = 0; i < 5; i++) {
      render(new FilmCardView(), this.filmListContainer.getElement());
    }

    render(new ShowMoreButtonView(), this.filmListComponent.getElement());

    render(new PopupView(), document.body);
  }
}
