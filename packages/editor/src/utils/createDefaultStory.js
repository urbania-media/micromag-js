import createScreenFromType from './createScreenFromType';

const createDefaultStory = () => ({
    components: [
        // createScreenFromType('survey-multiple-choice'),
        // createScreenFromType('survey-yes-no'),
        createScreenFromType('ad'),
        createScreenFromType('ad-slot'),
    ],
});

export default createDefaultStory;
