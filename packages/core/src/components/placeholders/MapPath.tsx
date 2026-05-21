import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons/faMapMarkedAlt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PlaceholderBlock, { PlaceholderBlockProps } from '../partials/PlaceholderBlock';

export function MapPath({ width, height, ...props }: PlaceholderBlockProps) {
    return (
        <PlaceholderBlock {...props}>
            <FontAwesomeIcon
                icon={faMapMarkedAlt}
                style={{
                    width,
                    height,
                }}
            />
        </PlaceholderBlock>
    );
}

export default MapPath;
