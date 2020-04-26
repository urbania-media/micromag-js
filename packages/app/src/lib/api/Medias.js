import Base from './Base';

class MediasApi extends Base {
    constructor(opts = {}) {
        super({
            ...opts,
            routes: {
                index: 'medias',
                show: 'medias/:media',
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
}

export default MediasApi;
