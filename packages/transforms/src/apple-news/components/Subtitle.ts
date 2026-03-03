import TitleDefinition from '../definitions/Title.json';
import TextElement from '../elements/TextElement';

const Subtitle = (story, subtitle) => TextElement(story, subtitle, 'title', TitleDefinition);

export default Subtitle;
