import { validate } from '../../utils';
import TextStyleDefinition from '../definitions/format/TextStyle.json';

const TextStyle = ({ fontFamily = null, fontSize = null }) => {
    console.log('STYLE', fontFamily, fontSize); // eslint-disable-line

    const content = {
        fontFamily,
        fontSize,
    };
    return validate(content, TextStyleDefinition) ? content : null;
};

export default TextStyle;
