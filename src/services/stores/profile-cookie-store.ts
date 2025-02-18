import { CookieStore } from './cookie-store';
import { CookieOptions } from '../../interfaces/cookie-options';
import { ProfileTokenModel } from '../../models/profile.token.model';

export class ProfileTokenCookieStore extends CookieStore<ProfileTokenModel> {
	constructor(key: string, options: CookieOptions = {}) {
		super(key, options);
	}

	protected deserialize(value: string): ProfileTokenModel {
		const baseValue = super.deserialize(value);
		if (!baseValue) {
			return ProfileTokenModel.createEmpty();

		}
		return new ProfileTokenModel(baseValue);
	}

	override getValue(): ProfileTokenModel {
		const value = super.getValue();
		if (!value) {
			return ProfileTokenModel.createEmpty();
		}
		return value;
	}
}