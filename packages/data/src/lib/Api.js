import Base from './Base';

import AuthApi from './Auth';
import AccountApi from './Account';
import OrganisationsApi from './Organisations';
import StoriesApi from './Stories';
import MediasApi from './Medias';

class Api extends Base {
    constructor(opts = {}) {
        super(opts);

        this.auth = new AuthApi(opts);
        this.account = new AccountApi(opts);
        this.organisations = new OrganisationsApi(opts);
        this.stories = new StoriesApi(opts);
        this.medias = new MediasApi(opts);
    }
}

export default Api;
