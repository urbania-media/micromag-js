import { postJSON, getJSON, getCSRFHeaders } from '@folklore/fetch';
import { stringify as stringifyQuery } from 'query-string';
import { generatePath } from '@folklore/routes';

class Base {
    constructor(opts = {}) {
        this.options = {
            routes: {},
            ...opts,
            baseUrl: opts.baseUrl || 'https://micromag.ca/api',
        };
    }

    requestGet(path, query = null) {
        const queryString =
            query !== null ? stringifyQuery(query, { arrayFormat: 'bracket' }) : null;
        return getJSON(
            `${this.getFullUrl(path)}${
                queryString !== null && queryString.length > 0 ? `?${queryString}` : ''
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

    requestPut(path, data) {
        return postJSON(
            this.getFullUrl(path),
            {
                _method: 'PUT',
                ...data,
            },
            {
                credentials: 'include',
                headers: getCSRFHeaders(),
            },
        );
    }

    requestDelete(path) {
        return this.requestPost(path, {
            _method: 'DELETE',
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
