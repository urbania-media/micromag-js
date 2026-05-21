import { faImage } from '@fortawesome/free-solid-svg-icons/faImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PlaceholderBlock, { PlaceholderBlockProps } from '../partials/PlaceholderBlock';

export function AdImage({ width, height, ...props }: PlaceholderBlockProps) {
    return (
        <PlaceholderBlock {...props}>
            <FontAwesomeIcon
                icon={faImage}
                style={{
                    width,
                    height,
                }}
            />
        </PlaceholderBlock>
    );
}

export default AdImage;
