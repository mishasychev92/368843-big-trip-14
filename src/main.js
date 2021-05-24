import SiteMenuView from './view/site-menu.js';
import BoardPresenter from './presenter/board.js';
import FilterPresenter from './presenter/filter.js';
import EventsModel from './model/events.js';
import FilterModel from './model/filter.js';
import OffersModel from './model/offers.js';
import DestinationsModel from './model/destinations.js';
import {generatePoints, availableDestinations} from './mock/event-data.js';
import {availableOffers} from './mock/offers-data.js';
import {render, RenderPosition} from './utils/render.js';
import {sortEventsByDate} from './utils/event.js';

const events = generatePoints().sort(sortEventsByDate);

const eventsModel = new EventsModel();
eventsModel.setEvents(events);

const filterModel = new FilterModel();

const offersModel = new OffersModel();
offersModel.setOffers(availableOffers);

const destinationsModel = new DestinationsModel();
destinationsModel.setDestinations(availableDestinations);

const siteMenuContainer = document.querySelector('.trip-controls__navigation');
const tripInfoContainer = document.querySelector('.trip-main');
const filtersContainer = document.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('.trip-events');

const boardPresenter = new BoardPresenter(eventsContainer, tripInfoContainer, eventsModel, filterModel, offersModel, destinationsModel);
const filterPresenter = new FilterPresenter(filtersContainer, filterModel, eventsModel);

render(siteMenuContainer, new SiteMenuView(), RenderPosition.BEFOREEND);

boardPresenter.init();
filterPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  boardPresenter.createEvent(evt.target);
});
