import createScreenFromType from './createScreenFromType';

const createDefaultStory = () => ({
    components: [createScreenFromType('text-video'), createScreenFromType('ad')],
});

export default createDefaultStory;
