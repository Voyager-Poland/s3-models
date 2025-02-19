import { LanguageTranslationService } from './language-translation.service';
import { LanguageEventReader } from './language-event-reader';
import { Translation } from 'src/interfaces/translation';
import { LanguageEventBusService } from './language-bus.service';
import { jest } from '@jest/globals';

describe('LanguageTranslationService', () => {
	let service: LanguageTranslationService;
	let languageEventReader: LanguageEventReader;
	let translation: Translation;
	let languageService: LanguageEventBusService;

	beforeEach(() => {
		languageService = new LanguageEventBusService();
		languageEventReader = new LanguageEventReader(languageService);

		translation = {
			translate: jest.fn((key: string, params?: any) => {
				return `${key}-translated`;
			})
		};

		// Create the service instance
		service = new LanguageTranslationService(languageEventReader, translation);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should initialize with the default language', () => {
		expect(service['languageSubject'].value).toBe('pl');
	});

	it('should update the language when a new language event is emitted', () => {
		languageService.emitEvent('fr');
		expect(service['languageSubject'].value).toBe('fr');
	});

	it('should translate a key', () => {
		const result = service.translate('hello');
		expect(result).toBe('hello-translated');
	});

	it('should return an observable for a translated key', (done) => {
		service.getTranslation$('hello').subscribe((translation) => {
			expect(translation).toBe('hello-translated');
			done();
		});
	});
});