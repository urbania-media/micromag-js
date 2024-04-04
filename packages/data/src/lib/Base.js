import { postJSON, getJSON, getCSRFHeaders } from '@folklore/fetch';
import { generatePath } from '@folklore/routes';
import queryString from 'query-string';

class Base {
    constructor(opts = {}) {
        this.options = {
            routes: {},
            ...opts,
            baseUrl: opts.baseUrl || 'https://micromag.ca/api',
        };
    }

    requestGet(path, query = null) {
        const finalQueryString =
            query !== null ? queryString.stringify(query, { arrayFormat: 'bracket' }) : null;
        return getJSON(
            `${this.getFullUrl(path)}${
                finalQueryString !== null && finalQueryString.length > 0
                    ? `?${finalQueryString}`
                    : ''
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
