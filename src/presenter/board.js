import TripInfoView from '../view/trip-info.js';
import TripCostView from '../view/trip-cost.js';
import SortView from '../view/sort.js';
import EventsListView from '../view/events-list.js';
import NoEventsView from '../view/no-events.js';
import EventPresenter from './event.js';
import {updateItem} from '../utils/common.js';
import {render, RenderPosition} from '../utils/render.js';
import {sortEventsByTime, sortEventsByPrice} from '../utils/event.js';
import {SortType} from '../const.js';

export default class BoardPresenter {
  constructor(eventsContainer, tripInfoContainer) {
    this._eventsContainer = eventsContainer;
    this._tripInfoContainer = tripInfoContainer;
    this._eventPresenter = {};
    this._currentSortType = SortType.DAY;

    this._tripInfoComponent = null;
    this._tripCostComponent = null;
    this._sortComponent = new SortView();
    this._eventsListComponent = new EventsListView();
    this._noEventsComponent = new NoEventsView();

    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(events) {
    this._events = events.slice();
    this._sourcedEvents = events.slice();
    this._renderBoard();
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortEvents(sortType);
    this._clearEvents();
    this._renderEvents();
  }

  _handleModeChange() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleEventChange(updatedEvent) {
    this._events = updateItem(this._events, updatedEvent);
    this._sourcedEvents = updateItem(this._sourcedEvents, updatedEvent);
    this._eventPresenter[updatedEvent.id].init(updatedEvent);
  }

  _sortEvents(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this._events.sort(sortEventsByTime);
        break;
      case SortType.PRICE:
        this._events.sort(sortEventsByPrice);
        break;
      default:
        this._events = this._sourcedEvents.slice();
        break;
    }

    this._currentSortType = sortType;
  }

  _renderTripInfo() {
    this._tripInfoComponent = new TripInfoView(this._events);
    render(this._tripInfoContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
  }

  _renderTripCost() {
    this._tripCostComponent = new TripCostView(this._events);
    render(this._tripInfoComponent, this._tripCostComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    render(this._eventsContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderEventList() {
    render(this._eventsContainer, this._eventsListComponent, RenderPosition.BEFOREEND);
  }

  _renderNoEvents() {
    render(this._eventsContainer, this._noEventsComponent, RenderPosition.BEFOREEND);
  }

  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._eventsListComponent, this._handleEventChange, this._handleModeChange);
    eventPresenter.init(event);
    this._eventPresenter[event.id] = eventPresenter;
  }

  _clearEvents() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};
  }

  _renderEvents() {
    for (let i = 0; i < this._events.length; i++) {
      this._renderEvent(this._events[i]);
    }
  }

  _renderBoard() {
    if (this._events.length === 0) {
      this._renderNoEvents();
    } else {
      this._renderTripInfo();
      this._renderTripCost();
      this._renderSort();
      this._renderEventList();
      this._renderEvents();
    }
  }
}
