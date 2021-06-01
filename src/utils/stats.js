import dayjs from 'dayjs';

export const countPriceByType = (events, type) => {
  return {
    label: type.toUpperCase(),
    data: events.reduce((accumulator, event) => event.type === type ? accumulator + event.price : accumulator, 0),
  };
};

export const countEventTypes = (events, type) => {
  return {
    label: type.toUpperCase(),
    data: events.filter((event) => event.type === type).length,
  };
};

export const countDurationTypes = (events, type) => {
  let typeDuration = 0;

  events.forEach((event) => {
    if (event.type === type) {
      const startDate = dayjs(event.fromDate);
      const endDate = dayjs(event.toDate);

      typeDuration += endDate.diff(startDate);
    }
  });

  return {
    label: type.toUpperCase(),
    data: typeDuration,
  };
};

export const getSortedData = (dataToSort) => {
  const sortedData = dataToSort.sort((a, b) => b.data - a.data);
  const labels = sortedData.map((item) => item.label);
  const data = sortedData.map((item) => item.data);

  return {
    labels,
    data,
  };
};
