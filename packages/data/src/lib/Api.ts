import Base from './Base';
import ContributionsApi from './Contributions';
import MediasApi from './Medias';
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
