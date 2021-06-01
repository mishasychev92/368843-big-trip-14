import {formatDate, sortEventsByToDate} from '../utils/event.js';
import AbstractView from './abstract.js';

const getTripTitle = (events) => {
  const cities = events.map(({destination}) => destination.name);

  if (cities.length > 3) {
    return [cities.shift(), cities.pop()].join(' &mdash; ... &mdash; ');
  }

  return cities.join(' &mdash; ');
};

const getTripDates = (events) => {
  const fromDate = events[0].fromDate;
  const toDate = events.sort(sortEventsByToDate)[events.length - 1].toDate;

  return `${formatDate(fromDate, 'MMM DD')}&nbsp;&mdash;&nbsp;${formatDate(fromDate, 'MMM') === formatDate(toDate, 'MMM') ? formatDate(toDate, 'DD') : formatDate(toDate, 'MMM DD')}`;
};

const createTripInfoTemplate = (events) => {
  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${getTripTitle(events)}</h1>
    <p class="trip-info__dates">${getTripDates(events)}</p>
  </div>
  </section>`;
};

export default class TripInfo extends AbstractView {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return createTripInfoTemplate(this._events);
  }
}
