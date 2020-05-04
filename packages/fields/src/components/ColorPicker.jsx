/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SketchPicker } from 'react-color';
import tinycolor from 'tinycolor2';

// import * as AppPropTypes from '../../lib/PropTypes';

import styles from '../styles/color-picker.module.scss';

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
    const color = useMemo(() => {
        if (value !== null) {
            const newColor = tinycolor(value.color);
            newColor.setAlpha(value.alpha);
            return newColor;
        }
        return '';
    }, [value]);
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <SketchPicker
                color={color}
                styles={{
                    picker: {
                        boxShadow: 'none',
                    },
                    label: {
                        color: '#FFF',
                    },
                }}
                onChange={newValue => {
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
