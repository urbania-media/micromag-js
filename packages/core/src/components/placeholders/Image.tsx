import { faImage } from '@fortawesome/free-solid-svg-icons/faImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PlaceholderBlock, { PlaceholderBlockProps } from '../partials/PlaceholderBlock';

interface PlaceholderImageProps extends PlaceholderBlockProps {
    width?: number | string;
    height?: number | string;
    className?: string | null;
}

export function PlaceholderImage({ width, height, className, ...props }: PlaceholderImageProps) {
    return (
        <PlaceholderBlock {...props} className={className}>
            <FontAwesomeIcon
                icon={faImage}
                className="d-block m-auto"
                style={{
                    width,
                    height,
                }}
            />
        </PlaceholderBlock>
    );
}

export default PlaceholderImage;
