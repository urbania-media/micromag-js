import TitleDefinition from '../definitions/Title.json';
import GenericText from '../elements/GenericText';

const Title = (story, text) => GenericText(story, text, 'title', TitleDefinition);

export default Title;
