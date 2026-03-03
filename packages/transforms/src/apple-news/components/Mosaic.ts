import MosaicDefinition from '../definitions/Mosaic.json';
import GalleryElement from '../elements/GalleryElement';

const Mosaic = (story, mosaic) => GalleryElement(story, mosaic, 'mosaic', MosaicDefinition);

export default Mosaic;
