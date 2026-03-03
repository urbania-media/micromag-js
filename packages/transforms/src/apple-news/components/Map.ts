import MapDefinition from '../definitions/Map.json';
import MapElement from '../elements/MapElement';

const Map = (story, map) => MapElement(story, map, 'map', MapDefinition);

export default Map;
