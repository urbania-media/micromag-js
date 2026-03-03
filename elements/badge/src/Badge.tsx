/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';

import type { BoxStyle, TextElement } from '@micromag/core';
import { getStyleFromBox } from '@micromag/core/utils';
import Text from '@micromag/element-text';

import styles from './styles.module.css';

interface BadgeProps {
    label?: TextElement;
    boxStyle?: BoxStyle;
    className?: string;
    labelClassName?: string;
}

function Badge({ label = null, boxStyle = null, className = null, labelClassName = null }) {
    const { textStyle = null } = label || {};
    const { lineHeight = null } = textStyle || {};
    let boxStyles = null;
    if (boxStyle !== null) {
        boxStyles = {
            ...boxStyles,
            ...getStyleFromBox(boxStyle),
        };
    }
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            style={boxStyles}
        >
            <span
                className={classNames([
                    styles.label,
                    {
                        [labelClassName]: labelClassName !== null,
                    },
                ])}
            >
                <Text {...label} textStyle={{ ...textStyle, lineHeight: lineHeight || 1 }} inline />
            </span>
        </div>
    );
}

export default Badge;
