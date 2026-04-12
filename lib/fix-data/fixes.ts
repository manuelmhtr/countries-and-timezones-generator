import {type Fixes} from '../types';

const exported: Fixes = {
	ADD_COUNTRIES: {
		'Indian/Kerguelen': ['HM'],
	},

	REMOVE_COUNTRIES: [
		'BV', // Bouvet Island, a dependency of Norway
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
