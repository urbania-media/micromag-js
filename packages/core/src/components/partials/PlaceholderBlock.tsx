import classNames from 'classnames';
import React from 'react';

import styles from '../../styles/partials/placeholder-block.module.css';

interface PlaceholderBlockProps {
    width?: number | string;
    height?: number | string;
    outline?: boolean;
    className?: string;
    boxClassName?: string;
    children?: React.ReactNode;
    withInvertedColors?: boolean;
}

const PlaceholderBlock = ({
    width = '100%',
    height = '3em',
    outline = false,
    className = null,
    boxClassName = null,
    withInvertedColors = true,
    children = null,
}) => (
    <div
        className={classNames([
            styles.container,
            {
                [className]: className !== null,
                [styles.outline]: outline,
                [styles.withInvertedColors]: withInvertedColors,
            },
        ])}
    >
        <div
            className={classNames([
                styles.box,
                {
                    [boxClassName]: boxClassName !== null,
                },
            ])}
            style={{
                width,
                height,
            }}
        >
            {children}
        </div>
    </div>
);

export default PlaceholderBlock;
