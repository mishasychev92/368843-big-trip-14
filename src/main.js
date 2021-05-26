import SiteMenuView from './view/site-menu.js';
import StatsView from './view/stats.js';
import BoardPresenter from './presenter/board.js';
import FilterPresenter from './presenter/filter.js';
import EventsModel from './model/events.js';
import FilterModel from './model/filter.js';
import OffersModel from './model/offers.js';
import DestinationsModel from './model/destinations.js';
import {generatePoints, availableDestinations} from './mock/event-data.js';
import {availableOffers} from './mock/offers-data.js';
import {render, RenderPosition, remove} from './utils/render.js';
import {sortEventsByDate} from './utils/event.js';
import {MenuItem} from './const.js';

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
const statsContainer = document.querySelector('.page-main .page-body__container');
const buttonNewEvent = document.querySelector('.trip-main__event-add-btn');

const bodyContainers = Array.from(document.querySelectorAll('.page-body__container'));

const boardPresenter = new BoardPresenter(eventsContainer, tripInfoContainer, buttonNewEvent, eventsModel, filterModel, offersModel, destinationsModel);
const filterPresenter = new FilterPresenter(filtersContainer, filterModel, eventsModel);

const siteMenuComponent = new SiteMenuView();
render(siteMenuContainer, siteMenuComponent, RenderPosition.BEFOREEND);

boardPresenter.init();
filterPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();

  remove(statsComponent);
  boardPresenter.destroy();
  boardPresenter.init();

  boardPresenter.createEvent(evt.target);
});

let statsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      boardPresenter.init();
      filterPresenter.init();
      remove(statsComponent);
      siteMenuComponent.setMenuItem(MenuItem.TABLE);
      bodyContainers.forEach((container) => container.classList.remove('page-body__container--line-hidden'));
      break;
    case MenuItem.STATS:
      boardPresenter.destroy();
      filterPresenter.init(true);
      statsComponent = new StatsView(eventsModel.getEvents());
      render(statsContainer, statsComponent, RenderPosition.BEFOREEND);
      siteMenuComponent.setMenuItem(MenuItem.STATS);
      bodyContainers.forEach((container) => container.classList.add('page-body__container--line-hidden'));
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
