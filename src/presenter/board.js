import TripInfoView from '../view/trip-info.js';
import TripCostView from '../view/trip-cost.js';
import SortView from '../view/sort.js';
import EventsListView from '../view/events-list.js';
import NoEventsView from '../view/no-events.js';
import EventPresenter from './event.js';
import EventNewPresenter from './event-new.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import {sortEventsByDate, sortEventsByTime, sortEventsByPrice} from '../utils/event.js';
import {filter} from '../utils/filter.js';
import {SortType, UpdateType, UserAction, FilterType} from '../const.js';

export default class BoardPresenter {
  constructor(eventsContainer, tripInfoContainer, buttonNewEvent, eventsModel, filterModel, offersModel, destinationsModel) {
    this._eventsModel = eventsModel;
    this._filterModel = filterModel;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;

    this._eventsContainer = eventsContainer;
    this._tripInfoContainer = tripInfoContainer;
    this._buttonNewEvent = buttonNewEvent;
    this._eventPresenter = {};
    this._currentSortType = SortType.DAY;

    this._sortComponent = null;
    this._tripInfoComponent = null;
    this._tripCostComponent = null;
    this._eventsListComponent = new EventsListView();
    this._noEventsComponent = new NoEventsView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._eventNewPresenter = new EventNewPresenter(this._eventsListComponent, this._handleViewAction,  this._getOffers(), this._getDestinations());
  }

  init() {
    this._buttonNewEvent.disabled = false;

    this._renderBoard();

    this._eventsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  destroy() {
    this._buttonNewEvent.disabled = true;

    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._clearBoard({resetSortType: true});

    remove(this._noEventsComponent);

    this._eventsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createEvent() {
    this._buttonNewEvent.disabled = true;

    this._currentSortType = SortType.DAY;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);

    this._eventNewPresenter.init(this._buttonNewEvent);
  }

  _getEvents() {
    const filterType = this._filterModel.getFilter();
    const events = this._eventsModel.getEvents();
    const filtredEvents = filter[filterType](events);

    switch (this._currentSortType) {
      case SortType.TIME:
        return filtredEvents.sort(sortEventsByTime);
      case SortType.PRICE:
        return filtredEvents.sort(sortEventsByPrice);
    }

    return filtredEvents.sort(sortEventsByDate);
  }

  _getOffers() {
    return this._offersModel.getOffers();
  }

  _getDestinations() {
    return this._destinationsModel.getDestinations();
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearBoard();
    this._renderBoard();
  }

  _handleModeChange() {
    this._eventNewPresenter.destroy();
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this._eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this._eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this._eventsModel.deleteEvent(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._eventPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetSortType: true});
        this._renderBoard();
        break;
    }
  }

  _renderTripInfo() {
    if (this._tripInfoComponent) {
      remove(this._tripInfoComponent);
      this._tripInfoComponent = null;
    }

    this._tripInfoComponent = new TripInfoView(this._getEvents());
    render(this._tripInfoContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
  }

  _renderTripCost() {
    if (this._tripCostComponent) {
      remove(this._tripCostComponent);
      this._tripCostComponent = null;
    }

    this._tripCostComponent = new TripCostView(this._getEvents());
    render(this._tripInfoComponent, this._tripCostComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    if (this._sortComponent) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._eventsContainer, this._sortComponent, RenderPosition.AFTERBEGIN);

  }

  _renderEventList() {
    render(this._eventsContainer, this._eventsListComponent, RenderPosition.BEFOREEND);
  }

  _renderNoEvents() {
    render(this._eventsContainer, this._noEventsComponent, RenderPosition.BEFOREEND);
  }

  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._eventsListComponent, this._handleViewAction, this._handleModeChange, this._getOffers(), this._getDestinations());
    eventPresenter.init(event);
    this._eventPresenter[event.id] = eventPresenter;
  }

  _renderEvents() {
    const events = this._getEvents();

    for (let i = 0; i < events.length; i++) {
      this._renderEvent(events[i]);
    }
  }

  _clearBoard({resetSortType = false} = {}) {
    this._eventNewPresenter.destroy();

    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};

    remove(this._sortComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DAY;
    }
  }

  _renderBoard() {
    if (this._getEvents().length === 0) {
      this._renderNoEvents();
    } else {
      remove(this._noEventsComponent);

      this._renderTripInfo();
      this._renderTripCost();
      this._renderSort();
      this._renderEventList();
      this._renderEvents();
    }
  }
}
