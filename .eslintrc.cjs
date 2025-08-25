module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'@typescript-eslint/recommended', // Add this
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:react-hooks/recommended',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser', // Add this
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: './tsconfig.json', // Add this if you want type-aware rules
	},
	settings: { react: { version: '18.2' } },
	plugins: ['react-refresh', '@typescript-eslint'], // Add @typescript-eslint
	rules: {
		'react/prop-types': 'off',
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true },
		],
		'@typescript-eslint/no-unused-vars': 'warn', // Change to 'warn' for yellow
		'no-unused-vars': 'off', // Turn off the base rule since we're using the TS version
	},
};
