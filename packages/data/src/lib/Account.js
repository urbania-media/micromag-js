import Base from './Base';

class AccountApi extends Base {
    constructor(opts = {}) {
        super({
            ...opts,
            routes: {
                account: 'account',
                register: 'register',
                ...opts.routes || null,
            }
        });
    }

    get() {
        return this.requestGet(this.route('account'));
    }

    create(data) {
        return this.requestPost(this.route('register'), data);
    }

    update(data) {
        return this.requestPost(this.route('account'), data);
    }
}

export default AccountApi;
