import dayjs from 'dayjs';
import {EVENT_TYPES} from '../const.js';
import {formatDate, getRandomInteger, createElement} from '../utils.js';

const createEventTypeTemplate = (currentType) => {
  return Object.keys(EVENT_TYPES).map((type) => {
    return `<div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${type === currentType ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${EVENT_TYPES[type]}</label>
    </div>`;
  }).join('');
};

const createEventOfferTemplate = (offers) => {
  if (offers.length > 0) {
    const generateOffers = () => {
      return offers.map((offer) => {
        const offerLastWord = offer.title.split(' ').pop();

        return `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerLastWord}-1" type="checkbox" name="event-offer-${offerLastWord}" ${getRandomInteger(0,1) ? 'checked' : ''}>
          <label class="event__offer-label" for="event-offer-${offerLastWord}-1">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
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

const createEventEditTemplate = (event = {}) => {
  const {
    destination = {
      name: '',
      description: '',
      pictures: [],
    },
    price = '',
    fromDate = dayjs(),
    toDate = dayjs(),
    type = 'flight',
    offers = [],
  } = event;

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${createEventTypeTemplate(type)}
          </fieldset>
        </div>
      </div>
      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
        <datalist id="destination-list-1">
          <option value="Amsterdam"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
        </datalist>
      </div>
      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDate(fromDate, 'DD/MM/YY HH:mm')}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDate(toDate, 'DD/MM/YY HH:mm')}">
      </div>
      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
      </div>
      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>

    ${(destination.description).length > 0 || (destination.pictures).length > 0 || offers.length > 0 ? `<section class="event__details">
      ${createEventOfferTemplate(offers)}
      
      ${(destination.description).length > 0 || (destination.pictures).length > 0 ? `<section class="event__section  event__section--destination">
        ${createEventDescriptionTemplate(destination.description)}
        ${createEventPicturesTemplate(destination.pictures)}
      </section>` : ''}
      
    </section>` : ''}

  </form>
</li>`;
};

export default class EventEdit {
  constructor(event) {
    this._event = event;
    this._element = null;
  }

  getTemplate() {
    return createEventEditTemplate(this._event);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
