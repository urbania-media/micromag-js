import { validate } from '../../utils';
import TextStyleDefinition from '../definitions/TextStyle.json';

const TextStyle = ({ fontFamily = null, fontSize = null, lineHeight = null, color = null }) => {
    const content = {
        fontFamily,
        fontSize,
        lineHeight: lineHeight ? Math.floor(fontSize * lineHeight) : null,
        textColor: color && color.color ? color.color : null,
    };
    return validate(content, TextStyleDefinition);
};

export default TextStyle;
