import createScreenFromType from './createScreenFromType';

const createDefaultStory = () => ({
    components: [createScreenFromType('slideshow'), createScreenFromType('map')],
});

export default createDefaultStory;
