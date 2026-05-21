import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay';
import { faRedo } from '@fortawesome/free-solid-svg-icons/faRedo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PlaceholderBlock, { PlaceholderBlockProps } from '../partials/PlaceholderBlock';

export function VideoLoop({ width, height, ...props }: PlaceholderBlockProps) {
    return (
        <PlaceholderBlock {...props}>
            <FontAwesomeIcon
                icon={faPlay}
                style={{
                    width,
                    height,
                }}
            />
            <FontAwesomeIcon
                icon={faRedo}
                style={{
                    width,
                    height,
                }}
            />
        </PlaceholderBlock>
    );
}

export default VideoLoop;
