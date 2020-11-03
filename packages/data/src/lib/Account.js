import Base from './Base';

class AccountApi extends Base {
    constructor(opts = {}) {
        super({
            ...opts,
            routes: {
                account: 'account',
                register: 'register',
                complete: 'account/complete',
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

    complete(data) {
        return this.requestPost(this.route('complete'), data);
    }

    delete(id) {
        return this.requestDelete(this.route('delete'), { id });
    }
}

export default AccountApi;
