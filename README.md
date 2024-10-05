# countries-and-timezones-generator

### Usage

Run:

```
yarn start
```

This will store the result in `/tmp/countries-and-timezones.json` file.

### Tracking changes

[https://data.iana.org/time-zones/tzdb/NEWS](https://data.iana.org/time-zones/tzdb/NEWS)

### Updating `data.json` with the IANA db

1. Run `yarn start` to generate a new `data.json` file.
2. Use a tool like https://www.jsondiff.com to compare the new version with the previous one. Validate those changes against the updates published by [IANA](https://data.iana.org/time-zones/tzdb/NEWS).
3. Replace the `data.json` file in [countries-and-timezones](https://github.com/manuelmhtr/countries-and-timezones) with the new one.
4. Run the tests on `countries-and-timezones`. They are useful for validating the generated data. Since the main data source is Wikipedia, there could be some errors and the script or the data needs to be modified manually.
5. Once there's a final `data.json` file, release a new version.
