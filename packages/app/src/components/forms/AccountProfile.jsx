/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { defineMessages } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Form } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import { useUser } from '../../contexts/AuthContext';
import { useApi } from '../../contexts/ApiContext';

import formMessages from './messages';

const messages = defineMessages({
    changePasswordLabel: {
        id: 'forms.profile.change_password',
        defaultMessage: 'Change password',
    },
    submit: {
        id: 'forms.profile.submit',
        defaultMessage: 'Update profile',
    },
});

const propTypes = {
    className: PropTypes.string,
    fields: MicromagPropTypes.formFields,
    onUpdated: PropTypes.func,
};

const defaultProps = {
    fields: [
        {
            name: 'name',
            type: 'text',
            label: formMessages.nameLabel,
        },
        {
            name: 'email',
            type: 'email',
            label: formMessages.emailLabel,
        },
        {
            type: 'fields',
            label: messages.changePasswordLabel,
            isSection: true,
            fields: [
                {
                    name: 'password',
                    type: 'password',
                    label: formMessages.passwordLabel,
                },
                {
                    name: 'password_confirmation',
                    type: 'password',
                    label: formMessages.passwordConfirmationLabel,
                },
            ],
        },
    ],
    className: null,
    onUpdated: null,
};

const AccountProfileForm = ({ fields, className, onUpdated }) => {
    const url = useUrlGenerator();
    const api = useApi();
    const user = useUser();
    const postForm = useCallback((action, data) => api.account.update(data), [api]);
    return (
        <Form
            action={url('account.profile')}
            fields={fields}
            postForm={postForm}
            initialValue={user}
            submitButtonLabel={messages.submit}
            onComplete={onUpdated}
            className={className}
        />
    );
};

AccountProfileForm.propTypes = propTypes;
AccountProfileForm.defaultProps = defaultProps;

export default AccountProfileForm;
