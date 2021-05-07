import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

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
