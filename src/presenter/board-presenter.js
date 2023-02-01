import { render } from '../framework/render.js';
import { isEscapeKey } from '../utils/film.js';
import BoardFilmsView from '../view/board-films-view.js';
import FilmCardView from '../view/film-card-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import ListFilmsContainerView from '../view/list-films-container-view.js';
import ListFilmsView from '../view/list-films-view.js';
import PopupView from '../view/popup-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';

const FILMS_COUNT_PER_STEP = 5;

export default class BoardPresenter {
  #boardContainer = null;
  #filmsModel = null;

  #boardComponent = new BoardFilmsView();
  #filmListComponent = new ListFilmsView();
  #filmListContainer = new ListFilmsContainerView();

  #loadMoreButtonComponent = null;

  #films = null;
  #renderedFilmsCount = FILMS_COUNT_PER_STEP;

  constructor({ boardContainer, filmsModel }) {
    this.#boardContainer = boardContainer;
    this.#filmsModel = filmsModel;
  }

  init() {
    this.#films = [...this.#filmsModel.films];

    render(this.#boardComponent, this.#boardContainer);
    render(this.#filmListComponent, this.#boardComponent.element);
    render(this.#filmListContainer, this.#filmListComponent.element);

    if (!this.#films.length) {
      this.#renderListEmptyMessage();
      return;
    }

    for (let i = 0; i < Math.min(this.#films.length, FILMS_COUNT_PER_STEP); i++) {
      this.#renderFilm(this.#films[i]);
    }

    if (this.#films.length > FILMS_COUNT_PER_STEP) {
      this.#loadMoreButtonComponent = new ShowMoreButtonView({
        onClick: this.#handleLoadMoreButtonClick
      });

      render(this.#loadMoreButtonComponent, this.#filmListComponent.element);
    }

  }

  #renderFilm(film) {
    const filmComponent = new FilmCardView({
      film: film,
      onEditClick: () => {
        replaceCardToPopup();
        document.addEventListener('keydown', escapeKeydownHandler);
      }
    });

    const popupComponent = new PopupView({
      film: film,
      onCloseButtonClick: () => {
        replacePopupToCard();
        document.removeEventListener('keydown', escapeKeydownHandler);
      }
    });

    function replaceCardToPopup() {
      document.body.appendChild(popupComponent.element);
      document.body.classList.add('hide-overflow');
    }

    function replacePopupToCard() {
      document.body.removeChild(popupComponent.element);
      document.body.classList.remove('hide-overflow');
    }

    function escapeKeydownHandler(evt) {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        replacePopupToCard();
        document.removeEventListener('keydown', escapeKeydownHandler);
      }
    }

    render(filmComponent, this.#filmListContainer.element);
  }

  #renderListEmptyMessage() {
    render(new ListEmptyView(), this.#filmListContainer.element);
  }

  #handleLoadMoreButtonClick = () => {
    this.#films.slice(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilm(film));

    this.#renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (this.#renderedFilmsCount >= this.#films.length) {
      this.#loadMoreButtonComponent.element.remove();
      this.#loadMoreButtonComponent.removeElement();
    }
  };
}
