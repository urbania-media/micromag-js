import Base from './Base';

class AccountApi extends Base {
    constructor(opts = {}) {
        super({
            ...opts,
            routes: {
                me: 'me',
                ...opts.routes || null,
            }
        });
    }

    get() {
        return this.requestGet(this.route('me'));
    }

    update(data) {
        return this.requestPost(this.route('me'), data);
    }
}

export default AccountApi;
