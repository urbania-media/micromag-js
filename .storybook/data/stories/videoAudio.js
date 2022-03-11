import { allScreens } from '../screens';
import defaultTheme from '../themes';

const videoAudioStory = {
    title: 'Video Audio',
    theme: defaultTheme,
    components: allScreens.filter((it) => it.type === 'audio' || it.type === 'video').reverse(),
};

export default videoAudioStory;
