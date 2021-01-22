import TextDefinition from '../definitions/Text.json';
import GenericText from '../elements/GenericText';

const Text = (story, text) => GenericText(story, text, 'text', TextDefinition);

export default Text;
