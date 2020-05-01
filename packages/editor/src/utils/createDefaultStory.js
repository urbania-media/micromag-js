import createScreenFromType from './createScreenFromType';

const createDefaultStory = () => ({
    components: [createScreenFromType('gallery'), createScreenFromType('ad')],
});

export default createDefaultStory;
