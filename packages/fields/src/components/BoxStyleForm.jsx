/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React from 'react';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
// import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { getStyleFromBox } from '@micromag/core/utils';
import styles from '../styles/box-style.module.scss';
import FieldWithForm from './FieldWithForm';

const propTypes = {
    value: MicromagPropTypes.boxStyle,
    isForm: PropTypes.bool,
    isHorizontal: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
    closeForm: PropTypes.func,
};

const defaultProps = {
    value: null,
    isForm: false,
    isHorizontal: false,
    className: null,
    onChange: null,
    closeForm: null,
};

const BoxStyleForm = ({ value, onChange, closeForm, ...props }) => {
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
BoxStyleForm.defaultProps = defaultProps;
BoxStyleForm.withForm = true;

export default BoxStyleForm;
