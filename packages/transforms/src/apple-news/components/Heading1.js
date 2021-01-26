import HeadingDefinition from '../definitions/Heading.json';
import TextElement from '../elements/TextElement';

const Heading1 = (story, heading) => TextElement(story, heading, 'heading1', HeadingDefinition);

export default Heading1;
