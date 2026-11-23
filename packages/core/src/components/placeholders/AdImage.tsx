import { faImage } from '@fortawesome/free-solid-svg-icons/faImage';

import InlineIcon from '../icons/Inline';
import PlaceholderBlock, { PlaceholderBlockProps } from '../partials/PlaceholderBlock';

export function AdImage({ width, height, ...props }: PlaceholderBlockProps) {
    return (
        <PlaceholderBlock {...props}>
            <InlineIcon
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
