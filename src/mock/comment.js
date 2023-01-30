import { getRandomArrayElement, getRandomInteger } from '../utils/common.js';
import { getRandomDate } from './date.js';

const MIN_COMMENTS = 0;
const MAX_COMMENTS = 20;

const authors = ['Tim Macoveev', 'John Doe', 'Ilya O\'Reilly', 'Ivan Solovev', 'Olya Margiani', 'Mirko Mitkir'];
const commentText = [
  'Interesting setting and a good cast',
  'Booooooooooring',
  'Very very old. Meh',
  'Almost two hours? Seriously?',
  'A film that changed my life, a true masterpiece, post-credit scene was just amazing omg.'
];
const emotions = ['smile', 'sleeping', 'puke', 'angry'];

const createComment = (count) => ({
  id: count,
  author: getRandomArrayElement(authors),
  comment: getRandomArrayElement(commentText),
  date: getRandomDate(),
  emotion: getRandomArrayElement(emotions)
});

const createComments = () => Array.from({ length: getRandomInteger(MIN_COMMENTS, MAX_COMMENTS) }, (_, index) => createComment(index));

export { createComments };
