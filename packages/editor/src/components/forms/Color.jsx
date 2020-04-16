/* eslint-disable react/no-array-index-key */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ColorPicker } from '@micromag/fields';

import createNullableOnChange from '../../utils/createNullableOnChange';

import styles from '../../styles/forms/color.module.scss';

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

const ColorForm = ({ value, className, onChange }) => {
    const nullableOnChange = useCallback(createNullableOnChange(onChange), [onChange]);
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className,
                },
            ])}
        >
            <ColorPicker value={value} onChange={nullableOnChange} />
        </div>
    );
};

ColorForm.propTypes = propTypes;
ColorForm.defaultProps = defaultProps;

export default ColorForm;
