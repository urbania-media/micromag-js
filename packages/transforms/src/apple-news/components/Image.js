import { validate } from '../../utils';
import ImageDefinition from '../definitions/Image.json';

const Image = (story, image) => {
    const { url } = image || {};
    console.log('IMAGE', image, url); // eslint-disable-line

    const content = {
        role: 'image',
        URL: url,
    };
    const component = validate(content, ImageDefinition);
    return {
        story,
        component,
    };
};

export default Image;
