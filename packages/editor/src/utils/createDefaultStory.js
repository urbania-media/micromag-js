import createScreenFromType from './createScreenFromType';

const createDefaultStory = () => ({
    components: [createScreenFromType('slideshow'), createScreenFromType('text')],
});

export default createDefaultStory;
