import {fetchUrl} from '../utils';

const URL = 'https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2';

async function getData(): Promise<string> {
	return fetchUrl(URL);
}

export default getData;
