const { uniq, union, difference } = require('lodash');
const moment = require('moment-timezone');

const COUNTRIES_RESOLUTION = {
  'Africa/Abidjan': ['CI'],       // Egger: CI,BF,GH,GM,GN,IS,ML,MR,SH,SL,SN,TG, Moment: BF,CI,GM,GN,ML,MR,SH,SL,SN,TG
  'America/Curacao': ['CW'],      // Egger: , Moment: AW,BQ,CW,SX
  'America/Panama': ['PA'],       // Egger: PA,CA,KY, Moment: KY,PA
  'America/Phoenix': ['US'],      // Egger: US,CA, Moment: US
  'America/Port_of_Spain': ['TT'],// Egger: , Moment: AG,AI,BL,DM,GD,GP,KN,LC,MF,MS,TT,VC,VG,VI
  'America/Puerto_Rico': ['PR'],  // Egger: PR,AG,CA,AI,AW,BL,BQ,CW,DM,GD,GP,KN,LC,MF,MS,SX,TT,VC,VG,VI, Moment: PR
  'America/Toronto': ['CA'],      // Egger: CA,BS, Moment: CA
  'Asia/Bangkok': ['TH'],         // Egger: TH,CX,KH,LA,VN, Moment: KH,LA,TH,VN
  'Asia/Dubai': ['AE'],           // Egger: AE,OM,RE,SC,TF, Moment: AE,OM
  'Asia/Kuching': ['MY'],         // Egger: MY,BN, Moment: MY
  'Asia/Riyadh': ['SA'],          // Egger: SA,AQ,KW,YE, Moment: KW,SA,YE
  'Asia/Singapore': ['SG'],       // Egger: SG,MY, Moment: SG
  'Asia/Urumqi': ['CN'],          // Egger: CN,AQ, Moment: CN
  'Asia/Yangon': ['MM'],          // Egger: MM,CC, Moment: MM
  'Europe/Berlin': ['DE'],        // Egger: DE,DK,NO,SE,SJ, Moment: DE
  'Europe/Brussels': ['BE'],      // Egger: BE,LU,NL, Moment: BE
  'Europe/Oslo': ['NO'],          // Egger: , Moment: NO,SJ
  'Europe/Paris': ['FR'],         // Egger: FR,MC, Moment: FR
  'Indian/Maldives': ['MV'],      // Egger: MV,TF, Moment: MV
  'Indian/Reunion': ['RE'],       // Egger: , Moment: RE,TF
  'Pacific/Guadalcanal': ['SB'],  // Egger: SB,FM, Moment: SB
  'Pacific/Port_Moresby': ['PG'], // Egger: PG,AQ,FM, Moment: PG
  'Pacific/Tarawa': ['KI'],       // Egger: KI,MH,TV,UM,WF, Moment: KI
};

function parseTimezonesData(momentData, eggertTzCountries) {
  const { zones, links, countries } = momentData;
  const now = Date.now();

  const execute = () => {
    const momentTzCountries = getMomentTzCountries();
    const tzCountries = mixTzCountries(eggertTzCountries, momentTzCountries);
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

  const getMomentTzCountries = () => {
    return countries.reduce((prev, str) => {
      const [countryId, timezonesStr] = str.split('|');
      const timezones = timezonesStr.split(' ');
      timezones.forEach(tz => {
        if (!prev[tz]) prev[tz] = [];
        prev[tz].push(countryId);
      });
      return prev;
    }, {});
  };

  const mixTzCountries = (eggert, moment) => {
    const allTimezones = uniq([...Object.keys(eggert), ...Object.keys(moment)]);
    return allTimezones.reduce((prev, tz) => ({
      ...prev,
      [tz]: solveTzCountries(tz, eggert[tz] || [], moment[tz] || [])
    }), {});
  };

  const solveTzCountries = (tz, eggertTz, momentTz) => {
    const resolution = COUNTRIES_RESOLUTION[tz];
    if (resolution) return resolution;

    const all = union(eggertTz, momentTz);
    if (all.length === 1) return all;
    if (!all.length) throw new Error(`No countries defined for "${tz}" timezone`);

    const equal = all.length === eggertTz.length && all.length === momentTz.length;
    if (equal) return all;

    throw new Error(`'No resolution for timezone "${tz}". Egger: ${eggertTz}, Moment: ${momentTz}`);
  };

  return execute();
}

module.exports = parseTimezonesData;
