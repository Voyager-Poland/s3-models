import { BehaviorSubject, map, Observable } from "rxjs";
import { Translation } from "../interfaces/translation";
import { LanguageEventReader } from "./language-event-reader";

export class LanguageTranslationService {
  private languageSubject: BehaviorSubject<string>;

  constructor(
    private languageEventReader: LanguageEventReader,
    private translation: Translation
  ) {
    this.languageSubject = new BehaviorSubject<string>("pl");
    this.languageEventReader.event$.subscribe((language) => {
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
}
