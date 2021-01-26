import HeadingDefinition from '../definitions/Heading.json';
import TextElement from '../elements/TextElement';

const Heading2 = (story, heading) => TextElement(story, heading, 'heading2', HeadingDefinition);

export default Heading2;
