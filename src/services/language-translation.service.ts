import { BehaviorSubject, map, Observable, Subscription } from 'rxjs';
import { Translation } from '../interfaces/translation';
import { LanguageEventReader } from './language-event-reader';
import { OnDestroy } from '@angular/core';

export class LanguageTranslationService implements OnDestroy {
  private languageSubject: BehaviorSubject<string>;
  private subscription: Subscription;

  constructor(
    private languageEventReader: LanguageEventReader,
    private translation: Translation
  ) {
    this.languageSubject = new BehaviorSubject<string>("pl");
    this.subscription = this.languageEventReader.event$.subscribe((language) => {
      this.languageSubject.next(language);
    });
  }

  get language$(): Observable<string> {
    return this.languageSubject.asObservable();
  }

  translate(key: string, params?: any): string {
    return this.translation.translate(key, params);
  }

  getTranslation$(key: string, params?: any): Observable<string> {
    return this.language$.pipe(map(() => this.translate(key, params)));
  }

  // Angular lifecycle hook for cleanup
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
