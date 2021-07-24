const { fetchUrl } = require('../utils')

const URL = 'https://raw.githubusercontent.com/moment/moment-timezone/master/data/packed/latest.json';

module.exports = () => fetchUrl(URL);
