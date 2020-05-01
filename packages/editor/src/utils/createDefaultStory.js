import createScreenFromType from './createScreenFromType';

const createDefaultStory = () => ({
    components: [
        createScreenFromType('video'),
        createScreenFromType('text-image'),
        createScreenFromType('gallery'),
    ],
});

export default createDefaultStory;
