const { fetchUrl } = require('../utils')

const URL = 'https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2';

module.exports = () => fetchUrl(URL);
