import classNames from 'classnames';
import React, { CSSProperties } from 'react';

import styles from '../../styles/icons/inline-icon.module.css';

export interface InlineIconDefinition {
    prefix?: string;
    iconName: string;
    icon: [number, number, unknown, unknown, string | string[]];
}

interface InlineIconProps {
    icon: InlineIconDefinition;
    className?: string | null;
    style?: CSSProperties | null;
    title?: string | null;
}

/**
 * Renders a Font Awesome icon definition (ex.: `@fortawesome/free-solid-svg-icons/faRedo`) as an
 * inline svg, like `FontAwesomeIcon`, without the Font Awesome runtime and its injected stylesheet
 */
function InlineIcon({ icon, className = null, style = null, title = null }: InlineIconProps) {
    const {
        prefix = null,
        iconName,
        icon: [width, height, , , pathData] = [0, 0, null, null, ''],
    } = icon;
    const paths = Array.isArray(pathData) ? pathData : [pathData];
    return (
        <svg
            data-prefix={prefix}
            data-icon={iconName}
            className={classNames(['svg-inline--fa', `fa-${iconName}`, styles.icon, className])}
            style={style || undefined}
            role="img"
            viewBox={`0 0 ${width} ${height}`}
            aria-hidden={title === null ? 'true' : undefined}
            xmlns="http://www.w3.org/2000/svg"
        >
            {title !== null ? <title>{title}</title> : null}
            {paths.map((d) => (
                <path key={d} fill="currentColor" d={d} />
            ))}
        </svg>
    );
}

export default InlineIcon;
