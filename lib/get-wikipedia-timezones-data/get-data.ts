const TIMEZONES_URL =
  'https://en.wikipedia.org/wiki/List_of_tz_database_time_zones';

async function getData(): Promise<string> {
  const response = await fetch(TIMEZONES_URL);
  if (!response.ok) {
    throw new Error(`Error fetching data from ${TIMEZONES_URL}`);
  }

  return response.text();
}

export default getData;
