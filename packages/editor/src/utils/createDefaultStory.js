import createScreenFromType from './createScreenFromType';

const createDefaultStory = () => ({
    components: [createScreenFromType('title'), createScreenFromType('image')],
});

export default createDefaultStory;
