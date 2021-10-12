function parseData(data, validCountries) {
  const execute = () => {
    const lines = data.split('\n');
    return lines.reduce((prev, line) => ({ ...prev, ...parseLine(line) }), {});
  };

  const parseLine = (str) => {
    if (!str || str.charAt(0) === '#') return {};

    const [_type, alias, tz] = str.replace(/\t+/g, '\t').split('\t');
    if (!tz) {
      console.log({ str, _type, alias, tz });
      process.exit();
    }
    return { [tz]: alias };
  };

  return execute();
};

module.exports = parseData;
