module.exports = {
  OVERWRITE_TIMEZONE: {
    // According to IANA, America/Nuuk is the canonical name
    'America/Nuuk': {
      c: ['GL'],
      d: -120,
      u: -180
    },
    // No country needing since "Australia/Hobart" has it
    'Australia/Currie': {
      a: 'Australia/Hobart'
    },
    // No canonical data for "America/Indiana/Indianapolis"
    'America/Indiana/Indianapolis': {
      c: ['US'],
      d: -240,
      u: -300
    },
    // No canonical data for "Asia/Yangon"
    'Asia/Yangon': {
      c: ['MM'],
      u: 390
    },
  },
  ADD_COUNTRIES: {
    'Europe/Oslo': ['BV'],      // No timezones assigned for BV (Bouvet Island)
    'Indian/Kerguelen': ['HM'], // No timezones assigned for HM (Heard Island and McDonald Islands)
  },
  DEPRECATED_TIMEZONES: [
    'America/Fort_Wayne',
    'America/Godthab',
    'America/Indianapolis',
    'Asia/Rangoon',
    'Singapore',
    'US/East-Indiana',
    'W-SU',
  ],
};
