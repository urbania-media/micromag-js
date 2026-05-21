import { faVideo } from '@fortawesome/free-solid-svg-icons/faVideo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PlaceholderBlock, { PlaceholderBlockProps } from '../partials/PlaceholderBlock';

export function Video({ width, height, ...props }: PlaceholderBlockProps) {
    return (
        <PlaceholderBlock {...props}>
            <FontAwesomeIcon
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
