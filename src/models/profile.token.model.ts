export class ProfileTokenModel {
  token!: string;
  initials!: string;
  profilePictureUri?: string;

  constructor(init?: Partial<ProfileTokenModel>) {
    Object.assign(this, init);
  }

  get isLogged(): boolean {
    return !!this.token;
  }

  static createEmpty(): ProfileTokenModel {
    return new ProfileTokenModel({
      token: '',
      initials: '',
      profilePictureUri: ''
    });
  }
}
