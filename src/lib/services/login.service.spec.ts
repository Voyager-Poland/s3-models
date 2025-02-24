import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import { ProfileEventEmitter } from '../context/profile-event-emitter';
import { ProfileTokenModel } from '../models/profile.token.model';
import { StateInitializerService } from './state-initializer.service';
import { StateSaverService } from './state-saver.service';
import { StateComparisonStructure } from '../stores/state-comparison.service';

describe('LoginService', () => {
	let service: LoginService;
	let stateInitializerSpy: jest.Mocked<StateInitializerService<ProfileTokenModel>>;
	let stateSaverSpy: jest.Mocked<StateSaverService<ProfileTokenModel>>;
	let emitterSpy: jest.Mocked<ProfileEventEmitter>;
	let stateComparerSpy: jest.Mocked<StateComparisonStructure<ProfileTokenModel>>;

	beforeEach(() => {
		const initializerSpy = {
			setState: jest.fn()
		};
		const saverSpy = {
			start: jest.fn(),
			destroy: jest.fn()
		};
		const emitter = {
			emitEvent: jest.fn()
		};
		const comparerSpy = {
			start: jest.fn(),
			stop: jest.fn()
		};

		TestBed.configureTestingModule({
			providers: [
				LoginService,
				{ provide: StateInitializerService, useValue: initializerSpy },
				{ provide: StateSaverService, useValue: saverSpy },
				{ provide: ProfileEventEmitter, useValue: emitter },
				{ provide: StateComparisonStructure, useValue: comparerSpy }
			]
		});

		service = TestBed.inject(LoginService);
		stateInitializerSpy = TestBed.inject(StateInitializerService) as jest.Mocked<StateInitializerService<ProfileTokenModel>>;
		stateSaverSpy = TestBed.inject(StateSaverService) as jest.Mocked<StateSaverService<ProfileTokenModel>>;
		emitterSpy = TestBed.inject(ProfileEventEmitter) as jest.Mocked<ProfileEventEmitter>;
		stateComparerSpy = TestBed.inject(StateComparisonStructure) as jest.Mocked<StateComparisonStructure<ProfileTokenModel>>;
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should initialize state and start services on creation', () => {
		expect(stateInitializerSpy.setState).toHaveBeenCalled();
		expect(stateSaverSpy.start).toHaveBeenCalled();
		expect(stateComparerSpy.start).toHaveBeenCalled();
	});

	it('should emit login event on login', () => {
		const loginData = new ProfileTokenModel();
		service.onLogin(loginData);
		expect(emitterSpy.emitEvent).toHaveBeenCalledWith(loginData);
	});

	it('should emit empty event on logout', () => {
		service.onLogout();
		expect(emitterSpy.emitEvent).toHaveBeenCalledWith(ProfileTokenModel.createEmpty());
	});

	it('should stop services on destroy', () => {
		service.ngOnDestroy();
		expect(stateComparerSpy.stop).toHaveBeenCalled();
		expect(stateSaverSpy.destroy).toHaveBeenCalled();
	});
});
