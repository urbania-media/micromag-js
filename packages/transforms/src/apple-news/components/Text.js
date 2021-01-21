import { validate } from '../../utils';
import TextDefinition from '../definitions/format/Text.json';

const Text = (text) => {
    const { body } = text || {};
    console.log('TEXT', body); // eslint-disable-line

    const content = {
        role: 'text',
        body,
    };
    return validate(content, TextDefinition) ? content : null;
};

export default Text;
