import dayjs from 'dayjs';
import { getRandomInteger } from '../utils/common';

const TimesRanges = {
  DAYS: {
    MIN: -3,
    MAX: 3
  },
  HOURS: {
    MIN: 1,
    MAX: 10
  },
  MINUTES: {
    MIN: 1,
    MAX: 59
  }
};

const getRandomDate = () =>
  dayjs().add(getRandomInteger(TimesRanges.DAYS.MIN, TimesRanges.DAYS.MAX), 'day')
    .add(getRandomInteger(TimesRanges.HOURS.MIN, TimesRanges.HOURS.MAX), 'hour')
    .add(getRandomInteger(TimesRanges.MINUTES.MIN, TimesRanges.MINUTES.MAX), 'minute');

export { getRandomDate };
