import { faVideo } from '@fortawesome/free-solid-svg-icons/faVideo';

import InlineIcon from '../icons/Inline';
import PlaceholderBlock, { PlaceholderBlockProps } from '../partials/PlaceholderBlock';

export function Video({ width, height, ...props }: PlaceholderBlockProps) {
    return (
        <PlaceholderBlock {...props}>
            <InlineIcon
                icon={faVideo}
                style={{
                    width,
                    height,
                }}
                className="d-block m-auto"
            />
        </PlaceholderBlock>
    );
}

export default Video;
