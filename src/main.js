import SiteMenuView from './view/site-menu.js';
import TripInfoView from './view/trip-info.js';
import TripCostView from './view/trip-cost.js';
import FiltersView from './view/filters.js';
import SortView from './view/sort.js';
import EventsListView from './view/events-list.js';
import EventEditView from './view/event-edit.js';
import EventView from './view/event.js';
import NoEventsView from './view/no-events.js';
import {generatePoints} from './mock/event-data.js';
import {generateFilter} from './mock/filters-data.js';
import {render, RenderPosition} from './utils.js';

const events = generatePoints().sort((eventA, eventB) => eventA.fromDate - eventB.fromDate);
const filters = generateFilter(events);

const siteMenuContainer = document.querySelector('.trip-controls__navigation');
const tripInfoContainer = document.querySelector('.trip-main');
const filtersContainer = document.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('.trip-events');

render(siteMenuContainer, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
render(filtersContainer, new FiltersView(filters).getElement(), RenderPosition.BEFOREEND);

const renderEvent = (eventList, event) => {
  const eventComponent = new EventView(event);
  const eventEditComponent = new EventEditView(event);

  const replaceEventToEditForm = () => {
    eventList.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceEditFormToEvent = () => {
    eventList.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceEditFormToEvent();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  const closeEvent = () => {
    replaceEditFormToEvent();
    document.removeEventListener('keydown', onEscKeyDown);
  };

  eventComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceEventToEditForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.getElement().querySelector('.event--edit').addEventListener('submit', (evt) => {
    evt.preventDefault();
    closeEvent();
  });

  eventEditComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    closeEvent();
  });

  render(eventList, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

if (events.length === 0) {
  render(eventsContainer, new NoEventsView().getElement(), RenderPosition.BEFOREEND);
} else {
  const tripInfoComponent = new TripInfoView(events);

  render(tripInfoContainer, tripInfoComponent.getElement(), RenderPosition.AFTERBEGIN);
  render(tripInfoComponent.getElement(), new TripCostView(events).getElement(), RenderPosition.BEFOREEND);
  render(eventsContainer, new SortView().getElement(), RenderPosition.BEFOREEND);

  const eventListComponent = new EventsListView();

  render(eventsContainer, eventListComponent.getElement(), RenderPosition.BEFOREEND);

  for (let i = 0; i < events.length; i++) {
    renderEvent(eventListComponent.getElement(), events[i]);
  }
}
