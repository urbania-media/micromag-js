import Base from './Base';

import AuthApi from './Auth';
import OrganisationsApi from './Organisations';
import StoriesApi from './Stories';

class Api extends Base {
    constructor(opts = {}) {
        super(opts);

        this.auth = new AuthApi(opts);
        this.organisations = new OrganisationsApi(opts);
        this.stories = new StoriesApi(opts);
    }
}

export default Api;
