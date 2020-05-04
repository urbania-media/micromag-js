import createScreenFromType from './createScreenFromType';

const createDefaultStory = () => ({
    components: [
        createScreenFromType('video'),
        createScreenFromType('map'),
        createScreenFromType('gallery'),
    ],
});

export default createDefaultStory;
