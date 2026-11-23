import { faAd } from '@fortawesome/free-solid-svg-icons/faAd';

import InlineIcon from '../icons/Inline';
import PlaceholderBlock, { PlaceholderBlockProps } from '../partials/PlaceholderBlock';

export function AdFrame({ width, height, ...props }: PlaceholderBlockProps) {
    return (
        <PlaceholderBlock {...props}>
            <InlineIcon icon={faAd} style={{ width, height }} />
        </PlaceholderBlock>
    );
}

export default AdFrame;
