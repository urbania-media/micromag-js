/* eslint-disable react/no-array-index-key */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Fields } from '@micromag/fields';
import { useFieldSchemaFields } from '@micromag/schemas';

import createNullableOnChange from '../../utils/createNullableOnChange';

import styles from '../../styles/forms/font.module.scss';

const propTypes = {
    value: PropTypes.shape({}),
    onChange: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    value: null,
    onChange: null,
    className: null,
};

const FontForm = ({ value, className, onChange }) => {
    const fields = useFieldSchemaFields('font');
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
            <Fields
                fields={fields}
                value={value}
                onChange={nullableOnChange}
            />
        </div>
    );
};

FontForm.propTypes = propTypes;
FontForm.defaultProps = defaultProps;

export default FontForm;
