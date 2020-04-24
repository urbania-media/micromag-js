import Base from './Base';

class AuthApi extends Base {
    constructor(opts = {}) {
        super({
            ...opts,
            routes: {
                login: 'auth/login',
                register: 'register',
                ...opts.routes || null,
            }
        });
    }

    login(email, password) {
        return this.requestPost(this.getPath('login'), {
            email,
            password,
        });
    }

    register(data) {
        return this.requestPost(this.getPath('register'), data);
    }
}

export default AuthApi;
