/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';
import { SketchPicker } from 'react-color';
import tinycolor from 'tinycolor2';
import { v4 as uuid } from 'uuid';

import { useGetColors } from '@micromag/core/contexts';

const propTypes = {
    value: PropTypes.shape({
        color: PropTypes.string,
        alpha: PropTypes.number,
    }),
    disableAlpha: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    value: null,
    disableAlpha: false,
    className: null,
    onChange: null,
};

const ColorPickerField = ({ value, disableAlpha, className, onChange }) => {
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
        <div className={classNames(['text-light', { [className]: className !== null }])}>
            <SketchPicker
                color={finalColor}
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
                disableAlpha={disableAlpha}
            />
        </div>
    );
};

ColorPickerField.propTypes = propTypes;
ColorPickerField.defaultProps = defaultProps;

export default ColorPickerField;
