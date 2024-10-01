const TIMEZONES_URL = 'https://en.wikipedia.org/wiki/List_of_tz_database_time_zones';

function getData() {
  return fetch(TIMEZONES_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error fetching data from ${TIMEZONES_URL}`);
      }
      return response.text();
    });
}

module.exports = getData;
