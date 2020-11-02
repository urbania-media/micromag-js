import Base from './Base';

import OrganisationsTeam from './OrganisationsTeam';
import OrganisationsContacts from './OrganisationsContacts';

class OrganisationsApi extends Base {
    constructor(opts = {}) {
        super({
            ...opts,
            routes: {
                index: 'organisations',
                create: 'organisations',
                update: 'organisations/:organisation',
                show: 'organisations/:organisation',
                ...(opts.routes || null),
            },
        });

        this.team = new OrganisationsTeam(opts);
        this.contacts = new OrganisationsContacts(opts);
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

    update(id, data) {
        return this.requestPut(
            this.route('update', {
                organisation: id,
            }),
            data,
        );
    }
}

export default OrganisationsApi;
