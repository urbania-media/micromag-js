import createScreenFromType from './createScreenFromType';

const createDefaultStory = () => ({
    components: [createScreenFromType('text-video'), createScreenFromType('video')],
});

export default createDefaultStory;
