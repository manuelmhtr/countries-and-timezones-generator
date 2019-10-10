const axios = require('axios');

const COUNTRIES_URL = 'https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2';

function getData() {
  return axios.get(COUNTRIES_URL)
    .then(response => response.data);
}

module.exports = getData;
