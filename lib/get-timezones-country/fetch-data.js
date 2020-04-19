const { fetchUrl } = require('../utils')

const URL = 'https://raw.githubusercontent.com/eggert/tz/master/zone.tab';

module.exports = () => fetchUrl(URL);
