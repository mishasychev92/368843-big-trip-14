import dayjs from 'dayjs';
import {getRandomInteger, getRandomArrayElement, getRandomArray} from '../utils/common.js';
import {EVENT_TYPES} from '../const.js';
import {generateOffers} from './offers-data.js';

const EVENT_COUNT = 20;

const generateCity = () => {
  const cities = [
    'Chamonix',
    'Geneva',
    'Amsterdam',
    'London',
    'Berlin',
    'Prague',
    'Helsinki',
    'Paris',
  ];

  return getRandomArrayElement(cities);
};

const generateDescription = () => {
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
    'In rutrum ac purus sit amet tempus.',
  ];

  return getRandomArray(descriptions, 5).join(' ');
};

const generatePictures = () => {
  const getPicture = () => {
    return {
      src: `http://picsum.photos/248/152?r=${Math.random()}`,
    };
  };

  return new Array(getRandomInteger(0, 5)).fill(null).map(getPicture);
};

const generateDestination = () => {
  return {
    name: generateCity(),
    description: generateDescription(),
    pictures: generatePictures(),
  };
};

const generatePoint = () => {
  const fromDate = dayjs()
    .add(getRandomInteger(-2, 2), 'day')
    .add(getRandomInteger(1, 10), 'hour')
    .add(getRandomInteger(1, 59), 'minute')
    .toDate();

  const toDate = dayjs(fromDate)
    .add(getRandomInteger(0, 1), 'day')
    .add(getRandomInteger(0, 6), 'hour')
    .add(getRandomInteger(1, 59), 'minute')
    .toDate();

  const type = getRandomArrayElement(Object.keys(EVENT_TYPES));

  return {
    destination: generateDestination(),
    price: getRandomInteger(2, 160) * 10,
    fromDate,
    toDate,
    type,
    offers: generateOffers(type),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};

export const generatePoints = () => {
  return new Array(EVENT_COUNT)
    .fill()
    .map(generatePoint);
};
