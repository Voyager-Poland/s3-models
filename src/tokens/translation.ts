import { InjectionToken } from '@angular/core';
import { Translation } from '../interfaces/translation';

let injectionToken: InjectionToken<Translation>;
export function TranslationToken(): InjectionToken<Translation> {
  if (!injectionToken) {
    injectionToken = new InjectionToken<Translation>('Translation');
  }
  return injectionToken;
}