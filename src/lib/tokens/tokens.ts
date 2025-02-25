import { InjectionToken } from "@angular/core";
import { ProfileTokenModel } from "../models/profile.token.model";
import { Store } from "../interfaces/store";
import { InitialStateProvider } from "../interfaces/internal-state.provider";
import { StateSaverService } from "../services/state-saver.service";
import { StateInitializerService } from "../services/state-initializer.service";
import { StateComparisonStructure } from "../stores/state-comparison.service";
import { Translation } from "../interfaces/translation";

export const PROFILE_STORE = new InjectionToken<Store<ProfileTokenModel>>('ProfileStore');
export const PROFILE_INITIAL_STATE_PROVIDER_TOKEN = new InjectionToken<InitialStateProvider<ProfileTokenModel>>('InitialStateProvider<ProfileTokenModel>');
export const PROFILE_STATE_SAVER_TOKEN = new InjectionToken<StateSaverService<ProfileTokenModel>>('StateSaver<ProfileTokenModel>');
export const PROFILE_STATE_INITIALIZER_TOKEN = new InjectionToken<StateInitializerService<ProfileTokenModel>>('ProfieStateInitializerServic');
export const PROFILE_STATE_COMPARSION_TOKEN = new InjectionToken<StateComparisonStructure<ProfileTokenModel>>('ProfileStateComparer');


export const CURRENCY_STORE = new InjectionToken<Store<string>>('ProfileStore');
export const CURRENCY_INITIAL_STATE_PROVIDER_TOKEN = new InjectionToken<InitialStateProvider<string>>('currencyInitialStateProvider>');
export const CURRENCY_STATE_SAVER_TOKEN = new InjectionToken<StateSaverService<string>>('currencyStateSaver');
export const CURRENCY_STATE_INITIALIZER_TOKEN = new InjectionToken<StateInitializerService<string>>('currecnyProfieStateInitializerServic');
export const CURRENCY_STATE_COMPARSION_TOKEN = new InjectionToken<StateComparisonStructure<string>>('currencyProfileStateComparer');



export const LANGUAGE_STORE = new InjectionToken<Store<string>>('LanguageStore');

export const LANGUAGE_INITIAL_STATE_PROVIDER_TOKEN = new InjectionToken<InitialStateProvider<string>>('LanguageInitialStateProvider<string>');
export const LANGUAGE_STATE_SAVER_TOKEN = new InjectionToken<StateSaverService<string>>('LanguageStateSaver<string>');
export const LANGUAGE_STATE_INITIALIZER_TOKEN = new InjectionToken<StateInitializerService<string>>('LanguageStateInitializerService');
export const LANGUAGE_STATE_COMPARSION_TOKEN = new InjectionToken<StateComparisonStructure<string>>('LanguageStateComparer');

export const TRANSLATION_TOKEN = new InjectionToken<Translation>('Translation');
