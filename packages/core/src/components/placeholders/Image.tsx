import { faImage } from '@fortawesome/free-solid-svg-icons/faImage';

import InlineIcon from '../icons/Inline';
import PlaceholderBlock, { PlaceholderBlockProps } from '../partials/PlaceholderBlock';

interface PlaceholderImageProps extends PlaceholderBlockProps {
    width?: number | string;
    height?: number | string;
    className?: string | null;
}

export function PlaceholderImage({ width, height, className, ...props }: PlaceholderImageProps) {
    return (
        <PlaceholderBlock {...props} className={className}>
            <InlineIcon
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
