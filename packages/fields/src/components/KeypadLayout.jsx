/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { PlaceholderText, PlaceholderImage } from '@micromag/core/components';
import Keypad from '@micromag/element-keypad';

import Fields from './Fields';

import styles from '../styles/keypad-layout.module.scss';

const propTypes = {
    value: PropTypes.shape({
        color: PropTypes.string,
        alpha: PropTypes.number,
    }),
    className: PropTypes.string,
    onChange: PropTypes.func,
    closeForm: PropTypes.func,
};

const defaultProps = {
    value: null,
    className: null,
    onChange: null,
    closeForm: null,
};

const KeypadLayout = ({ value, onChange, closeForm, ...props }) => {
    const {columnAlign = null, columns = null, spacing = null } = value || {};
    const finalSpacingPreview = Math.max(0, Math.min(4, spacing));

    const previewElement =
        value !== null ? (
            <Keypad
                className={styles.keypad}
                align={columnAlign}
                columns={columns}
                spacing={finalSpacingPreview}
                items={[1,2,3,4].map(n => (
                    <div
                        key={n}
                        className={classNames([
                            styles.preview,
                            {
                                // [styles.isPopupEmpty]: isPopupEmpty,
                            },
                        ])}
                    >
                        <PlaceholderImage className={styles.buttonVisual} height={20} />
                        <PlaceholderText lines={1} className={styles.buttonLabel} />
                    </div>
                ))}
            />
        ) : null;

    return (
        <div>
            {/* <div className={styles.keypadPreview}>
                {previewElement}
            </div> */}
            <Fields
                value={value}
                label={<FormattedMessage defaultMessage="Edit" description="Field label" />}
                onChange={onChange}
                noValueLabel={<FormattedMessage defaultMessage="Edit" description="Field label" />}
                {...props}
            />
        </div>
    );
};

KeypadLayout.propTypes = propTypes;
KeypadLayout.defaultProps = defaultProps;

export default KeypadLayout;
