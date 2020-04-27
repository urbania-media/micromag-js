import createScreenFromType from './createScreenFromType';

const createDefaultStory = () => ({
    components: [createScreenFromType('title'), createScreenFromType('video')],
});

export default createDefaultStory;
