/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { SketchPicker } from 'react-color';
import tinycolor from 'tinycolor2';
import { useGetColors } from '@micromag/core/contexts';
import { v4 as uuid } from 'uuid';

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
    const [colors, setColors] = useState([]);
    const getColors = useGetColors();

    useMemo(() => {
        const newColors = (getColors() || []).map((c) => ({ color: c.color, title: uuid() }));
        setColors(newColors);
    }, [setColors]);

    const color = useMemo(() => {
        if (value !== null) {
            const newColor = tinycolor(value.color);
            newColor.setAlpha(value.alpha);
            return newColor;
        }
        return '';
    }, [value]);
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
                onChange={(newValue) => {
                    if (onChange !== null) {
                        onChange({
                            color: newValue.hex,
                            alpha: newValue.rgb.a,
                        });
                    }
                }}
            />
        </div>
    );
};

ColorPickerField.propTypes = propTypes;
ColorPickerField.defaultProps = defaultProps;

export default ColorPickerField;
