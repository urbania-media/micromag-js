import { faMusic } from '@fortawesome/free-solid-svg-icons/faMusic';

import InlineIcon from '../icons/Inline';
import PlaceholderBlock, { PlaceholderBlockProps } from '../partials/PlaceholderBlock';

export function Audio({ width, height, ...props }: PlaceholderBlockProps) {
    return (
        <PlaceholderBlock {...props}>
            <InlineIcon
                icon={faMusic}
                style={{
                    width,
                    height,
                }}
                className="d-block m-auto"
            />
        </PlaceholderBlock>
    );
}

export default Audio;
