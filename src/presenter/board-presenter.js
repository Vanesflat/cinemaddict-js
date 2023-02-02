import { remove, render, RenderPosition } from '../framework/render.js';
import { updateItem } from '../utils/common.js';
import BoardFilmsView from '../view/board-films-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import ListFilmsContainerView from '../view/list-films-container-view.js';
import ListFilmsView from '../view/list-films-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import SortView from '../view/sort-view.js';
import FilmPresenter from './film-presenter.js';

const FILMS_COUNT_PER_STEP = 5;

export default class BoardPresenter {
  #boardContainer = null;
  #filmsModel = null;

  #boardComponent = new BoardFilmsView();
  #filmListComponent = new ListFilmsView();
  #filmListContainer = new ListFilmsContainerView();

  #showMoreButtonComponent = null;
  #sortComponent = new SortView();
  #listEmptyMessageComponent = new ListEmptyView();

  #films = null;
  #renderedFilmsCount = FILMS_COUNT_PER_STEP;
  #filmPresenter = new Map();

  constructor({ boardContainer, filmsModel }) {
    this.#boardContainer = boardContainer;
    this.#filmsModel = filmsModel;
  }

  init() {
    this.#films = [...this.#filmsModel.films];

    this.#renderBoard();
  }

  #renderFilm(film) {
    const filmPresenter = new FilmPresenter({
      filmListContainer: this.#filmListContainer.element,
      onDataChange: this.#handleFilmChange,
      onModeChange: this.#handleModeChange
    });

    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  }

  #renderFilms = (from, to) => {
    this.#films.slice(from, to)
      .forEach((film) => this.#renderFilm(film));
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#filmListComponent.element, RenderPosition.AFTERBEGIN);
  };

  #renderListEmptyMessage = () => {
    render(this.#listEmptyMessageComponent, this.#filmListContainer.element);
  };

  #renderShowMoreButton = () => {
    this.#showMoreButtonComponent = new ShowMoreButtonView({
      onClick: this.#handleLoadMoreButtonClick
    });

    render(this.#showMoreButtonComponent, this.#filmListComponent.element);
  };

  #renderFilmList = () => {
    render(this.#filmListComponent, this.#boardComponent.element);
    render(this.#filmListContainer, this.#filmListComponent.element);

    this.#renderFilms(0, Math.min(this.#films.length, FILMS_COUNT_PER_STEP));

    if (this.#films.length > FILMS_COUNT_PER_STEP) {
      this.#renderShowMoreButton();
    }
  };

  #clearFilmList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedFilmsCount = FILMS_COUNT_PER_STEP;
    remove(this.#showMoreButtonComponent);
  };

  #renderBoard = () => {
    render(this.#boardComponent, this.#boardContainer);

    if (!this.#films.length) {
      this.#renderListEmptyMessage();
      return;
    }

    this.#renderSort();
    this.#renderFilmList();

  };

  #handleModeChange = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleFilmChange = (updatedFilm) => {
    this.#films = updateItem(this.#films, updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm);
  };

  #handleLoadMoreButtonClick = () => {
    this.#films.slice(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilm(film));

    this.#renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (this.#renderedFilmsCount >= this.#films.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };
}
