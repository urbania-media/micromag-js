import createScreenFromType from './createScreenFromType';

const createDefaultStory = () => ({
    components: [createScreenFromType('survey-yes-no'), createScreenFromType('map')],
});

export default createDefaultStory;
