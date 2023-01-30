import { getRandomArrayElement, getRandomElementsArray, getRandomFractNumber, getRandomInteger } from '../utils/common.js';
import { createComments } from './comment.js';
import { getRandomDate } from './date';

const MIN_FILM_RATING = 0;
const MAX_FILM_RATING = 10;

const MIN_AGE_RATING = 0;
const MAX_AGE_RATING = 21;

const MIN_DURATION = 70;
const MAX_DURATION = 180;

const titles = [
  'The Dance of Life',
  'Sagebrush Trail',
  'The Man with the Golden Arm',
  'Santa Claus Conquers the Martians',
  'Popeye the Sailor Meets Sindbad the Sailor',
  'A Little Pony Without The Carpet'
];
const directors = [
  'Tom Ford',
  'Mitor Kotov',
  'Vanes Views',
  'Olya Marr',
  'Kolya Sinart',
  'Sanek Coconyan'
];
const writers = [
  'Takeshi Kitano',
  'Vlad Arabkaev',
  'Ivan Toropov',
  'Roman Suevalov'
];
const actors = [
  'Morgan Freeman',
  'Will Smit',
  'Alexandr Kovalchugov',
  'Mihail Kandibor'
];
const countries = [
  'USA',
  'Russia',
  'China',
  'Egypt',
  'Germany',
  'Japan',
  'Great Britain'
];
const genres = [
  'Comedy',
  'Drama',
  'Fantasy',
  'Cartoon',
  'Triller',
  'Detective',
  'Adventure'
];
const descriptions = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'
];
const imagesSrc = [
  'images/posters/made-for-each-other.png',
  'images/posters/popeye-meets-sinbad.png',
  'images/posters/sagebrush-trail.png',
  'images/posters/santa-claus-conquers-the-martians.png',
  'images/posters/the-dance-of-life.png',
  'images/posters/the-great-flamarion.png',
  'images/posters/the-man-with-the-golden-arm.png'
];

const comments = createComments();

const getRandomIdsArray = () => {
  const ids = [];
  const lengthOfArray = getRandomInteger(1, comments.length);
  while (ids.length < lengthOfArray) {
    const currentElement = getRandomInteger(0, comments.length);
    if (!ids.includes(currentElement)) {
      ids.push(currentElement);
    }
  }

  return ids;
};

const createRelease = () => ({
  date: getRandomDate(),
  releaseContry: getRandomArrayElement(countries)
});

const createFilmInfo = () => ({
  title: getRandomArrayElement(titles),
  alternativeTitle: `Title${getRandomInteger(20, 100)}`,
  totalRating: getRandomFractNumber(MIN_FILM_RATING, MAX_FILM_RATING, 1),
  poster: getRandomArrayElement(imagesSrc),
  ageRating: getRandomInteger(MIN_AGE_RATING, MAX_AGE_RATING),
  director: getRandomArrayElement(directors),
  writers: getRandomElementsArray(writers, getRandomInteger(1, 3)),
  actors: getRandomElementsArray(actors, getRandomInteger(1, 4)),
  release: createRelease(),
  duration: getRandomInteger(MIN_DURATION, MAX_DURATION),
  genre: getRandomElementsArray(genres, getRandomInteger(1, 3)),
  descriptions: getRandomElementsArray(descriptions, getRandomInteger(1, 5))
});

const createUserDetails = () => ({
  watchlist: Boolean(getRandomInteger(0, 1)),
  alreadyWatched: Boolean(getRandomInteger(0, 1)),
  watchingDate: getRandomDate(),
  favorite: Boolean(getRandomInteger(0, 1))
});

const createFilm = (count) => ({
  id: count,
  comments: getRandomIdsArray(),
  filmInfo: createFilmInfo(),
  userDetails: createUserDetails()
});

const createFilmsList = (count) => Array.from({ length: count }, (_, index) => createFilm(index));

export { createFilmsList };
