import ngPreset from 'jest-preset-angular/presets';
import { type JestConfigWithTsJest, pathsToModuleNameMapper } from 'ts-jest';
import 'jest-preset-angular/setup-jest';
import tsconfig from './tsconfig-esm.spec.json';

const esmPreset = ngPreset.createEsmPreset();

export default {
    bail: true,
    ...esmPreset,
    moduleNameMapper: {
        ...esmPreset.moduleNameMapper,
        ...pathsToModuleNameMapper(tsconfig.compilerOptions.paths, { prefix: '<rootDir>' }),
        '^rxjs': '<rootDir>/node_modules/rxjs/dist/bundles/rxjs.umd.js',
        '^@angular/core/testing$': '<rootDir>/node_modules/@angular/core/fesm2022/testing.mjs',
        '^@angular/common$': '<rootDir>/node_modules/@angular/common/fesm2022/common.mjs',
    },
    setupFilesAfterEnv: ['<rootDir>/setup-jest-esm.ts'],
    transform: {
        '^.+\\.(ts|js|html|svg)$': [
            'jest-preset-angular',
            {
                tsconfig: '<rootDir>/tsconfig-esm.spec.json',
                stringifyContentPathRegex: '\\.(html|svg)$',
                useESM: true,
            },
        ],
    },
    extensionsToTreatAsEsm: ['.ts'],
} satisfies JestConfigWithTsJest;
