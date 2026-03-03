/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import classNames from 'classnames';
import React, { useCallback } from 'react';

import FontStyle from './FontStyle';
import TextAlign from './TextAlign';

import styles from '../styles/font-style-with-align.module.css';

import classNames from 'classnames';

interface FontStylesProps {
    value?: Record<string, unknown>;
    fontStyleName?: string;
    alignName?: string;
    className?: string;
    onChange?: (...args: unknown[]) => void;
}

function FontStyles({
    value = null,
    fontStyleName = 'fontStyle',
    alignName = 'align',
    className = null,
    onChange = null,
}) {
    const fontStyleValue = value !== null ? value[fontStyleName] || null : null;
    const alignValue = value !== null ? value[alignName] || null : null;
    const onFontStyleChange = useCallback(
        (newFontStyleValue) => {
            const newValue = {
                ...value,
                [fontStyleName]: newFontStyleValue,
            };
            if (onChange !== null) {
                onChange(newValue);
            }
        },
        [value, fontStyleValue, fontStyleName, onChange],
    );
    const onAlignChange = useCallback(
        (newAlignValue) => {
            const newValue = {
                ...value,
                [alignName]: newAlignValue,
            };
            if (onChange !== null) {
                onChange(newValue);
            }
        },
        [value, alignName, onChange],
    );
    return (
        <div
            className={classNames([
                'd-flex',
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <FontStyle
                className={styles.item}
                buttonClassName={styles.button}
                value={fontStyleValue}
                onChange={onFontStyleChange}
            />
            <TextAlign
                className={styles.item}
                buttonClassName={styles.button}
                value={alignValue}
                onChange={onAlignChange}
            />
        </div>
    );
}

export default FontStyles;
