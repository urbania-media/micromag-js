import Base from './Base';

import AuthApi from './Auth';
import OrganisationsApi from './Organisations';

class Api extends Base {
    constructor(opts = {}) {
        super(opts);

        this.auth = new AuthApi(opts);
        this.organisations = new OrganisationsApi(opts);
    }
}

export default Api;
