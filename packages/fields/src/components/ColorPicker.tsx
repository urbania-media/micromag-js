import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import React, { useCallback, useMemo } from 'react';
import { SketchPicker } from 'react-color';
import tinycolor from 'tinycolor2';
import { v4 as uuid } from 'uuid';

import { useGetColors } from '@micromag/core/contexts';

import styles from '../styles/colorpickler.module.css';

interface ColorPickerFieldProps {
    value?: { color?: string; alpha?: number } | null;
    disableAlpha?: boolean;
    className?: string | null;
    disabled?: boolean;
    onChange?: ((...args: unknown[]) => void) | null;
}

function ColorPickerField({
    value = null,
    disableAlpha = false,
    className = null,
    disabled = false,
    onChange = null,
    ...props
}: ColorPickerFieldProps) {
    const getColors = useGetColors();
    const colors = useMemo(
        () => (getColors() || []).map((c) => ({ color: c.color, title: uuid() })),
        [getColors],
    );

    const { color = null, alpha = null } = value || {};

    const finalColor = useMemo(() => {
        let newColor = null;
        if (color !== null) {
            newColor = !isEmpty(color) ? tinycolor(color) : null;
        }
        if (alpha !== null) {
            if (newColor === null) {
                newColor = tinycolor('#000');
            }
            newColor.setAlpha(alpha);
        }
        return newColor !== null ? newColor.toRgb() : '';
    }, [color, alpha]);

    const onPickerChange = useCallback(
        (newValue) => {
            if (onChange !== null && newValue !== null) {
                // console.log('new color', newValue); // eslint-disable-line
                onChange({
                    color: newValue.hex,
                    alpha: newValue.rgb.a,
                });
            }
        },
        [onChange],
    );

    return (
        <div
            className={classNames([
                styles.container,
                'position-relative',
                'p-1',
                {
                    'opacity-50': disabled,
                },
                className,
            ])}
        >
            {disabled ? (
                <div
                    className="position-absolute w-100 h-100 top-0 start-0"
                    style={{
                        zIndex: 2,
                    }}
                />
            ) : null}
            <SketchPicker
                color={finalColor}
                presetColors={colors}
                styles={{
                    picker: {
                        boxShadow: 'none',
                    },
                    label: {
                        color: 'inherit',
                    },
                }}
                onChange={!disabled ? onPickerChange : null}
                disableAlpha={disableAlpha}
                {...props}
            />
        </div>
    );
}

export default ColorPickerField;
