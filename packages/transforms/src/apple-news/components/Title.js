import TitleDefinition from '../definitions/Title.json';
import GenericText from '../elements/GenericText';

const Title = (story, title) => GenericText(story, title, 'title', TitleDefinition);

export default Title;
