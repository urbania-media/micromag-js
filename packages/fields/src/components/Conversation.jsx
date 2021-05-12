/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { FieldContextProvider } from '@micromag/core/contexts';

import styles from '../styles/conversation.module.scss';
import Fields from './Fields';

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

    console.log(fields);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <FieldContextProvider context={{ options: speakerOptions }}>
                <Fields name={name} value={value} fields={fields} onChange={onChange} {...props} />
            </FieldContextProvider>
        </div>
    );
};

Conversation.propTypes = propTypes;
Conversation.defaultProps = defaultProps;

export default Conversation;
