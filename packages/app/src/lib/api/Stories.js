import Base from './Base';

class OrganisationsApi extends Base {
    constructor(opts = {}) {
        super({
            ...opts,
            routes: {
                index: 'stories',
                show: 'stories/:story',
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
        return this.requestGet(this.route('index'), {
            ...query,
            page,
            count,
        });
    }
}

export default OrganisationsApi;
