import { InjectionToken } from '@angular/core';
import { Translation } from '../interfaces/translation';
import { TRANSLATION_TOKEN } from './translation';

describe('TranslationToken', () => {
  it('should create and return an InjectionToken of type Translation', () => {
    const token: InjectionToken<Translation> = TRANSLATION_TOKEN;
    expect(token).toBeDefined();
    expect(token.toString()).toContain('Translation');
  });

  it('should return the same InjectionToken instance on subsequent calls', () => {
    const token1: InjectionToken<Translation> = TRANSLATION_TOKEN;
    const token2: InjectionToken<Translation> = TRANSLATION_TOKEN
    expect(token1).toBe(token2);
  });
});