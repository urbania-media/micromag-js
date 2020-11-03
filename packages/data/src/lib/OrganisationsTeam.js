import Base from './Base';

class OrganisationsApi extends Base {
    constructor(opts = {}) {
        super({
            ...opts,
            routes: {
                index: 'organisations/:organisation/members',
                create: 'organisations/:organisation/members',
                edit: 'organisations/:organisation/members/:member',
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
        }).then((items) => (items !== null && items.length > 0 ? items[0] : null));
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

    update(organisation, member, data) {
        return this.requestPut(
            this.route('edit', {
                organisation,
                member,
            }),
            data,
        );
    }

    delete(organisation, member) {
        return this.requestDelete(this.route('edit'), { organisation, member });
    }
}

export default OrganisationsApi;
