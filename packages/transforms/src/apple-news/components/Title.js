import TitleDefinition from '../definitions/Title.json';
import TextElement from '../elements/TextElement';

const Title = (story, title) => TextElement(story, title, 'title', TitleDefinition);

export default Title;
