/* eslint-disable react/no-array-index-key */
import classNames from 'classnames';
import isNumber from 'lodash/isNumber';
import React from 'react';

import styles from '../../styles/partials/placeholder-text.module.css';

interface PlaceholderTextProps {
    lines?: number;
    lineMargin?: number | string;
    width?: number | string;
    height?: number | string | null;
    fontSize?: number;
    className?: string | null;
    withInvertedColors?: boolean;
}

function PlaceholderText({
    lines = 1,
    lineMargin = 1,
    width = '100%',
    height = null,
    fontSize = 16,
    className = null,
    withInvertedColors = true,
}: PlaceholderTextProps) {
    const lineHeight =
        height !== null && isNumber(height) ? `${Math.round(height * fontSize)}px` : height;

    const oddWidth = isNumber(width) ? width * 0.9 : '80%';

    return (
        <div
            className={classNames([
                styles.container,
                className,
                {
                    [styles.withInvertedColors]: withInvertedColors,
                },
            ])}
        >
            {[...Array(lines)].map((e, index) => (
                <div
                    key={`line-${index}`}
                    className={styles.line}
                    style={{
                        width: index % 2 === 0 ? width : oddWidth,
                        height: lineHeight,
                        marginTop: lineMargin,
                        marginBottom: lineMargin,
                    }}
                />
            ))}
        </div>
    );
}

export default PlaceholderText;
