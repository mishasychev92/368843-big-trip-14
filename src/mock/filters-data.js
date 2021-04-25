import {isDateExpired, isDateInFuture,  isDateCurrent} from '../utils.js';

const eventToFilterMap = {
  everything: (events) => events.length,
  future: (events) => events.filter((event) => isDateCurrent(event.fromDate) || isDateInFuture(event.toDate)).length,
  past: (events) => events.filter((event) => isDateExpired(event.toDate)).length,
};

export const generateFilter = (events) => {
  return Object.entries(eventToFilterMap).map(([filterName, countEvents]) => {
    return {
      name: filterName,
      count: countEvents(events),
    };
  });
};
