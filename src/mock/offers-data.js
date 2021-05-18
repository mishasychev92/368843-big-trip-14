import {getRandomArray, getRandomInteger} from '../utils/common.js';

const availableOffers = {
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
    }, {
      'title': 'Choose the radio statio',
      'price': 30,
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
  'check-in': [
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
  'sightseeing': [
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
    }, {
      'title': 'Switch to comfort',
      'price': 55,
    }, {
      'title': 'Choose the radio statio',
      'price': 30,
    },
  ],
};

export const generateOffers = (type) => {
  const offers = getRandomArray(availableOffers[type]);

  offers.map((offer) => {
    offer.isChecked = Boolean(getRandomInteger(0, 1));
  });

  return offers;
};
