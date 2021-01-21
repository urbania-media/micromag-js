import { validate } from '../../utils';
import ImageDefinition from '../definitions/format/Image.json';

const Image = (image) => {
    const { url } = image || {};
    console.log('IMAGE', image, url); // eslint-disable-line

    const content = {
        role: 'image',
        URL: url,
    };
    return validate(content, ImageDefinition) ? content : null;
};

export default Image;
