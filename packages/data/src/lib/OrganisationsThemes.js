import Base from './Base';

class OrganisationsThemesApi extends Base {
    constructor(opts = {}) {
        super({
            ...opts,
            routes: {
                index: 'organisations/:organisation/themes',
                create: 'organisations/:organisation/themes',
                edit: 'organisations/:organisation/themes/:theme',
                show: 'organisations/:organisation/themes/:theme',
                ...(opts.routes || null),
            },
        });
    }

    find(organisation, id) {
        return this.requestGet(
            this.route('show', {
                organisation,
                theme: id,
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

    update(organisation, theme, data) {
        return this.requestPut(
            this.route('edit', {
                organisation,
                theme,
            }),
            data,
        );
    }

    delete(organisation, theme) {
        return this.requestDelete(this.route('edit', { organisation, theme }));
    }
}

export default OrganisationsThemesApi;
