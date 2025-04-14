const config = {
	prettier: true,
	space: true,
	parser: '@typescript-eslint/parser', // Workaround for import attributes -- https://github.com/xojs/xo/issues/727
	rules: {
		/* eslint-disable @typescript-eslint/naming-convention -- rule names have different convention */
		'@typescript-eslint/consistent-type-imports': ['error', {prefer: 'type-imports'}],
		'import/extensions': 'off',
		'unicorn/no-array-reduce': 'off',
		'unicorn/prefer-module': 'off',
		'unicorn/prevent-abbreviations': [
			'error',
			{
				allowList: {
					dst: true,
					Dst: true,
				},
			},
		],
		/* eslint-enable @typescript-eslint/naming-convention */
	},
};

export default config;
