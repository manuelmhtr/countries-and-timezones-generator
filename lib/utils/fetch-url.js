module.exports = fetchUrl;

async function fetchUrl(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching data from "${url}"`);
  }

  return response.text();
}
