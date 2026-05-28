/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import classNames from 'classnames';
import React, { useCallback } from 'react';

import FontStyle from './FontStyle';
import TextAlign from './TextAlign';

interface FontStylesProps {
    value?: Record<string, unknown> | null;
    fontStyleName?: string;
    alignName?: string;
    className?: string | null;
    onChange?: ((...args: unknown[]) => void) | null;
}

function FontStyles({
    value = null,
    fontStyleName = 'fontStyle',
    alignName = 'align',
    className = null,
    onChange = null,
}: FontStylesProps) {
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
                'justify-content-between',
                className,
            ])}
        >
            <FontStyle
                value={fontStyleValue}
                onChange={onFontStyleChange}
            />
            <TextAlign
                value={alignValue}
                onChange={onAlignChange}
            />
        </div>
    );
}

export default FontStyles;
