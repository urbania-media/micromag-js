import createScreenFromType from './createScreenFromType';

const createDefaultStory = () => ({
    components: [
        createScreenFromType('map'),
        createScreenFromType('map-path'),
        createScreenFromType('video'),
    ],
});

export default createDefaultStory;
