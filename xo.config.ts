import {type FlatXoConfig} from 'xo';

/** Snapshot data uses IANA IDs as keys; XO 2 naming rules are not applicable. */
const xoConfig: FlatXoConfig = [
	{
		name: 'ignore-generated-timezone-fixtures',
		ignores: [
			'test/unit/get-wikipedia-timezones-data/parse-data/expected-timezones.ts',
			// XO --fix can corrupt these config files; lint them manually if needed.
			'vitest.config.ts',
			'lint-staged.config.ts',
		],
	},
	{
		rules: {
			'import-x/extensions': 'off',
			'@typescript-eslint/naming-convention': 'off',
			'@typescript-eslint/no-loop-func': 'off',
			'@typescript-eslint/no-unsafe-type-assertion': 'off',
			'unicorn/no-array-reduce': 'off',
			'require-unicode-regexp': 'off',
		},
	},
];

export default xoConfig;
