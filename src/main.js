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
import {render, RenderPosition, replace} from './utils/render.js';

const events = generatePoints().sort((eventA, eventB) => eventA.fromDate - eventB.fromDate);
const filters = generateFilter(events);

const siteMenuContainer = document.querySelector('.trip-controls__navigation');
const tripInfoContainer = document.querySelector('.trip-main');
const filtersContainer = document.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('.trip-events');

render(siteMenuContainer, new SiteMenuView(), RenderPosition.BEFOREEND);
render(filtersContainer, new FiltersView(filters), RenderPosition.BEFOREEND);

const renderEvent = (eventList, event) => {
  const eventComponent = new EventView(event);
  const eventEditComponent = new EventEditView(event);

  const replaceEventToEditForm = () => {
    replace(eventEditComponent, eventComponent);
  };

  const replaceEditFormToEvent = () => {
    replace(eventComponent, eventEditComponent);
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

  eventComponent.setButtonClickHandler(() => {
    replaceEventToEditForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.setFormSubmitHandler(closeEvent);

  eventEditComponent.setButtonClickHandler(closeEvent);

  render(eventList, eventComponent, RenderPosition.BEFOREEND);
};

if (events.length === 0) {
  render(eventsContainer, new NoEventsView(), RenderPosition.BEFOREEND);
} else {
  const tripInfoComponent = new TripInfoView(events);

  render(tripInfoContainer, tripInfoComponent, RenderPosition.AFTERBEGIN);
  render(tripInfoComponent, new TripCostView(events), RenderPosition.BEFOREEND);
  render(eventsContainer, new SortView(), RenderPosition.BEFOREEND);

  const eventListComponent = new EventsListView();

  render(eventsContainer, eventListComponent, RenderPosition.BEFOREEND);

  for (let i = 0; i < events.length; i++) {
    renderEvent(eventListComponent, events[i]);
  }
}
