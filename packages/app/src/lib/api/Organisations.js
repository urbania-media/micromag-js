import Base from './Base';

class OrganisationsApi extends Base {
    constructor(opts = {}) {
        super({
            ...opts,
            routes: {
                index: 'organisations',
                show: 'organisations/:organisation',
                ...opts.routes || null,
            }
        });
    }

    find(id) {
        return this.requestGet(this.route('show', {
            organisation: id,
        }));
    }

    findBySlug(slug) {
        return this.requestGet(this.route('show', {
            organisation: slug,
        }));
    }

    get() {
        return this.requestGet(this.route('index'));
    }
}

export default OrganisationsApi;
