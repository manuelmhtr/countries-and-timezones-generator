module.exports = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw `Error fetching data from "${url}"`;
  return response.text();
};
