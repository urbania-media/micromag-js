import Base from './Base';

class OrganisationsApi extends Base {
    constructor(opts = {}) {
        super({
            ...opts,
            routes: {
                index: 'organisations/:organisation/members',
                create: 'organisations/:organisation/members',
                show: 'organisations/:organisation/members/:member',
                show_by_user: 'organisations/:organisation/members/:member',
                ...(opts.routes || null),
            },
        });
    }

    find(organisation, id) {
        return this.requestGet(
            this.route('show', {
                organisation,
                member: id,
            }),
        );
    }

    findByUser(organisation, id) {
        return this.get(organisation, {
            user: id,
        }).then(items => (items !== null && items.length > 0 ? items[0] : null));
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
}

export default OrganisationsApi;
