const { fetchUrl } = require('../utils')

const URL = 'https://raw.githubusercontent.com/eggert/tz/main/zone1970.tab';

module.exports = () => fetchUrl(URL);
