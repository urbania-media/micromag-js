/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
// import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { PlaceholderText, PlaceholderImage } from '@micromag/core/components';
import Keypad from '@micromag/element-keypad';

import FieldWithForm from './FieldWithForm';

import styles from '../styles/keypad-layout-form.module.scss';

const propTypes = {
    value: PropTypes.shape({
        color: PropTypes.string,
        alpha: PropTypes.number,
    }),
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

const KeypadLayoutForm = ({ value, onChange, closeForm, ...props }) => {
    const { columnAlign = null, columns = null, spacing = null } = value || {};
    const finalSpacingPreview = Math.max(0, Math.min(4, spacing));

    const previewElement =
        value !== null ? (
            <Keypad
                className={classNames([
                    styles.previewKeypad,
                    {
                        [styles.oneColumn]: columns === 1,
                    },
                ])}
                align={columnAlign}
                columns={columns}
                spacing={finalSpacingPreview}
                items={[1, 2, 3, 4].map((n) => (
                    <div key={n} className={styles.previewKey}>
                        <div className={styles.previewButton} />
                    </div>
                ))}
            />
        ) : null;

    return (
        <FieldWithForm
            isForm
            value={value}
            label={<FormattedMessage defaultMessage="Edit" description="Field label" />}
            onChange={onChange}
            thumbnail={previewElement}
            noValueLabel={<FormattedMessage defaultMessage="Edit" description="Field label" />}
            {...props}
        />
    );
};

KeypadLayoutForm.propTypes = propTypes;
KeypadLayoutForm.defaultProps = defaultProps;
KeypadLayoutForm.withForm = true;

export default KeypadLayoutForm;
