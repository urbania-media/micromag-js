/* eslint-disable react/jsx-props-no-spreading */
// import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useIntl, defineMessage, FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getStyleFromBox } from '@micromag/core/utils';

// import Fields from './Fields';
import FieldWithForm from './FieldWithForm';

import styles from '../styles/box-style.module.scss';

const propTypes = {
    value: MicromagPropTypes.activeForm,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    value: null,
    className: null,
    onChange: null,
};

const CallToActionForm = ({ value, className, onChange, ...props }) => {
    // const { active = false } = value || {};
    const intl = useIntl();

    // set default type and label
    const onUpdateValue = useCallback(
        (newValue) => {
            const { active: wasActive = false } = value || {};
            const { active: nowActive = false, type = null, label = null } = newValue || {};

            const finalValue = { ...newValue };
            if (!wasActive && nowActive) {
                if (type === null) {
                    finalValue.type = 'swipe-up';
                }
                if (label === null) {
                    finalValue.label = {
                        body: intl.formatMessage(
                            defineMessage({
                                defaultMessage: 'Learn more',
                                description: 'Call to action default label',
                            }),
                        ),
                    };
                }
            }

            if (onChange !== null) {
                onChange(finalValue);
            }
        },
        [onChange, value],
    );

    // eslint-disable-next-line
    const {
        paddingTop = null,
        paddingLeft = null,
        paddingRight,
        paddingBottom,
        ...stylesWithoutPadding
    } = getStyleFromBox(value);
    const previewElement =
        value !== null ? (
            <span className={styles.preview}>
                <span
                    className={styles.box}
                    style={{
                        ...stylesWithoutPadding,
                        padding: 0,
                    }}
                />
            </span>
        ) : null;

    return (
        // <Fields
        //     className={classNames([
        //         styles.container,
        //         {
        //             [className]: className !== null,
        //             [styles.active]: active,
        //         },
        //     ])}
        //     fieldClassName={styles.field}
        //     {...props}
        //     value={value}
        //     onChange={onUpdateValue}
        // />
        <FieldWithForm
            isForm
            className={className}
            value={value}
            label="My default label"
            onChange={onUpdateValue}
            thumbnail={previewElement}
            noValueLabel={
                <FormattedMessage
                    defaultMessage="Edit call to action..."
                    description="No value label"
                />
            }
            {...props}
        />
    );
};

CallToActionForm.propTypes = propTypes;
CallToActionForm.defaultProps = defaultProps;

export default CallToActionForm;
