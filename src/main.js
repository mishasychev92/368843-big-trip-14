import {createSiteMenuTemplate} from './view/site-menu.js';
import {createTripInfoTemplate} from './view/trip-info.js';
import {createTripCostTemplate} from './view/trip-cost.js';
import {createFiltersTemplate} from './view/filters.js';
import {createSortTemplate} from './view/sort.js';
import {createEventsListTemplate} from './view/events-list.js';
import {createNewEventTemplate} from './view/new-event.js';
import {createEventEditTemplate} from './view/event-edit.js';
import {createEventTemplate} from './view/event.js';

const TASK_COUNT = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMenuContainer = document.querySelector('.trip-controls__navigation');
const tripInfoContainer = document.querySelector('.trip-main');
const filtersContainer = document.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('.trip-events');

render(siteMenuContainer, createSiteMenuTemplate(), 'beforeend');
render(tripInfoContainer, createTripInfoTemplate(), 'afterbegin');
render(filtersContainer, createFiltersTemplate(), 'beforeend');
render(eventsContainer, createSortTemplate(), 'beforeend');
render(eventsContainer, createEventsListTemplate(), 'beforeend');

const tripInfo = tripInfoContainer.querySelector('.trip-main__trip-info');
const eventList = eventsContainer.querySelector('.trip-events__list');

render(tripInfo, createTripCostTemplate(), 'beforeend');
render(eventList, createNewEventTemplate(), 'beforeend');
render(eventList, createEventEditTemplate(), 'beforeend');

for (let i = 0; i < TASK_COUNT; i++) {
  render(eventList, createEventTemplate(), 'beforeend');
}
