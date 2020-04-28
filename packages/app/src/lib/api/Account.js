import Base from './Base';

class AccountApi extends Base {
    constructor(opts = {}) {
        super({
            ...opts,
            routes: {
                account: 'account',
                ...opts.routes || null,
            }
        });
    }

    get() {
        return this.requestGet(this.route('account'));
    }

    update(data) {
        return this.requestPost(this.route('account'), data);
    }
}

export default AccountApi;
