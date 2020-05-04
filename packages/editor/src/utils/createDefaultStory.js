import createScreenFromType from './createScreenFromType';

const createDefaultStory = () => ({
    components: [
        createScreenFromType('video'),
        createScreenFromType('audio'),
        // createScreenFromType('gallery'),
    ],
});

export default createDefaultStory;
