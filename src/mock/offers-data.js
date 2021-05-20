import {getRandomArray} from '../utils/common.js';

export const availableOffers = {
  'taxi': [
    {
      'title': 'Upgrade to a business class',
      'price': 120,
    }, {
      'title': 'Choose the radio station',
      'price': 60,
    }, {
      'title': 'Add meal',
      'price': 40,
    }, {
      'title': 'Switch to comfort',
      'price': 55,
    }, {
      'title': 'Choose the radio statio',
      'price': 30,
    },
  ],
  'bus': [
    {
      'title': 'Upgrade to a business class',
      'price': 120,
    }, {
      'title': 'Choose the radio station',
      'price': 60,
    }, {
      'title': 'Add meal',
      'price': 40,
    }, {
      'title': 'Switch to comfort',
      'price': 55,
    }, {
      'title': 'Choose the radio statio',
      'price': 30,
    },
  ],
  'train': [
    {
      'title': 'Upgrade to a business class',
      'price': 120,
    }, {
      'title': 'Choose the radio station',
      'price': 60,
    },
  ],
  'ship': [
    {
      'title': 'Upgrade to a business class',
      'price': 120,
    }, {
      'title': 'Choose the radio station',
      'price': 60,
    }, {
      'title': 'Add meal',
      'price': 40,
    }, {
      'title': 'Switch to comfort',
      'price': 55,
    },
  ],
  'transport': [
    {
      'title': 'Upgrade to a business class',
      'price': 120,
    }, {
      'title': 'Choose the radio station',
      'price': 60,
    }, {
      'title': 'Add meal',
      'price': 40,
    }, {
      'title': 'Switch to comfort',
      'price': 55,
    }, {
      'title': 'Choose the radio statio',
      'price': 30,
    },
  ],
  'drive': [
    {
      'title': 'Upgrade to a business class',
      'price': 120,
    }, {
      'title': 'Choose the radio station',
      'price': 60,
    }, {
      'title': 'Add meal',
      'price': 40,
    }, {
      'title': 'Switch to comfort',
      'price': 55,
    }, {
      'title': 'Choose the radio statio',
      'price': 30,
    },
  ],
  'flight': [
    {
      'title': 'Upgrade to a business class',
      'price': 120,
    }, {
      'title': 'Choose the radio station',
      'price': 60,
    }, {
      'title': 'Add meal',
      'price': 40,
    }, {
      'title': 'Switch to comfort',
      'price': 55,
    }, {
      'title': 'Choose the radio statio',
      'price': 30,
    },
  ],
  'check-in': [],
  'sightseeing': [],
  'restaurant': [
    {
      'title': 'Upgrade to a business class',
      'price': 120,
    }, {
      'title': 'Choose the radio station',
      'price': 60,
    }, {
      'title': 'Add meal',
      'price': 40,
    },
  ],
};

export const generateOffers = (type) => {
  return getRandomArray(availableOffers[type]);
};
