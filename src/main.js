import BoardPresenter from './presenter/board-presenter.js';
import { render } from './render.js';
import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';

const siteMain = document.querySelector('.main');
const boardPresenter = new BoardPresenter({ boardContainer: siteMain });

render(new FilterView(), siteMain);
render(new SortView(), siteMain);

boardPresenter.init();
