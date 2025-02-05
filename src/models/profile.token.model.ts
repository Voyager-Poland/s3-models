export class ProfileTokenModel {
	constructor(int?: Partial<ProfileTokenModel>) {
		Object.assign(this, int);
	}

	token!: string;
	initials!: string;
	profilePictureUri?: string;

	get isNotLogged():boolean {
		return !this.token;
	}

	static Empty(): ProfileTokenModel {
		return new ProfileTokenModel({token: '', initials: '', profilePictureUri: ''});
	}
}
