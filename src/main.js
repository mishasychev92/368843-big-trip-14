import SiteMenuView from './view/site-menu.js';
import FiltersView from './view/filters.js';
import BoardPresenter from './presenter/board.js';
import {generatePoints} from './mock/event-data.js';
import {generateFilter} from './mock/filters-data.js';
import {render, RenderPosition} from './utils/render.js';
import {sortEventsByDate} from './utils/event.js';

const events = generatePoints().sort(sortEventsByDate);
const filters = generateFilter(events);

const siteMenuContainer = document.querySelector('.trip-controls__navigation');
const tripInfoContainer = document.querySelector('.trip-main');
const filtersContainer = document.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('.trip-events');

const boardPresenter = new BoardPresenter(eventsContainer, tripInfoContainer);

render(siteMenuContainer, new SiteMenuView(), RenderPosition.BEFOREEND);
render(filtersContainer, new FiltersView(filters), RenderPosition.BEFOREEND);

boardPresenter.init(events);
