import dayjs from 'dayjs';

const isEscapeKey = (evt) => evt.key === 'Escape';

const sortByDate = (filmA, filmB) => dayjs(filmB.filmInfo.release.date).diff(dayjs(filmA.filmInfo.release.date));

const sortByRating = (filmA, filmB) => filmB.filmInfo.totalRating - filmA.filmInfo.totalRating;

export { isEscapeKey, sortByDate, sortByRating };
