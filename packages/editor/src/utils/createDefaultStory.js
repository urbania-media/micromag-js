import createScreenFromType from './createScreenFromType';

const createDefaultStory = () => ({
    components: [createScreenFromType('map'), createScreenFromType('map-path')],
});

export default createDefaultStory;
