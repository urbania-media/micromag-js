import TextDefinition from '../definitions/Text.json';
import TextElement from '../elements/TextElement';

const Text = (story, text) => TextElement(story, text, 'text', TextDefinition);

export default Text;
