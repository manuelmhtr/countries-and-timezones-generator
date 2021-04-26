const moment = require('moment-timezone');

const OVERWRITE_COUNTRIES = {
  'America/Indianapolis': 'US',
  'US/East-Indiana': 'US',
  'America/Fort_Wayne': 'US',
  'Asia/Rangoon': 'MM',
  'Asia/Yangon': 'MM'
};

function parseTimezonesData(momentData, timezonesCountry) {
  const { zones, links, countries } = momentData;
  const now = Date.now();

  const execute = () => {
    const tzCountries = getTzCountries();
    const aliases = getAliases(tzCountries);
    const canonical = getCanonicalZones(tzCountries);
    return {
      ...aliases,
      ...canonical
    };
  };

  const getAliases = (tzCountries) => {
    return links.reduce((prev, str) => {
      const [canonical, alias] = str.split('|');
      const country = tzCountries[alias];
      const timezone = { a: canonical };
      if (country) timezone.c = country;
      return { ...prev, [alias]: timezone };
    }, {});
  };

  const getCanonicalZones = (tzCountries) => {
    return zones.reduce((prev, str) => ({ ...prev, ...parseCanonicalZone(str, tzCountries) }), {});
  };

  const first = (arr) => arr[0];

  const last = (arr) => arr[arr.length - 1];

  const negative = (num) => !num ? 0 : num * -1;

  const parseCanonicalZone = (zone, tzCountries) => {
    const data = moment.tz.unpack(zone);
    const { name } = data;
    const offsets = data.offsets.slice(-2);
    const untils = data.untils.slice(-2);
    const hasDst = untils.length === 2 && untils[0] > now;
    const offset2 = negative(last(offsets));
    const offset1 = hasDst ? negative(first(offsets)) : null;
    const country = tzCountries[name];
    const timezone = { u: hasDst ? Math.min(offset1, offset2) : offset2 };

    if (hasDst) timezone.d = Math.max(offset1, offset2);
    if (country) timezone.c = country;
    return { [name]: timezone };
  };

  const getTzCountries = () => {
    const parsed = countries.reduce((prev, str) => {
      const [countryId, timezonesStr] = str.split('|');
      const timezones = timezonesStr.split(' ');
      timezones.forEach(tz => {
        if (!prev[tz]) prev[tz] = [];
        prev[tz].push(countryId);
      });
      return prev;
    }, {});

    const all = Object.keys(parsed).reduce((prev, tz) => {
      const countries = parsed[tz];
      if (!prev[tz] && countries.length === 1) prev[tz] = countries[0];
      return prev;
    }, { ...timezonesCountry });

    return { ...all, ...OVERWRITE_COUNTRIES };
  };

  return execute();
}

module.exports = parseTimezonesData;
