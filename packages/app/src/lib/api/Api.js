import Base from './Base';

import AuthApi from './Auth';

class Api extends Base {
    constructor(opts = {}) {
        super(opts);

        this.auth = new AuthApi(opts);
    }
}

export default Api;
