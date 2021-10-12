const { fetchUrl } = require('../utils')

const URL = 'https://raw.githubusercontent.com/eggert/tz/43dbb43381487a253fdc4462c0bdce073f79e286/backward';

module.exports = () => fetchUrl(URL);
