import Base from './Base';

import OrganisationsTeam from './OrganisationsTeam';

class OrganisationsApi extends Base {
    constructor(opts = {}) {
        super({
            ...opts,
            routes: {
                index: 'organisations',
                create: 'organisations',
                show: 'organisations/:organisation',
                ...(opts.routes || null),
            },
        });

        this.team = new OrganisationsTeam(opts);
    }

    find(id) {
        return this.requestGet(
            this.route('show', {
                organisation: id,
            }),
        );
    }

    findBySlug(slug) {
        return this.requestGet(
            this.route('show', {
                organisation: slug,
            }),
        );
    }

    get() {
        return this.requestGet(this.route('index'));
    }

    create(data) {
        return this.requestPost(this.route('create'), data);
    }
}

export default OrganisationsApi;
