import { pathsToModuleNameMapper } from 'ts-jest';
import { defaults } from 'jest-config';
import { createRequire } from 'module';
import { config } from 'process';


const require = createRequire(import.meta.url);

export default {
	bail: 2,
	verbose: true,
	preset: 'jest-preset-angular',
	setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.(ts|html)$': 'ts-jest',
		'^.+\\.mjs$': 'babel-jest', // Add this line to handle ES modules
	},
	moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'html', 'mjs'],
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