import { CookieOptions, CookieStore } from './cookie-store';
import { ProfileTokenModel } from '../../models/profile.token.model';

export class ProfileTokenCookieStore extends CookieStore<ProfileTokenModel> {
	constructor(key: string, options: CookieOptions = {}) {
		super(key, options);
	}

	protected deserialize(value: string): ProfileTokenModel {
		var baseValue = super.deserialize(value);
		return new ProfileTokenModel(baseValue);
	}
}