const axios = require('axios');

const TIMEZONES_URL = 'https://en.wikipedia.org/wiki/List_of_tz_database_time_zones';

function getData() {
  return axios.get(TIMEZONES_URL)
    .then(response => response.data);
}

module.exports = getData;
