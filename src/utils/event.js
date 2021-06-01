import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export const formatDate = (date, format) => {
  return dayjs(date).format(format);
};

export const getTimeDuration = (fromDate, toDate) => {
  const startDate = dayjs(fromDate);
  const endDate = dayjs(toDate);

  return endDate.diff(startDate);
};

export const getTypeOffers = (availableOffers, currentType) => {
  return availableOffers.find(({type}) => type === currentType).offers;
};

export const formateDuration = (difference) => {
  const timeDuration = dayjs.duration(difference);

  if (timeDuration.asMinutes() < 60) {
    return timeDuration.format('mm[M]');
  }

  if (timeDuration.asHours() < 24) {
    return timeDuration.format('HH[H] mm[M]');
  }

  return timeDuration.format('DD[D] HH[H] mm[M]');
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

const getWeightForNullValue = (valueA, valueB) => {
  if (valueA === null && valueB === null) {
    return 0;
  }

  if (valueA === null) {
    return 1;
  }

  if (valueB === null) {
    return -1;
  }

  return null;
};

export const sortEventsByDate = (eventA, eventB) => {
  const weight = getWeightForNullValue(eventA.fromDate, eventB.fromDate);

  if (weight !== null) {
    return weight;
  }

  return eventA.fromDate - eventB.fromDate;
};

export const sortEventsByToDate = (eventA, eventB) => {
  const weight = getWeightForNullValue(eventA.toDate, eventB.toDate);

  if (weight !== null) {
    return weight;
  }

  return eventA.toDate - eventB.toDate;
};

export const sortEventsByTime = (eventA, eventB) => {
  const durationOfEventA = dayjs(eventA.toDate).diff(dayjs(eventA.fromDate));
  const durationOfEventB = dayjs(eventB.toDate).diff(dayjs(eventB.fromDate));

  const weight = getWeightForNullValue(durationOfEventA, durationOfEventB);

  if (weight !== null) {
    return weight;
  }

  return durationOfEventB - durationOfEventA;
};

export const sortEventsByPrice = (eventA, eventB) => {
  const weight = getWeightForNullValue(eventA.price, eventB.price);

  if (weight !== null) {
    return weight;
  }

  return eventB.price - eventA.price;
};
