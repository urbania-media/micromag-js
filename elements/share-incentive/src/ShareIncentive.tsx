/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';

import type { BoxStyle, TextElement } from '@micromag/core';
import { getColorAsString, getStyleFromBox } from '@micromag/core/utils';
import Text from '@micromag/element-text';

import styles from './styles.module.css';

interface ShareIncentiveProps {
    className?: string | null;
    label?: TextElement | null;
    boxStyle?: BoxStyle | null;
}

function ShareIncentive({ className = null, label = null, boxStyle = null }: ShareIncentiveProps) {
    const { backgroundColor = null } = boxStyle || {};
    const bgColor = getColorAsString(backgroundColor);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <div
                className={styles.box}
                style={{
                    ...getStyleFromBox(boxStyle),
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 10 10"
                    className={styles.tip}
                    fill={bgColor}
                >
                    <polygon points="0,0 0,10 10,10" />
                </svg>
                <Text className={styles.text} {...label} />
            </div>
        </div>
    );
}

export default ShareIncentive;
