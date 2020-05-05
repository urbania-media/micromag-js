import createScreenFromType from './createScreenFromType';

const createDefaultStory = () => ({
    components: [
        createScreenFromType('image'),
        createScreenFromType('ad'),
        // createScreenFromType('video'),
    ],
});

export default createDefaultStory;
