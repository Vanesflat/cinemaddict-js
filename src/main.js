import FilmsModel from './model/films-model.js';
import BoardPresenter from './presenter/board-presenter.js';
import { render } from './framework/render.js';
import FilterView from './view/filter-view.js';

const siteMain = document.querySelector('.main');
const filmsModel = new FilmsModel();

const boardPresenter = new BoardPresenter({
  boardContainer: siteMain,
  filmsModel
});

render(new FilterView(), siteMain);

boardPresenter.init();
