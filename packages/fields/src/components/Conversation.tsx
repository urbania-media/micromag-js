/* eslint-disable jsx-a11y/label-has-associated-control */

/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';

import type { Conversation as ConversationType, FormField } from '@micromag/core';
import { FieldContextProvider } from '@micromag/core/contexts';

import Fields from './Fields';

import styles from '../styles/conversation.module.css';

interface ConversationProps {
    value?: ConversationType;
    fields?: FormField[];
    name: string;
    className?: string;
    onChange?: (...args: unknown[]) => void;
}

function Conversation({
    value = null,
    fields = null,
    name,
    className = null,
    onChange = null,
    ...props
}) {
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
            <FieldContextProvider context={{ options: speakerOptions }}>
                <Fields name={name} value={value} fields={fields} onChange={onChange} {...props} />
            </FieldContextProvider>
        </div>
    );
}

export default Conversation;
