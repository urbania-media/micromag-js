import Base from './Base';

class QuizApi extends Base {
    constructor(opts = {}) {
        super({
            ...opts,
            routes: {
                results: '/quiz/:screen',
                store: '/quiz',
                update: '/quiz/:quiz',
                delete: '/quiz/:quiz',
                ...(opts.routes || null),
            },
        });
    }

    results(id) {
        return this.requestGet(
            this.route('results', {
                quiz: id,
            }),
        );
    }

    create(data) {
        return this.requestPost(this.route('store'), data);
    }

    update(id, data) {
        return this.requestPut(
            this.route('update', {
                quiz: id,
            }),
            data,
        );
    }

    delete(id) {
        return this.requestDelete(
            this.route('delete', {
                quiz: id,
            }),
        );
    }
}

export default QuizApi;
