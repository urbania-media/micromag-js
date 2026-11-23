import { faImage } from '@fortawesome/free-solid-svg-icons/faImage';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons/faMapMarkerAlt';
import classNames from 'classnames';

import InlineIcon from '../icons/Inline';
import PlaceholderBlock, { PlaceholderBlockProps } from '../partials/PlaceholderBlock';

import styles from '../../styles/placeholders/map.module.css';

interface MapPlaceholderProps extends PlaceholderBlockProps {
    withImages?: boolean;
}

export function Map({ withImages = false, className, ...props }: MapPlaceholderProps) {
    const icon = withImages ? faImage : faMapMarkerAlt;
    return (
        <PlaceholderBlock
            width={null}
            height={null}
            {...props}
            className={classNames([styles.container, className])}
        >
            <InlineIcon icon={icon} className={styles.icon} />
            <InlineIcon icon={icon} className={styles.icon} />
            <InlineIcon icon={icon} className={styles.icon} />
            <InlineIcon icon={icon} className={styles.icon} />
        </PlaceholderBlock>
    );
}

export default Map;
