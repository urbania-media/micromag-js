import Base from './Base';

class MediasApi extends Base {
    constructor(opts = {}) {
        super({
            ...opts,
            routes: {
                index: 'medias',
                tags: 'medias/tags',
                authors: 'medias/authors',
                requestDelete: 'medias/requestDelete/:media',
                show: 'medias/:media',
                store: 'medias',
                update: 'medias/:media',
                delete: 'medias/:media',
                ...(opts.routes || null),
            },
        });
    }

    find(id) {
        return this.requestGet(
            this.route('show', {
                media: id,
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

    getTags(query = {}, count = 10) {
        const finalQuery = {
            ...query,
        };
        if (count !== null) {
            finalQuery.count = count;
        }
        return this.requestGet(this.route('tags'), finalQuery);
    }

    getAuthors(query = {}, count = 10) {
        const finalQuery = {
            ...query,
        };
        if (count !== null) {
            finalQuery.count = count;
        }
        return this.requestGet(this.route('authors'), finalQuery);
    }

    create(data) {
        return this.requestPost(this.route('store'), data);
    }

    update(id, data) {
        return this.requestPut(
            this.route('update', {
                media: id,
            }),
            data,
        );
    }

    requestDeleteMedia(id) {
        return this.requestPost(
            this.route('requestDelete', {
                media: id,
            }),
        );
    }

    delete(id) {
        return this.requestDelete(
            this.route('delete', {
                media: id,
            }),
        );
    }
}

export default MediasApi;
