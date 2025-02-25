import { BehaviorSubject, map, Observable, Subscription } from 'rxjs';
import { Translation } from '../interfaces/translation';
import { LanguageEventReader } from './language-event-reader';
import { generateRandomString } from '../utils/string-utils';
import { Inject, Injectable } from '@angular/core';
import { TRANSLATION_TOKEN } from '../tokens/tokens';

@Injectable({
	providedIn: 'root',
})
export class LanguageTranslationService {
	private languageSubject: BehaviorSubject<string>;
	private subscription: Subscription;

	/**
	 * @obsolete - delete this after testing
	 * */
	checkIstance: string;

	constructor(
		private languageEventReader: LanguageEventReader,
		@Inject(TRANSLATION_TOKEN) private translation: Translation
	) {
		this.checkIstance = generateRandomString(16);
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

	destroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
