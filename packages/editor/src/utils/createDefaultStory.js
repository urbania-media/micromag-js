import createScreenFromType from './createScreenFromType';

const createDefaultStory = () => ({
    components: [createScreenFromType('quote'), createScreenFromType('video')],
});

export default createDefaultStory;
