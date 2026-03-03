import AudioDefinition from '../definitions/Audio.json';
import MediaElement from '../elements/MediaElement';

const Audio = (story, audio) => MediaElement(story, audio, 'audio', AudioDefinition);

export default Audio;
