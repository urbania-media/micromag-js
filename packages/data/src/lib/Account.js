import Base from './Base';

class AccountApi extends Base {
    constructor(opts = {}) {
        super({
            ...opts,
            routes: {
                account: 'account',
                register: 'register',
                delete: 'account/delete',
                ...(opts.routes || null),
            },
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

    delete(id) {
        return this.requestDelete(this.route('delete'), { id });
    }
}

export default AccountApi;
