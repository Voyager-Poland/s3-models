module.exports = {
	preset: 'jest-preset-angular',
	setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.(ts|html)$': 'ts-jest',
		'^.+\\.mjs$': 'babel-jest', // Add this line to handle ES modules
	},
	moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
	transformIgnorePatterns: [
		'node_modules/(?!@angular|rxjs)', // Add this line to handle ES modules in node_modules
	],
	globals: {
		'ts-jest': {
			tsconfig: '<rootDir>/tsconfig.spec.json',
			stringifyContentPathRegex: '\\.html$',
		},
	},
};