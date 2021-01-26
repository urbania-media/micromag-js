import ImageDefinition from '../definitions/Image.json';
import ImageElement from '../elements/ImageElement';

const Image = (story, image) => ImageElement(story, image, 'image', ImageDefinition);

export default Image;
