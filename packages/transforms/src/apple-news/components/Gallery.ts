import GalleryDefinition from '../definitions/Gallery.json';
import GalleryElement from '../elements/GalleryElement';

const Gallery = (story, gallery) => GalleryElement(story, gallery, 'gallery', GalleryDefinition);

export default Gallery;
