import Base from './Base';

class StoriesPublications extends Base {
    constructor(opts = {}) {
        super({
            ...opts,
            routes: {
                index: 'stories/:story/publications',
                create: 'stories/:story/publications',
                show: 'stories/:story/publications/:publication',
                ...(opts.routes || null),
            },
        });
    }

    find(story, id) {
        return this.requestGet(
            this.route('show', {
                story,
                publication: id,
            }),
        );
    }

    get(story, query = {}, page = 1, count = 10) {
        const finalQuery = {
            ...query,
        };
        if (page !== null) {
            finalQuery.page = page;
        }
        if (count !== null) {
            finalQuery.count = count;
        }
        return this.requestGet(
            this.route('index', {
                story,
            }),
            finalQuery,
        );
    }

    create(story, data) {
        return this.requestPost(
            this.route('create', {
                story,
            }),
            data,
        );
    }
}

export default StoriesPublications;
