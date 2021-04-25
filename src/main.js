import {createSiteMenuTemplate} from './view/site-menu.js';
import {createTripInfoTemplate} from './view/trip-info.js';
import {createTripCostTemplate} from './view/trip-cost.js';
import {createFiltersTemplate} from './view/filters.js';
import {createSortTemplate} from './view/sort.js';
import {createEventsListTemplate} from './view/events-list.js';
import {createEventEditTemplate} from './view/event-edit.js';
import {createEventTemplate} from './view/event.js';
import {generatePoint} from './mock/event-data.js';
import {generateFilter} from './mock/filters-data.js';

const EVENT_COUNT = 20;

const events = new Array(EVENT_COUNT)
  .fill()
  .map(generatePoint)
  .sort((eventA, eventB) => eventA.fromDate - eventB.fromDate);
const filters = generateFilter(events);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMenuContainer = document.querySelector('.trip-controls__navigation');
const tripInfoContainer = document.querySelector('.trip-main');
const filtersContainer = document.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('.trip-events');

render(siteMenuContainer, createSiteMenuTemplate(), 'beforeend');
render(tripInfoContainer, createTripInfoTemplate(events), 'afterbegin');
render(filtersContainer, createFiltersTemplate(filters), 'beforeend');
render(eventsContainer, createSortTemplate(), 'beforeend');
render(eventsContainer, createEventsListTemplate(), 'beforeend');

const tripInfo = tripInfoContainer.querySelector('.trip-main__trip-info');
const eventList = eventsContainer.querySelector('.trip-events__list');

render(tripInfo, createTripCostTemplate(events), 'beforeend');
render(eventList, createEventEditTemplate(events[0]), 'afterbegin');

for (let i = 1; i < EVENT_COUNT; i++) {
  render(eventList, createEventTemplate(events[i]), 'beforeend');
}
