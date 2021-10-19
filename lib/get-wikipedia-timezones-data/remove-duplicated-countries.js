const sameCountries = (c1, c2) => c1.join() === c2.join();

// Removes "c" property from aliases where canonical has the same info.
const removeDuplicatedCountries = (timezones) => {
  return Object.keys(timezones).reduce((prev, key) => {
    const tz = timezones[key];
    if (tz.a && tz.c) {
      const canonical = timezones[tz.a];
      if (sameCountries(tz.c, canonical.c)) delete tz.c;
    }
    prev[key] = tz;
    return prev;
  }, {});
};

module.exports = removeDuplicatedCountries;
