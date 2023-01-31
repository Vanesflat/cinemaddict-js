import { createFilmsList } from '../mock/film.js';

const FILMS_COUNT = 5;

export default class FilmsModel {
  #films = createFilmsList(FILMS_COUNT);

  get films() {
    return this.#films;
  }
}
