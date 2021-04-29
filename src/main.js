import SiteMenuView from './view/site-menu.js';
import TripInfoView from './view/trip-info.js';
import TripCostView from './view/trip-cost.js';
import FiltersView from './view/filters.js';
import SortView from './view/sort.js';
import EventsListView from './view/events-list.js';
import EventEditView from './view/event-edit.js';
import EventView from './view/event.js';
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
render(tripInfoContainer, new TripInfoView(events).getElement(), RenderPosition.AFTERBEGIN);
render(filtersContainer, new FiltersView(filters).getElement(), RenderPosition.BEFOREEND);
render(eventsContainer, new SortView().getElement(), RenderPosition.BEFOREEND);

const tripInfo = tripInfoContainer.querySelector('.trip-main__trip-info');
const eventListComponent = new EventsListView();

render(eventsContainer, eventListComponent.getElement(), RenderPosition.BEFOREEND);
render(tripInfo, new TripCostView(events).getElement(), RenderPosition.BEFOREEND);

const renderEvent = (eventList, event) => {
  const eventComponent = new EventView(event);
  const eventEditComponent = new EventEditView(event);

  const replaceEventToEditForm = () => {
    eventList.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceEditFormToEvent = () => {
    eventList.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  eventComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceEventToEditForm();
  });

  eventEditComponent.getElement().querySelector('.event--edit').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceEditFormToEvent();
  });

  render(eventList, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

for (let i = 0; i < events.length; i++) {
  renderEvent(eventListComponent.getElement(), events[i]);
}
