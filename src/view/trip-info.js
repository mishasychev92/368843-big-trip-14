import {formatDate} from '../utils.js';

const getTripTitle = (events) => {
  const uniqueCities = new Set(events.map(({destination}) => destination.name));
  return Array.from(uniqueCities).join(' &mdash; ');
};

const getTripDates = (events) => {
  const fromDate = events[0].fromDate;
  const toDate = events[events.length - 1].toDate;

  return `${formatDate(fromDate, 'MMM DD')}&nbsp;&mdash;&nbsp;${formatDate(fromDate, 'MMM') === formatDate(toDate, 'MMM') ? formatDate(toDate, 'DD') : formatDate(toDate, 'MMM DD')}`;
};

export const createTripInfoTemplate = (events) => {
  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${getTripTitle(events)}</h1>
    <p class="trip-info__dates">${getTripDates(events)}</p>
  </div>
  </section>`;
};
