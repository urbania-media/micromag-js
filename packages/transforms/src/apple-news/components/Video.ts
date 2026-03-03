import VideoDefinition from '../definitions/Video.json';
import MediaElement from '../elements/MediaElement';

const Video = (story, video) => MediaElement(story, video, 'video', VideoDefinition);

export default Video;
