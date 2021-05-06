import AbstractView from './abstract.js';

const getTotalEventsCost = (events) => {
  return events.reduce((accumulator, currentEvent) => {
    return accumulator + currentEvent.price;
  }, 0);
};

const getTotalOffersCost = (events) => {
  return events.reduce((eventsAccumulator, currentEvent) => {
    return eventsAccumulator + currentEvent.offers.reduce((offersAccumulator, currentOffer) => {
      return offersAccumulator + currentOffer.price;
    },0);
  },0);
};

const createTripCostTemplate = (events) => {
  const totalTripCost = getTotalEventsCost(events) + getTotalOffersCost(events);

  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalTripCost}</span>
  </p>`;
};

export default class TripCost extends AbstractView {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return createTripCostTemplate(this._events);
  }
}
