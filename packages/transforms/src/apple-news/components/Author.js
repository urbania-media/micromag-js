import TextDefinition from '../definitions/Text.json';
import TextElement from '../elements/TextElement';

const Author = (story, text) =>
    TextElement(story, text, 'text', TextDefinition, { textStyle: 'style-author' });

export default Author;
