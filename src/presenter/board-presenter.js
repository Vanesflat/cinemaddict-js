import { render } from '../render.js';
import { isEscapeKey } from '../utils/film.js';
import BoardFilmsView from '../view/board-films-view.js';
import FilmCardView from '../view/film-card-view.js';
import ListFilmsContainerView from '../view/list-films-container-view.js';
import ListFilmsView from '../view/list-films-view.js';
import PopupView from '../view/popup-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';

export default class BoardPresenter {
  #boardContainer = null;
  #filmsModel = null;

  #boardComponent = new BoardFilmsView();
  #filmListComponent = new ListFilmsView();
  #filmListContainer = new ListFilmsContainerView();

  #films = null;

  constructor({ boardContainer, filmsModel }) {
    this.#boardContainer = boardContainer;
    this.#filmsModel = filmsModel;
  }

  init() {
    this.#films = [...this.#filmsModel.films];

    render(this.#boardComponent, this.#boardContainer);
    render(this.#filmListComponent, this.#boardComponent.element);
    render(this.#filmListContainer, this.#filmListComponent.element);

    for (let i = 0; i < this.#films.length; i++) {
      this.#renderFilm(this.#films[i]);
    }

    render(new ShowMoreButtonView(), this.#filmListComponent.element);

  }

  #renderFilm(film) {
    const filmComponent = new FilmCardView(film);
    const popupComponent = new PopupView(film);

    const replaceCardToPopup = () => {
      document.body.appendChild(popupComponent.element);
      document.body.classList.add('hide-overflow');
    };

    const replacePopupToCard = () => {
      document.body.removeChild(popupComponent.element);
      document.body.classList.remove('hide-overflow');
    };

    const escapeKeydownHandler = (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        replacePopupToCard();
        document.removeEventListener('keydown', escapeKeydownHandler);
      }
    };

    filmComponent.element.querySelector('.film-card__link').addEventListener('click', (evt) => {
      evt.preventDefault();
      replaceCardToPopup();
      document.addEventListener('keydown', escapeKeydownHandler);
    });

    popupComponent.element.querySelector('.film-details__close-btn').addEventListener('click', (evt) => {
      if (evt.target.closest('.film-details__top-container')) {
        evt.preventDefault();
        replacePopupToCard();
        document.removeEventListener('keydown', escapeKeydownHandler);
      }
    });

    render(filmComponent, this.#filmListContainer.element);
  }
}
