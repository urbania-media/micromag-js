import { faVideo } from '@fortawesome/free-solid-svg-icons/faVideo';
import classNames from 'classnames';

import InlineIcon from '../icons/Inline';
import PlaceholderBlock, { PlaceholderBlockProps } from '../partials/PlaceholderBlock';

export function Video360({ width, height, className, ...props }: PlaceholderBlockProps) {
    return (
        <PlaceholderBlock
            {...props}
            className={className}
            boxClassName="d-flex flex-column align-items-center justify-content-center"
        >
            <InlineIcon
                icon={faVideo}
                className="d-block mb-1"
                style={{
                    width,
                    height,
                }}
            />
            <div style={{ fontSize: '0.75em' }}>360</div>
        </PlaceholderBlock>
    );
}

export default Video360;
