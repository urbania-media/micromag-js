import classNames from 'classnames';
import React from 'react';

import type { BoxStyle, TextElement } from '@micromag/core';
import { getStyleFromBox } from '@micromag/core/utils';
import Text from '@micromag/element-text';

import styles from './styles.module.css';

interface BadgeProps {
    label?: TextElement | null;
    boxStyle?: BoxStyle | null;
    className?: string | null;
    labelClassName?: string | null;
}

function Badge({
    label = null,
    boxStyle = null,
    className = null,
    labelClassName = null,
}: BadgeProps) {
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
        <div className={classNames([styles.container, className])} style={boxStyles}>
            <span className={classNames([styles.label, labelClassName])}>
                <Text {...label} textStyle={{ ...textStyle, lineHeight: lineHeight || 1 }} inline />
            </span>
        </div>
    );
}

export default Badge;
