import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons/faMapMarkedAlt';

import InlineIcon from '../icons/Inline';
import PlaceholderBlock, { PlaceholderBlockProps } from '../partials/PlaceholderBlock';

export function MapPath({ width, height, ...props }: PlaceholderBlockProps) {
    return (
        <PlaceholderBlock {...props}>
            <InlineIcon
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
