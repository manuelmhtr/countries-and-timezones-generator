import {type Fixes} from '../types';

const exported: Fixes = {
  ADD_COUNTRIES: {
    // 'Indian/Kerguelen': ['HM'], // Left as example
  },

  REMOVE_COUNTRIES: [
    'BV', // Bouvet Island, a dependency of Norway
    'HM', // Heard Island and McDonald Islands, a dependency of Australia
  ],

  DEPRECATED_TIMEZONES: [],
  OVERWRITE_TIMEZONE: {},
};

export default exported;

export const {
  ADD_COUNTRIES,
  REMOVE_COUNTRIES,
  DEPRECATED_TIMEZONES,
  OVERWRITE_TIMEZONE,
} = exported;
