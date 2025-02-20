/**
 * Class representing a profile token model.
 */
export class ProfileTokenModel {
  /**
   * The token associated with the profile.
   */
  token!: string;

  /**
   * The initials of the profile.
   */
  initials!: string;

  /**
   * The URI of the profile picture.
   */
  profilePictureUri?: string;

  /**
   * Creates an instance of ProfileTokenModel.
   * @param init - An optional partial initialization object.
   */
  constructor(init?: Partial<ProfileTokenModel>) {
    Object.assign(this, init);
  }

  /**
   * Indicates whether the profile is logged in.
   * @returns true if the profile has a token, false otherwise.
   */
  get isLogged(): boolean {
    return !!this.token;
  }

  /**
   * Creates an empty ProfileTokenModel instance.
   * @returns A new ProfileTokenModel instance with default values.
   */
  static createEmpty(): ProfileTokenModel {
    return new ProfileTokenModel({
      token: '',
      initials: '',
      profilePictureUri: ''
    });
  }
}
