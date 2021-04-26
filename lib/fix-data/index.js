const timezones = require('./timezones');

const fixData = (data) => {
  Object.keys(timezones).forEach(key => {
    data.timezones[key] = timezones[key];
  });

  return data;
};

module.exports = fixData;
