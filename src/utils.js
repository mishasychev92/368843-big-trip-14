import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomArrayElement = (elements) => {
  return elements[getRandomInteger(0, elements.length - 1)];
};

export const getRandomArray = (elements , maxLength = elements.length) => {
  const shuffleElements = elements.slice();
  for (let i = shuffleElements.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffleElements[i], shuffleElements[j]] = [shuffleElements[j], shuffleElements[i]];
  }

  shuffleElements.length = getRandomInteger(0, maxLength);
  return shuffleElements;
};

export const formatDate = (date, format) => {
  return dayjs(date).format(format);
};

export const getTimeDuration = (fromDate, toDate) => {
  dayjs.extend(duration);
  const startDate = dayjs(fromDate);
  const endDate = dayjs(toDate);

  const difference = endDate.diff(startDate);
  const timeDuration = dayjs.duration(difference);

  if (endDate.diff(startDate, 'minute') < 60) {
    return timeDuration.format('mm[M]');
  } else if (endDate.diff(startDate, 'hour') < 24) {
    return timeDuration.format('HH[H] mm[M]');
  } else {
    return timeDuration.format('DD[D] HH[H] mm[M]');
  }
};

export const isDateExpired = (date) => {
  return dayjs().isAfter(dayjs(date), 'm');
};

export const isDateInFuture = (date) => {
  return dayjs().isBefore(dayjs(date), 'm');
};

export const isDateCurrent = (date) => {
  return dayjs().isSame(dayjs(date), 'm');
};
