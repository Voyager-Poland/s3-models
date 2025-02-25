import { LanguageService } from './language.service';
import { StateInitializerService } from './state-initializer.service';
import { StateSaverService } from './state-saver.service';
import { StateComparisonStructure } from '../stores/state-comparison.service';
import { SSRStore } from '../stores/ssr-store';
import { IntialStateService } from '../stores/initial-state.service';
import { LanguageEventEmitter } from '../context/language-event-emitter';
import { LanguageEventBusService } from '../context/language-bus.service';

describe('LanguageService', () => {
    let service: LanguageService;
    let stateInitializer: StateInitializerService<string>;
    let stateSaver: StateSaverService<string>;
    let stateComparer: StateComparisonStructure<string>;
    let languageEventBusService: LanguageEventBusService;
    let store: SSRStore<string>;
    let emitter: LanguageEventEmitter;

    beforeEach(() => {
        languageEventBusService = new LanguageEventBusService();
        store = new SSRStore();
        emitter = new LanguageEventEmitter(languageEventBusService);
        stateInitializer = new StateInitializerService<string>(new IntialStateService<string>(store), emitter);
        stateSaver = new StateSaverService<string>(store, languageEventBusService);
        stateComparer = new StateComparisonStructure<string>();

        jest.spyOn(stateInitializer, 'setState').mockImplementation(() => { });
        jest.spyOn(stateSaver, 'start').mockImplementation(() => { });
        jest.spyOn(stateComparer, 'start').mockImplementation(() => { });
        jest.spyOn(stateComparer, 'stop').mockImplementation(() => { });
        jest.spyOn(stateSaver, 'destroy').mockImplementation(() => { });

        service = new LanguageService(stateInitializer, stateSaver, emitter, stateComparer);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should initialize state and start services on creation', () => {
        expect(stateInitializer.setState).toHaveBeenCalled();
        expect(stateSaver.start).toHaveBeenCalled();
        expect(stateComparer.start).toHaveBeenCalled();
    });

    it('should stop services on destroy', () => {
        service.destroy();
        expect(stateComparer.stop).toHaveBeenCalled();
        expect(stateSaver.destroy).toHaveBeenCalled();
    });

    it('should emit language change event', () => {
        jest.spyOn(emitter, 'emitEvent');
        const language = 'en';
        service.onLanguageChange(language);
        expect(emitter.emitEvent).toHaveBeenCalledWith(language);
    });
});
