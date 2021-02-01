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

    results(screenId) {
        return this.requestGet(
            this.route('results', {
                screen: screenId,
            }),
        );
    }

    create(data) {
        return this.requestPost(this.route('store'), data);
    }
}

export default QuizApi;
