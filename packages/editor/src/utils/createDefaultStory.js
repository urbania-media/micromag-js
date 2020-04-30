import createScreenFromType from './createScreenFromType';

const createDefaultStory = () => ({
    components: [createScreenFromType('video'), createScreenFromType('ad')],
});

export default createDefaultStory;
