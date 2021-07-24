function parseData(data, validCountries) {
  const execute = () => {
    const lines = data.split('\n');
    return lines.reduce((prev, line) => ({ ...prev, ...parseLine(line) }), {});
  };

  const isValidCountry = countryId => !!validCountries[countryId];

  const parseLine = (str) => {
    if (!str || str.charAt(0) === '#') return {};

    const [countriesStr, _coordinates, tz] = str.split('\t');
    const countries = countriesStr.split(',');
    const validCountries = countries.filter((country) => {
      if (isValidCountry(country)) return true;
      console.log(`Eggert. Invalid country: ${country}`)
    });

    return { [tz]: validCountries };
  };

  return execute();
};

module.exports = parseData;
