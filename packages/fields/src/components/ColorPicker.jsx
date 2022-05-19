/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';
import { SketchPicker } from 'react-color';
import tinycolor from 'tinycolor2';
import { v4 as uuid } from 'uuid';
import { useGetColors } from '@micromag/core/contexts';

// import * as AppPropTypes from '../../lib/PropTypes';

const propTypes = {
    value: PropTypes.shape({
        color: PropTypes.string,
        alpha: PropTypes.number,
    }),
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    value: null,
    className: null,
    onChange: null,
};

const ColorPickerField = ({ className, value, onChange }) => {
    const getColors = useGetColors();
    const colors = useMemo(
        () => (getColors() || []).map((c) => ({ color: c.color, title: uuid() })),
        [getColors],
    );

    const color = useMemo(() => {
        if (value !== null) {
            const newColor = tinycolor(value.color);
            newColor.setAlpha(value.alpha);
            return newColor;
        }
        return '';
    }, [value]);

    const onPickerChange = useCallback(
        (newValue) => {
            if (onChange !== null) {
                onChange({
                    color: newValue.hex,
                    alpha: newValue.rgb.a,
                });
            }
        },
        [onChange],
    );

    return (
        <div className={className}>
            <SketchPicker
                color={color}
                presetColors={colors}
                styles={{
                    picker: {
                        boxShadow: 'none',
                    },
                    label: {
                        color: '#FFF',
                    },
                }}
                onChange={onPickerChange}
            />
        </div>
    );
};

ColorPickerField.propTypes = propTypes;
ColorPickerField.defaultProps = defaultProps;

export default ColorPickerField;
