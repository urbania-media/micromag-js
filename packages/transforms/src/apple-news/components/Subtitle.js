import TitleDefinition from '../definitions/Title.json';
import GenericText from '../elements/GenericText';

// Check for this one
const Subtitle = (story, subtitle) => GenericText(story, subtitle, 'title', TitleDefinition);

export default Subtitle;
