/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getStyleFromBox } from '@micromag/core/utils';

import FieldWithForm from './FieldWithForm';

import styles from '../styles/box-style.module.css';

const propTypes = {
    value: MicromagPropTypes.boxStyle,
    fields: PropTypes.arrayOf(MicromagPropTypes.formField),
    isForm: PropTypes.bool,
    isHorizontal: PropTypes.bool,
    withAlignment: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
    closeForm: PropTypes.func,
};

const BoxStyleForm = ({ value = null, fields = null, onChange = null, closeForm = null, withAlignment = false, ...props }) => {
    const previewElement =
        value !== null ? (
            <span className={styles.preview}>
                <span
                    className={styles.box}
                    style={{
                        ...getStyleFromBox(value),
                        padding: 0,
                    }}
                />
            </span>
        ) : null;
    return (
        <FieldWithForm
            isForm
            value={value}
            fields={fields}
            onChange={onChange}
            thumbnail={previewElement}
            noValueLabel={
                <FormattedMessage defaultMessage="Edit style..." description="No value label" />
            }
            {...props}
        />
    );
};

BoxStyleForm.propTypes = propTypes;
BoxStyleForm.withForm = true;

export default BoxStyleForm;
