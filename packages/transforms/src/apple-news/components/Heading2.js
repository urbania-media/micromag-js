import HeadingDefinition from '../definitions/Heading.json';
import GenericText from '../elements/GenericText';

const Heading2 = (story, heading) => GenericText(story, heading, 'heading2', HeadingDefinition);

export default Heading2;
