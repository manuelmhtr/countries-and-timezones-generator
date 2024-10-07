const {fetchUrl} = require('../utils');

const URL = 'https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2';

function getData() {
  return fetchUrl(URL);
}

module.exports = getData;
