module.exports = {
	preset: 'jest-preset-angular',
	setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.(ts|html)$': 'ts-jest',
	},
	moduleFileExtensions: ['ts', 'html', 'js', 'json'],
	transformIgnorePatterns: ['<rootDir>/node_modules/'],
	globals: {
		'ts-jest': {
			tsconfig: '<rootDir>/tsconfig.spec.json',
			stringifyContentPathRegex: '\\.html$',
		},
	},
};