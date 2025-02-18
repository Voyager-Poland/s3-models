import { ProfileTokenModel } from '../../models/profile.token.model';
import { SSRStore } from './ssr-store';


export class ProfileSSRStore extends SSRStore<ProfileTokenModel> {
	override getValue(): ProfileTokenModel {
		return super.getValue() || ProfileTokenModel.createEmpty();
	}
}
