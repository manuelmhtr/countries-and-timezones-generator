import type {Configuration} from 'lint-staged';

const config: Configuration = {
	'{lib,test}/**/*.ts': ['xo --fix'],
	'*.{html,json}': ['prettier --write'],
	'*.md': ['markdownlint --fix', 'prettier --write'],
};

export default config;
