import Base from './Base';

import MediasApi from './Medias';
import ContributionsApi from './Contributions';
import QuizApi from './Quiz';

class Api extends Base {
    constructor(opts = {}) {
        super(opts);
        this.medias = new MediasApi(opts);
        this.contributions = new ContributionsApi(opts);
        this.quiz = new QuizApi(opts);
    }
}

export default Api;
