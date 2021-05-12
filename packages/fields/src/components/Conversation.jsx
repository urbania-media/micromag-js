/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import styles from '../styles/conversation.module.scss';
import Field from './Field';

const propTypes = {
    value: MicromagPropTypes.conversation,
    fields: MicromagPropTypes.formFields,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    value: null,
    fields: null,
    className: null,
    onChange: null,
};

const Conversation = ({ value, fields, name, className, onChange, ...props }) => {
    const { speakers = null } = value || {};

    const speakerOptions = (speakers || []).map(
        ({ id, name: speakerName = null }, speakerIndex) => ({
            value: id,
            label: speakerName !== null ? speakerName : `#${speakerIndex + 1}`,
        }),
    );

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            {(fields || []).map(({ name: fieldName, type: fieldType, ...field }) => (
                <Field
                    key={fieldName}
                    name={`${name}.${fieldName}`}
                    type={fieldType}
                    value={typeof value !== 'undefined' && value !== null ? value[fieldName] : null}
                    onChange={(newValue) => {
                        if (onChange !== null) {
                            onChange({ ...value, [fieldName]: newValue });
                        }
                    }}
                    {...props}
                    {...field}
                    {...(fieldName === 'messages'
                        ? { fieldProps: { options: speakerOptions } }
                        : null)}
                />
            ))}
        </div>
    );
};

Conversation.propTypes = propTypes;
Conversation.defaultProps = defaultProps;

export default Conversation;
