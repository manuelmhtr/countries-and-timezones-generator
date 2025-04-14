import type {Configuration} from 'lint-staged';

const config: Configuration = {
	/* eslint-disable @typescript-eslint/naming-convention -- keys are globs */
	'*.ts': ['xo --fix'],
	'*.{html,json}': ['prettier --write'],
	'*.md': ['markdownlint --fix', 'prettier --write'],
	/* eslint-enable @typescript-eslint/naming-convention */
};

export default config;
