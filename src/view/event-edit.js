import dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import {EventTypes} from '../const.js';
import {formatDate, getTypeOffers} from '../utils/event.js';
import SmartView from './smart.js';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const BLANK_EVENT = {
  destination: {
    name: '',
    description: '',
    pictures: [],
  },
  price: 0,
  fromDate: dayjs().toDate(),
  toDate: dayjs().add(1, 'hour').toDate(),
  type: 'flight',
  offers: [],
};

const createEventTypeTemplate = (currentType, isDisabled) => {
  return Object.keys(EventTypes).map((type) => {
    return `<div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${type === currentType ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${EventTypes[type]}</label>
    </div>`;
  }).join('');
};

const createEventOfferTemplate = (currentType, offers, typeOffers, isDisabled) => {
  if (typeOffers.length > 0) {
    let offerIndex = 0;
    const generateOffers = () => {
      return typeOffers.map(({title, price}) => {
        const offerLastWord = title.split(' ').pop() + '&ndash;' + offerIndex++;
        const isChecked = offers.some((offer) => offer.title === title) ? 'checked' : '';

        return `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerLastWord}" type="checkbox" name="event-offer-${offerLastWord}" ${isChecked} ${isDisabled ? 'disabled' : ''}>
          <label class="event__offer-label" for="event-offer-${offerLastWord}">
            <span class="event__offer-title">${title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${price}</span>
          </label>
        </div>`;
      }).join('');
    };

    return `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${generateOffers()}
      </div>
    </section>`;
  }

  return '';
};

const createDestinationTemplate = (availableDestinations) => {
  return availableDestinations.map(({name}) => `<option value="${name}"></option>`).join('');
};

const createEventDescriptionTemplate = (description) => {
  if (description.length > 0) {
    return `<h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>`;
  }

  return '';
};

const createEventPicturesTemplate = (pictures) => {
  if (pictures.length > 0) {
    const generatePictures = () => {
      return pictures.map((picture) => {
        return `<img class="event__photo" src="${picture.src}" alt="Event photo">`;
      }).join('');
    };

    return `<div class="event__photos-container">
      <div class="event__photos-tape">
        ${generatePictures()}
      </div>
    </div>`;
  }

  return '';
};

const createEventEditTemplate = (data, availableOffers, availableDestinations, newEventMode) => {
  const {
    destination,
    price,
    fromDate,
    toDate,
    type,
    offers,
    isDisabled,
    isSaving,
    isDeleting,
  } = data;

  const typeOffers = getTypeOffers(availableOffers, type);

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>
        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${createEventTypeTemplate(type, isDisabled)}
          </fieldset>
        </div>
      </div>
      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" min="0" name="event-destination" value="${destination.name}" required list="destination-list-1" ${isDisabled ? 'disabled' : ''}>
        <datalist id="destination-list-1">
          ${createDestinationTemplate(availableDestinations)}
        </datalist>
      </div>
      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDate(fromDate, 'DD/MM/YY HH:mm')}" ${isDisabled ? 'disabled' : ''}>
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDate(toDate, 'DD/MM/YY HH:mm')}" ${isDisabled ? 'disabled' : ''}>
      </div>
      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="number" min="0" name="event-price" value="${price}" required ${isDisabled ? 'disabled' : ''}>
      </div>
      <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
      <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${newEventMode ? 'Cancel' : isDeleting ? 'Deleting...' : 'Delete'}</button>
      ${!newEventMode ? `<button class="event__rollup-btn" type="button" ${isDisabled ? 'disabled' : ''}>
        <span class="visually-hidden">Open event</span>
      </button>` : ''}
    </header>

    ${(destination.description).length > 0 || (destination.pictures).length > 0 || typeOffers.length > 0 ? `<section class="event__details">
      ${createEventOfferTemplate(type, offers, typeOffers, isDisabled)}
      
      ${(destination.description).length > 0 || (destination.pictures).length > 0 ? `<section class="event__section  event__section--destination">
        ${createEventDescriptionTemplate(destination.description)}
        ${createEventPicturesTemplate(destination.pictures)}
      </section>` : ''}
      
    </section>` : ''}

  </form>
</li>`;
};

export default class EventEdit extends SmartView {
  constructor(event = BLANK_EVENT, offers, destinations, newEventMode = false) {
    super();
    this._data = EventEdit.parseEventToData(event);
    this._offers = offers;
    this._destinations = destinations;
    this._newEventMode = newEventMode;
    this._startDatepicker = null;
    this._endDatepicker = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._rollupButtonClickHandler = this._rollupButtonClickHandler.bind(this);
    this._eventTypeToggleHandler = this._eventTypeToggleHandler.bind(this);
    this._destinationToggleHandler = this._destinationToggleHandler.bind(this);
    this._offerToggleHandler = this._offerToggleHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);

    this._setInnerHandlers();
  }

  removeElement() {
    super.removeElement();

    if (this._startDatepicker || this._endDatepicker) {
      this._startDatepicker.destroy();
      this._startDatepicker = null;

      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }
  }

  reset(event) {
    this.updateData(
      EventEdit.parseEventToData(event),
    );
  }

  getTemplate() {
    return createEventEditTemplate(this._data, this._offers, this._destinations, this._newEventMode);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setDatepickers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);

    if (!this._newEventMode) {
      this.setRollupButtonClickHandler(this._callback.rollupButtonClick);
    }
  }

  _eventTypeToggleHandler(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    this.updateData({
      type: evt.target.value,
      offers: [],
    });
  }

  _destinationToggleHandler(evt) {
    evt.preventDefault();

    if (!this._destinations.some(({name}) => name === evt.target.value)) {
      evt.target.setCustomValidity('Необходимо выбрать один из доступных городов');
    } else {
      const destination = this._destinations.find(({name}) => name === evt.target.value);

      this.updateData({
        destination,
      });
    }

    evt.target.reportValidity();
  }

  _offerToggleHandler(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    const offerTitle = evt.target.closest('.event__offer-selector').querySelector('.event__offer-title').textContent;
    let offers = this._data.offers.slice();

    if (this._data.offers.some((offer) => offer.title === offerTitle)) {
      const checkedOffer = this._data.offers.find((offer) => offer.title === offerTitle);
      offers = offers.filter((offer) => offer !== checkedOffer);
    } else {
      const typeOffers = getTypeOffers(this._offers, this._data.type);
      const checkedOffer = typeOffers.find(({title}) => title === offerTitle);

      offers.push(checkedOffer);
    }

    this.updateData({
      offers,
    }, true);
  }

  _priceChangeHandler(evt) {
    evt.preventDefault();
    const price = parseInt(evt.target.value);
    this.updateData({
      price,
    }, true);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this.removeDatepickers();
    this._callback.formSubmit(EventEdit.parseDataToEvent(this._data));
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(EventEdit.parseDataToEvent(this._data));
  }

  _rollupButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.rollupButtonClick();
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.event__type-group').addEventListener('change', this._eventTypeToggleHandler);
    this.getElement().querySelector('.event__input--destination').addEventListener('change', this._destinationToggleHandler);
    this.getElement().querySelector('.event__input--price').addEventListener('change', this._priceChangeHandler);

    const offersContainer = this.getElement().querySelector('.event__available-offers');
    if (offersContainer) {
      offersContainer.addEventListener('change', this._offerToggleHandler);
    }
  }

  _startDateChangeHandler([userDate]) {
    this.updateData({
      fromDate: userDate,
    });
  }

  _endDateChangeHandler([userDate]) {
    this.updateData({
      toDate: userDate,
    });
  }

  setDatepickers() {
    if (this._startDatepicker) {
      this._startDatepicker.destroy();
      this._startDatepicker = null;
    }

    this._startDatepicker = flatpickr(
      this.getElement().querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._data.fromDate,
        maxDate: this._data.toDate,
        enableTime: true,
        'time_24hr': true,
        onChange: this._startDateChangeHandler,
      },
    );

    if (this._endDatepicker) {
      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }

    this._endDatepicker = flatpickr(
      this.getElement().querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._data.toDate,
        minDate: this._data.fromDate,
        enableTime: true,
        'time_24hr': true,
        onChange: this._endDateChangeHandler,
      },
    );
  }

  removeDatepickers() {
    if (this._startDatepicker) {
      this._startDatepicker.destroy();
      this._startDatepicker = null;
    }
    if (this._endDatepicker) {
      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('.event--edit').addEventListener('submit', this._formSubmitHandler);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formDeleteClickHandler);
  }

  setRollupButtonClickHandler(callback) {
    this._callback.rollupButtonClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._rollupButtonClickHandler);
  }

  static parseEventToData(event) {
    return Object.assign(
      {},
      event,
      {
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      },
    );
  }

  static parseDataToEvent(data) {
    data = Object.assign(
      {},
      data,
    );

    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;

    return data;
  }
}
