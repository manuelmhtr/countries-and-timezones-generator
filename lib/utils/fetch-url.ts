export default fetchUrl;

async function fetchUrl(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching data from "${url}"`);
  }

  return response.text();
}
