import Base from './Base';

class ContributionsApi extends Base {
    constructor(opts = {}) {
        super({
            ...opts,
            routes: {
                index: '/api/contributions/:screen',
                store: '/api/contributions',
                update: '/api/contributions/:contribution',
                delete: '/api/contributions/:contribution',
                ...(opts.routes || null),
            },
        });
    }

    get(id, query = {}, page = 1, count = 10) {
        const finalQuery = {
            ...query,
        };
        if (page !== null) {
            finalQuery.page = page;
        }
        if (count !== null) {
            finalQuery.count = count;
        }
        return this.requestGet(this.route('index', { screen: id }), finalQuery);
    }

    create(data) {
        return this.requestPost(this.route('store'), data);
    }

    update(id, data) {
        return this.requestPut(
            this.route('update', {
                contribution: id,
            }),
            data,
        );
    }

    delete(id) {
        return this.requestDelete(
            this.route('delete', {
                contribution: id,
            }),
        );
    }
}

export default ContributionsApi;
