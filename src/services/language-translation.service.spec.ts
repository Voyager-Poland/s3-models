import { LanguageTranslationService } from './language-translation.service';
import { LanguageEventReader } from './language-event-reader';
import { Translation } from '../interfaces/translation';
import { LanguageEventBusService } from './language-bus.service';

describe('LanguageTranslationService', () => {
	let service: LanguageTranslationService;
	let languageEventReader: LanguageEventReader;
	let translation: Translation;
	let langueService: LanguageEventBusService;
	beforeEach(() => {
		langueService = new LanguageEventBusService();
		languageEventReader = new LanguageEventReader(langueService);

		// Mock the Translation service
		translation = {
			translate: jasmine.createSpy('translate').and.callFake((key: string, params?: any) => {
				return `${key}-translated`;
			})
		};

		// Create the service instance
		service = new LanguageTranslationService(languageEventReader, translation);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should initialize with the default language', (done) => {
		service.language$.subscribe(language => {
			expect(language).toBe('pl');
			done();
		});
	});

	it('should update the language when a new language event is emitted', (done) => {
		langueService.emitEvent('en');
		service.getTranslation$("key").subscribe(language => {
			expect(language).toBe('key-translated');
			done();
    });
});

it('should translate a key', () => {
	const translated = service.translate('HELLO');
	expect(translated).toBe('HELLO-translated');
});

it('should return an observable for a translated key', (done) => {
	service.getTranslation$('HELLO').subscribe(translated => {
		expect(translated).toBe('HELLO-translated');
		done();
	});
});
});