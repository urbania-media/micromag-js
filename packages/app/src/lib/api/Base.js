import { postJSON, getJSON, getCSRFHeaders } from '@folklore/fetch';
import { generatePath } from 'react-router';
import { stringify as stringifyQuery } from 'query-string';

class Base {
    constructor(opts = {}) {
        this.options = {
            routes: {},
            ...opts,
            baseUrl: opts.baseUrl || 'https://micromag.ca/api',
        };
    }

    requestGet(path, query = null) {
        const queryString = query !== null ? stringifyQuery(query) : null;
        return getJSON(
            `${this.getFullUrl(path)}${
                queryString !== null && queryString.length > 0 ? `?${queryString}` : null
            }`,
            {
                credentials: 'include',
                headers: getCSRFHeaders(),
            },
        );
    }

    requestPost(path, data) {
        return postJSON(this.getFullUrl(path), data, {
            credentials: 'include',
            headers: getCSRFHeaders(),
        });
    }

    route(route, params) {
        const { routes } = this.options;
        return generatePath(routes[route] || route, params);
    }

    getFullUrl(path) {
        const { baseUrl } = this.options;
        return `${baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
    }
}

export default Base;
