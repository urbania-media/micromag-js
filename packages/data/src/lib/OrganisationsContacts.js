import Base from './Base';

class OrganisationsContactsApi extends Base {
    constructor(opts = {}) {
        super({
            ...opts,
            routes: {
                index: 'organisations/:organisation/contacts',
                create: 'organisations/:organisation/contacts',
                show: 'organisations/:organisation/contacts/:type',
                update: 'organisations/:organisation/contacts/:contact',
                ...(opts.routes || null),
            },
        });
    }

    findByType(organisation, type) {
        return this.requestGet(
            this.route('show', {
                organisation,
                type,
            }),
        );
    }

    get(organisation, query) {
        return this.requestGet(
            this.route('index', {
                organisation,
            }),
            query,
        );
    }

    create(organisation, data) {
        return this.requestPost(
            this.route('create', {
                organisation,
            }),
            data,
        );
    }

    update(organisation, contact, data) {
        return this.requestPut(
            this.route('update', {
                organisation,
                contact,
            }),
            data,
        );
    }
}

export default OrganisationsContactsApi;
