/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { getStyleFromColor } from '@micromag/core/utils';
import tinycolor from 'tinycolor2';

import FieldWithForm from './FieldWithForm';
import ColorPicker from './ColorPicker';

import styles from '../styles/color.module.scss';

const propTypes = {
    value: PropTypes.shape({
        color: PropTypes.string,
        alpha: PropTypes.number,
    }),
    isForm: PropTypes.bool,
    isHorizontal: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    value: null,
    isForm: false,
    isHorizontal: false,
    className: null,
    onChange: null,
};

const ColorField = ({ value, onChange, ...props }) => {
    const { color = null } = value || {};
    const hexColor = useMemo(() => (color !== null ? tinycolor(color).toHexString() : null), [
        color,
    ]);
    const previewElement =
        value !== null ? (
            <span className={styles.preview}>
                <span
                    className={styles.color}
                    style={{
                        ...getStyleFromColor(value),
                    }}
                />
            </span>
        ) : null;
    return (
        <FieldWithForm
            value={value}
            onChange={onChange}
            label={hexColor}
            thumbnail={previewElement}
            noValueLabel={
                <FormattedMessage defaultMessage="Select a color..." description="No value label" />
            }
            {...props}
        >
            <div className="p-2 bg-light text-dark">
                <ColorPicker value={value} onChange={onChange} />
            </div>
        </FieldWithForm>
    );
};

ColorField.propTypes = propTypes;
ColorField.defaultProps = defaultProps;
ColorField.withForm = true;

export default ColorField;
