const axios = require('axios');

module.exports = async (url) => {
  const response = await axios.get(url);
  if (response.status !== 200) throw `Error fetching data from "${url}"`;
  return response.data;
};
