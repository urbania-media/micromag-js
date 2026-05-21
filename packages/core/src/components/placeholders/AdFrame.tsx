import { faAd } from '@fortawesome/free-solid-svg-icons/faAd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PlaceholderBlock, { PlaceholderBlockProps } from '../partials/PlaceholderBlock';

export function AdFrame({ width, height, ...props }: PlaceholderBlockProps) {
    return (
        <PlaceholderBlock {...props}>
            <FontAwesomeIcon icon={faAd} style={{ width, height }} />
        </PlaceholderBlock>
    );
}

export default AdFrame;
