import { validate } from '../../utils';
import TextStyleDefinition from '../definitions/TextStyle.json';

const TextStyle = ({ fontFamily = null, fontSize = null, lineHeight = null, color = null }) => {
    const content = {
        fontFamily,
        fontSize,
        lineHeight,
        color,
    };
    return validate(content, TextStyleDefinition);
};

export default TextStyle;
