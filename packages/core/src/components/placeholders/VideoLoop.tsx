import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay';
import { faRedo } from '@fortawesome/free-solid-svg-icons/faRedo';

import InlineIcon from '../icons/Inline';
import PlaceholderBlock, { PlaceholderBlockProps } from '../partials/PlaceholderBlock';

export function VideoLoop({ width, height, ...props }: PlaceholderBlockProps) {
    return (
        <PlaceholderBlock {...props}>
            <InlineIcon
                icon={faPlay}
                style={{
                    width,
                    height,
                }}
            />
            <InlineIcon
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
