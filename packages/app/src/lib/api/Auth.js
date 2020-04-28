import Base from './Base';

class AuthApi extends Base {
    constructor(opts = {}) {
        super({
            usesCookie: false,
            ...opts,
            routes: {
                check: 'auth/check',
                login: 'auth/login',
                logout: 'auth/logout',
                register: 'register',
                cookie: 'csrf-cookie',
                ...(opts.routes || null),
            },
        });
    }

    check() {
        const { usesCookie } = this.options;
        return (usesCookie ? this.cookie() : Promise.resolve()).then(() =>
            this.requestGet(this.route('check')),
        );
    }

    login(email, password) {
        const { usesCookie } = this.options;
        return (usesCookie ? this.cookie() : Promise.resolve()).then(() =>
            this.requestPost(this.route('login'), {
                email,
                password,
            }),
        );
    }

    logout() {
        return this.requestPost(this.route('logout'));
    }

    register(data) {
        return this.requestPost(this.route('register'), data);
    }

    cookie() {
        return fetch(this.getFullUrl(this.route('cookie')), {
            method: 'GET',
            credentials: 'include',
        });
    }
}

export default AuthApi;
