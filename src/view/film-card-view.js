import dayjs from 'dayjs';
import Duration from 'dayjs/plugin/duration';
import AbstractView from '../framework/view/abstract-view.js';

dayjs.extend(Duration);

function createFilmCardTemplate(film) {
  const { title, totalRating, release, genre, poster, descriptions } = film.filmInfo;
  const { alreadyWatched, favorite, watchlist } = film.userDetails;

  const releaseDate = release.date.toISOString();
  const filmDuration = dayjs.duration(film.filmInfo.duration, 'minutes');

  return `
        <article class="film-card">
          <a class="film-card__link">
            <h3 class="film-card__title">${title}</h3>
            <p class="film-card__rating">${totalRating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${dayjs(releaseDate).format('YYYY')}</span>
              <span class="film-card__duration">${filmDuration.format('H[h] mm[m]')}</span>
              <span class="film-card__genre">${genre.join(', ')}</span>
            </p>
            <img src="./${poster}" alt="" class="film-card__poster">
            <p class="film-card__description">${descriptions}</p>
            <span class="film-card__comments">${film.comments.length} ${film.comments.length === 1 ? 'comment' : 'comments'}</span>
          </a>
          <div class="film-card__controls">
            <button class="film-card__controls-item ${watchlist ? 'film-card__controls-item--active' : ''} film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
            <button class="film-card__controls-item ${alreadyWatched ? 'film-card__controls-item--active' : ''} film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
            <button class="film-card__controls-item ${favorite ? 'film-card__controls-item--active' : ''} film-card__controls-item--favorite" type="button">Mark as favorite</button>
          </div>
        </article>`;
}

export default class FilmCardView extends AbstractView {
  #film = null;

  constructor(film) {
    super();

    this.#film = film;
  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }
}
