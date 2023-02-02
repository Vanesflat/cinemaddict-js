import { remove, render, replace } from '../framework/render.js';
import { isEscapeKey } from '../utils/film.js';
import FilmCardView from '../view/film-card-view.js';
import PopupView from '../view/popup-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  POPUP: 'POPUP'
};

export default class FilmPresenter {
  #filmListContainer = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #filmComponent = null;
  #popupComponent = null;

  #film = null;
  #mode = Mode.DEFAULT;

  constructor({ filmListContainer, onDataChange, onModeChange }) {
    this.#filmListContainer = filmListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(film) {
    this.#film = film;

    const prevFilmComponent = this.#filmComponent;
    const prevPopupComponent = this.#popupComponent;

    this.#filmComponent = new FilmCardView({
      film: this.#film,
      onEditClick: this.#handleEditClick,
      onAddToWatchlistClick: this.#handleAddToWatchlistClick,
      onAlreadyWatchedClick: this.#handleAlreadyWatchedClick,
      onFavoriteClick: this.#handleFavoriteClick
    });
    this.#popupComponent = new PopupView({
      film: film,
      onCloseButtonClick: this.#handlePopupCloseButtonClick,
      onAddToWatchlistClick: this.#handleAddToWatchlistClick,
      onAlreadyWatchedClick: this.#handleAlreadyWatchedClick,
      onFavoriteClick: this.#handleFavoriteClick
    });

    if (prevFilmComponent === null || prevPopupComponent === null) {
      render(this.#filmComponent, this.#filmListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#filmComponent, prevFilmComponent);
    }

    if (this.#mode === Mode.POPUP) {
      replace(this.#popupComponent, prevPopupComponent);
    }

    remove(prevFilmComponent);
    remove(prevPopupComponent);
  }

  destroy = () => {
    remove(this.#filmComponent);
    remove(this.#popupComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replacePopupToCard();
    }
  };

  #replaceCardToPopup = () => {
    document.body.appendChild(this.#popupComponent.element);
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#escapeKeydownHandler);
    this.#handleModeChange();
    this.#mode = Mode.POPUP;
  };

  #replacePopupToCard = () => {
    document.body.removeChild(this.#popupComponent.element);
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#escapeKeydownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #handlePopupCloseButtonClick = () => {
    this.#replacePopupToCard();
  };

  #handleEditClick = () => {
    this.#replaceCardToPopup();
  };

  #handleAddToWatchlistClick = () => {
    this.#handleDataChange({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        watchlist: !this.#film.userDetails.watchlist
      }
    });
  };

  #handleAlreadyWatchedClick = () => {
    this.#handleDataChange({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        alreadyWatched: !this.#film.userDetails.alreadyWatched
      }
    });
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        favorite: !this.#film.userDetails.favorite
      }
    });
  };

  #escapeKeydownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#replacePopupToCard();
    }
  };
}
