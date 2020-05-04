import createScreenFromType from './createScreenFromType';

const createDefaultStory = () => ({
    components: [
        createScreenFromType('text-video'),
        createScreenFromType('text-image'),
        createScreenFromType('gallery'),
    ],
});

export default createDefaultStory;
