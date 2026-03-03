import { allScreens } from '../screens';
import defaultTheme from '../themes';

const allScreensStory = {
    title: 'All screens',
    metadata: {
        description: 'A mock story containing all of the possible screens available to build a Micromag.'
    },
    theme: defaultTheme,
    components: allScreens
};

export default allScreensStory;
