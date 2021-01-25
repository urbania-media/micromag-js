import HeadingDefinition from '../definitions/Heading.json';
import GenericText from '../elements/GenericText';

const Heading1 = (story, heading) => GenericText(story, heading, 'heading1', HeadingDefinition);

export default Heading1;
