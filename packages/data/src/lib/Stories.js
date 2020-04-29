import Base from './Base';

class StoriesApi extends Base {
    constructor(opts = {}) {
        super({
            ...opts,
            routes: {
                index: 'stories',
                show: 'stories/:story',
                store: 'stories',
                update: 'stories/:story',
                delete: 'stories/:story',
                ...(opts.routes || null),
            },
        });
    }

    find(id) {
        return this.requestGet(
            this.route('show', {
                story: id,
            }),
        );
    }

    findBySlug(slug) {
        return this.requestGet(
            this.route('show', {
                story: slug,
            }),
        );
    }

    get(query = {}, page = 1, count = 10) {
        const finalQuery = {
            ...query,
        };
        if (page !== null) {
            finalQuery.page = page;
        }
        if (count !== null) {
            finalQuery.count = count;
        }
        return this.requestGet(this.route('index'), finalQuery);
    }

    getRecents(count = 10) {
        return this.get(
            {
                sort: 'updated_at',
                sort_direction: 'desc',
            },
            null,
            count,
        );
    }

    create(data) {
        return this.requestPost(this.route('store'), data);
    }

    update(id, data) {
        return this.requestPost(
            this.route('update', {
                story: id,
            }),
            data,
        );
    }

    delete(id) {
        return this.requestDelete(
            this.route('delete', {
                story: id,
            }),
        );
    }
}

export default StoriesApi;
