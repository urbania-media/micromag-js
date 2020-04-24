import { postJSON, getJSON, getCSRFHeaders } from '@folklore/fetch';
import { generatePath } from 'react-router';

class Base {
    constructor(opts = {}) {
        this.options = {
            routes: {},
            ...opts,
            baseUrl: opts.baseUrl || 'https://micromag.ca/api',
        };
    }

    requestGet(path) {
        return getJSON(this.getFullUrl(path), {
            credentials: 'include',
            headers: getCSRFHeaders(),
        });
    }

    requestPost(path, data) {
        return postJSON(this.getFullUrl(path), data, {
            credentials: 'include',
            headers: getCSRFHeaders(),
        });
    }

    getPath(route, params) {
        const { routes } = this.options;
        return generatePath(routes[route] || route, params);
    }

    getFullUrl(path) {
        const { baseUrl } = this.options;
        return `${baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
    }
}

export default Base;
