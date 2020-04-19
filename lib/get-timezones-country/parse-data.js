function parseData(data, validCountries) {
  const execute = () => {
    const lines = data.split('\n');
    return lines.reduce((prev, line) => ({ ...prev, ...parseLine(line) }), {});
  };

  const isValidContry = countryId => !!validCountries[countryId];

  const parseLine = (str) => {
    if (!str || str.charAt(0) === '#') return {};

    const [countryId, coordinates, tz] = str.split('\t');
    if (!isValidContry(countryId)) return {};

    return { [tz]: countryId };
  };

  return execute();
};

module.exports = parseData;